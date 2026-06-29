#!/usr/bin/env node
/**
 * scripts/ingest-epics.js
 *
 * Populate the v2 `epics` table (db/v2-schema.sql) from:
 *   1. data.js  — the CURATED seed (titles, descriptions, overview,
 *      keyFeatures, customerFacing, featureCluster) PLUS the operational
 *      baseline merged in at the last refresh. This is authoritative for
 *      everything; one row per (epic, product).
 *   2. /tmp/gus_fresh.json (optional) — a fresher GUS pull that overlays
 *      ONLY operational fields (health/status/build/dates/owners/%/...)
 *      onto the seed. If absent, data.js's baked-in operational values
 *      are used as-is.
 *
 * Curated fields are NEVER overwritten by the GUS overlay — they exist
 * only in data.js (SOQL doesn't even carry them).
 *
 * Writes are atomic: everything happens in ONE transaction with a
 * staging table swapped into `epics`, so a mid-run failure never leaves
 * a half-loaded table. Rows present before but absent from this run are
 * tombstoned (archived_at set), not deleted.
 *
 * The embedding column is left untouched here (NULL until the storm
 * Models API credential exists — see STORM_MODELS_API_SETUP.md).
 *
 * USAGE
 *   DATABASE_URL=... node scripts/ingest-epics.js
 *   GUS_FRESH=/tmp/gus_fresh.json   (optional overlay; default path tried)
 *   PGSSLMODE=require               (needed against Heroku RDS from laptop)
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { Pool } = require('pg');
require('dotenv').config();

const REPO = path.resolve(__dirname, '..');
const data = require(path.join(REPO, 'data.js'));
const SALESFORCE_BUILDS = data.SALESFORCE_BUILDS || {};
const GUS_FRESH = process.env.GUS_FRESH || '/tmp/gus_fresh.json';

const PRODUCTS = [
    { key: 'gus',     arr: data.roadmapDataGUS },
    { key: 'd360',    arr: data.roadmapDataD360 },
    { key: 'service', arr: data.roadmapDataServiceCloud },
    { key: 'slack',   arr: data.roadmapDataSlack },
];

// ---------------------------------------------------------------------
// Helpers (mirror scripts/refresh-gus-all.js so behavior is identical)
// ---------------------------------------------------------------------
const to18 = (id) => {
    // Salesforce 15->18 char case-safe expansion.
    if (!id) return null;
    id = String(id).trim();
    if (id.length === 18) return id;
    if (id.length !== 15) return id; // unknown form — leave as-is
    let suffix = '';
    for (let block = 0; block < 3; block++) {
        let val = 0;
        for (let bit = 0; bit < 5; bit++) {
            const c = id[block * 5 + bit];
            if (c >= 'A' && c <= 'Z') val += 1 << bit;
        }
        suffix += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ012345'[val];
    }
    return id + suffix;
};

const traverse = (v) => (v && typeof v === 'object' && 'Name' in v) ? v.Name : v;

function periodFor(build) {
    const meta = SALESFORCE_BUILDS[String(build).trim()];
    return meta ? `${meta.name} (${build})` : build;
}
function statusFromHealth(h) {
    if (h === 'Completed') return 'completed';
    if (h === 'On Track' || h === 'Watch' || h === 'Blocked') return 'in-progress';
    return 'planned';
}
function trimComments(comments) {
    if (!comments) return '';
    const dateRegex = /\n\s*\d{1,2}\/\d{1,2}\b/g;
    const matches = [...comments.matchAll(dateRegex)];
    let cut = comments;
    if (matches.length >= 2) cut = comments.substring(0, matches[1].index).trim();
    if (cut.length > 1500) cut = cut.substring(0, 1500).trim() + '…';
    return cut;
}

// Build the index of fresh GUS records (keyed by 15- and 18-char id).
function loadFreshOverlay() {
    if (!fs.existsSync(GUS_FRESH)) {
        console.warn(`ℹ️  No ${GUS_FRESH} — using data.js operational values as-is (no fresh overlay).`);
        return {};
    }
    let arr;
    try { arr = JSON.parse(fs.readFileSync(GUS_FRESH, 'utf8')); }
    catch (e) { console.warn(`⚠️  Could not parse ${GUS_FRESH}: ${e.message}. Skipping overlay.`); return {}; }
    if (!Array.isArray(arr) || arr.length === 0) {
        console.warn(`⚠️  ${GUS_FRESH} empty/not-an-array — skipping overlay.`);
        return {};
    }
    const byId = {};
    for (const rec of arr) {
        if (!rec || !rec.Id) continue;
        byId[rec.Id.substring(0, 15)] = rec;
        byId[rec.Id] = rec;
    }
    console.log(`✓ Loaded fresh GUS overlay: ${arr.length} records from ${GUS_FRESH}`);
    return byId;
}

// Apply a fresh GUS record's OPERATIONAL fields onto a seed row object.
// (Same field set as refresh-gus-all.js applyFresh, but writing into our
// flat row shape.)
function applyOverlay(row, f) {
    const set = (k, v) => { if (v !== undefined && v !== null && v !== '') row[k] = v; };
    set('owner', traverse(f.Owner));
    set('dev_lead', traverse(f.Development_Lead) || (f.Development_Lead__r && f.Development_Lead__r.Name));
    set('design_lead', traverse(f.Design_Lead) || (f.Design_Lead__r && f.Design_Lead__r.Name));
    set('quality_lead', traverse(f.Quality_Lead) || (f.Quality_Lead__r && f.Quality_Lead__r.Name));
    set('product_owner', traverse(f.Product_Owner) || (f.Product_Owner__r && f.Product_Owner__r.Name));
    set('team', traverse(f.Team) || (f.Team__r && f.Team__r.Name));
    set('project', traverse(f.Project) || (f.Project__r && f.Project__r.Name));

    if (f.Health__c) { row.health = f.Health__c; row.status = statusFromHealth(f.Health__c); }

    const sb = traverse(f.Scheduled_Build) || (f.Scheduled_Build__r && f.Scheduled_Build__r.Name);
    if (sb) { row.scheduled_build = sb; row.period = periodFor(sb); row.quarter = row.period; }

    row.target_rollout_date = f.Target_Roll_Out_Date__c || row.target_rollout_date || null;
    row.doc_status = f.Doc_Status__c || null;
    row.readiness_status = f.Readiness_Status__c || null;
    row.a11y_status = f.Accessibility_Status__c || null;
    row.t_shirt_size = f.T_Shirt_Size__c || null;
    row.percent_complete = (typeof f.Percent_Of_Work_Items_Complete__c === 'number') ? f.Percent_Of_Work_Items_Complete__c : row.percent_complete;
    row.source = f.Source__c || null;
    row.epic_category = f.Category__c || null;
    row.gus_last_modified = f.LastModifiedDate || null;

    const pf = f.Product_Feature__r;
    if (pf) {
        row.release_stage = pf.Feature_Availability_Status__c || null;
        row.feature_lifecycle_stage = pf.Feature_Lifecycle_Stage__c || null;
        row.product_feature = pf.Feature_Public_Facing_Name__c || pf.Name || row.product_feature || null;
    }
    if (f.Epic_Health_Comments__c) {
        const t = trimComments(f.Epic_Health_Comments__c);
        if (t) row.impact = t;
    }
}

// Map a curated seed item (from data.js) + product into a flat row.
function seedRow(item, product) {
    const d = item.details || {};
    return {
        gus_epic_id: to18(item.gusEpicId) || null,
        product,
        item_id: (typeof item.id === 'number') ? item.id : (parseInt(item.id, 10) || null),
        // curated
        title: item.title || '(untitled)',
        description: item.description || null,
        category: item.category || null,
        overview: d.overview || null,
        key_features: Array.isArray(d.keyFeatures) ? d.keyFeatures : null,
        customer_facing: (typeof item.customerFacing === 'boolean') ? item.customerFacing : null,
        feature_cluster: item.featureCluster || null,
        prd_link: item.prdLink || null,
        v2mom_method: item.v2momMethod || null,
        // operational baseline (already merged into data.js at last refresh)
        health: item.health || null,
        status: item.status || null,
        scheduled_build: item.scheduledBuild || null,
        period: item.period || null,
        quarter: item.quarter || null,
        percent_complete: (typeof item.percentComplete === 'number') ? item.percentComplete : null,
        target_rollout_date: item.targetRollOutDate || null,
        doc_status: item.docStatus || null,
        readiness_status: item.readinessStatus || null,
        a11y_status: item.a11yStatus || null,
        t_shirt_size: item.tShirtSize || null,
        release_stage: item.releaseStage || null,
        feature_lifecycle_stage: item.featureLifecycleStage || null,
        product_feature: item.productFeature || null,
        owner: item.owner || null,
        dev_lead: item.devLead || null,
        design_lead: item.designLead || null,
        quality_lead: item.qualityLead || null,
        product_owner: item.productOwner || null,
        team: item.team || null,
        project: item.project || null,
        epic_category: item.epicCategory || null,
        source: item.source || null,
        impact: d.impact || null,
        gus_last_modified: item.gusLastModified || null,
    };
}

// Stable hash of the descriptive text used for (future) embedding, so we
// can skip re-embedding unchanged rows. Covers curated text only — status
// flips don't churn it (status questions are answered by SQL, not vectors).
function contentHash(row) {
    const basis = [row.title, row.description, row.overview,
        (row.key_features || []).join('|'), row.product_feature].join('');
    return crypto.createHash('sha256').update(basis).digest('hex');
}

const COLUMNS = [
    'gus_epic_id', 'product', 'item_id', 'title', 'description', 'category', 'overview',
    'key_features', 'customer_facing', 'feature_cluster', 'prd_link', 'v2mom_method',
    'health', 'status', 'scheduled_build', 'period', 'quarter', 'percent_complete',
    'target_rollout_date', 'doc_status', 'readiness_status', 'a11y_status', 't_shirt_size',
    'release_stage', 'feature_lifecycle_stage', 'product_feature', 'owner', 'dev_lead',
    'design_lead', 'quality_lead', 'product_owner', 'team', 'project', 'epic_category',
    'source', 'impact', 'gus_last_modified', 'content_hash',
];

async function main() {
    if (!process.env.DATABASE_URL) {
        console.error('❌ DATABASE_URL not set.');
        process.exit(1);
    }
    const ssl = (process.env.PGSSLMODE === 'require' || process.env.NODE_ENV === 'production')
        ? { rejectUnauthorized: false } : false;
    const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl, max: 1 });

    const overlay = loadFreshOverlay();

    // Build the full row set from the curated seed, applying the fresh overlay.
    const rows = [];
    let overlaid = 0;
    for (const { key, arr } of PRODUCTS) {
        if (!Array.isArray(arr)) { console.warn(`⚠️  ${key}: not an array, skipping`); continue; }
        for (const item of arr) {
            const row = seedRow(item, key);
            const fresh = row.gus_epic_id
                ? (overlay[row.gus_epic_id] || overlay[String(item.gusEpicId).substring(0, 15)])
                : null;
            if (fresh) { applyOverlay(row, fresh); overlaid++; }
            row.content_hash = contentHash(row);
            rows.push(row);
        }
    }
    console.log(`Prepared ${rows.length} rows across ${PRODUCTS.length} products (${overlaid} got a fresh GUS overlay).`);

    const started = new Date().toISOString();
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // Staging table identical to epics (minus generated/default cols we set explicitly).
        await client.query('CREATE TEMP TABLE epics_stage (LIKE epics INCLUDING DEFAULTS) ON COMMIT DROP');

        const colList = COLUMNS.join(', ');
        const ph = COLUMNS.map((_, i) => `$${i + 1}`).join(', ');
        for (const r of rows) {
            const vals = COLUMNS.map(c => {
                const v = r[c];
                return v === undefined ? null : v;
            });
            await client.query(`INSERT INTO epics_stage (${colList}) VALUES (${ph})`, vals);
        }

        // Upsert staged rows into epics by the two natural keys, preserving
        // id / created_at / embedding on existing rows. Two passes: id-keyed
        // rows, then no-id rows (item_id, product).
        const updateAssignments = COLUMNS.filter(c => c !== 'gus_epic_id' && c !== 'product')
            .map(c => `${c} = EXCLUDED.${c}`).concat(['archived_at = NULL', 'synced_at = now()']).join(', ');

        await client.query(`
            INSERT INTO epics (${COLUMNS.join(', ')}, synced_at)
            SELECT ${COLUMNS.join(', ')}, now() FROM epics_stage WHERE gus_epic_id IS NOT NULL
            ON CONFLICT (gus_epic_id, product) DO UPDATE SET ${updateAssignments}
        `);
        await client.query(`
            INSERT INTO epics (${COLUMNS.join(', ')}, synced_at)
            SELECT ${COLUMNS.join(', ')}, now() FROM epics_stage WHERE gus_epic_id IS NULL
            ON CONFLICT (item_id, product) WHERE gus_epic_id IS NULL DO UPDATE SET ${updateAssignments}
        `);

        // Tombstone rows that exist in epics but weren't in this run.
        const tomb = await client.query(`
            UPDATE epics e SET archived_at = now()
            WHERE e.archived_at IS NULL
              AND NOT EXISTS (
                SELECT 1 FROM epics_stage s
                WHERE (s.gus_epic_id IS NOT NULL AND s.gus_epic_id = e.gus_epic_id AND s.product = e.product)
                   OR (s.gus_epic_id IS NULL AND s.item_id = e.item_id AND s.product = e.product)
              )
        `);

        const changed = await client.query(`SELECT count(*)::int AS n FROM epics WHERE synced_at >= $1`, [started]);

        await client.query(`
            INSERT INTO sync_runs (source, started_at, finished_at, epics_seen, epics_changed, epics_archived, ok, note)
            VALUES ($1, $2, now(), $3, $4, $5, true, $6)
        `, ['laptop-mcp', started, rows.length, changed.rows[0].n, tomb.rowCount,
            overlay && Object.keys(overlay).length ? 'with fresh GUS overlay' : 'data.js baseline only']);

        await client.query('COMMIT');

        const total = await client.query('SELECT count(*)::int AS n, count(*) FILTER (WHERE archived_at IS NULL)::int AS live FROM epics');
        const byProd = await client.query(`SELECT product, count(*)::int AS n FROM epics WHERE archived_at IS NULL GROUP BY product ORDER BY product`);
        console.log(`✅ Ingest committed. epics total=${total.rows[0].n}, live=${total.rows[0].live}, tombstoned this run=${tomb.rowCount}`);
        console.log('   by product:', byProd.rows.map(r => `${r.product}=${r.n}`).join('  '));
    } catch (e) {
        await client.query('ROLLBACK').catch(() => {});
        console.error('❌ Ingest failed, rolled back:', e.message);
        try {
            await pool.query(`INSERT INTO sync_runs (source, started_at, finished_at, ok, note) VALUES ($1,$2,now(),false,$3)`,
                ['laptop-mcp', started, e.message.slice(0, 500)]);
        } catch (_) {}
        process.exitCode = 1;
    } finally {
        client.release();
        await pool.end();
    }
}

main();
