#!/usr/bin/env node
/**
 * scripts/append-netnew.js
 *
 * Append the 1033 net-new epics to data.js's four arrays.
 *
 * Inputs:
 *   /tmp/seed_baseline.json     — deterministic baseline (build-netnew-baseline.js)
 *   /tmp/authored_result.json   — { authored:[...], flips:[...] } from the
 *                                 author-netnew-epics workflow (LLM overview/
 *                                 keyFeatures/customerFacing/featureCluster +
 *                                 adversarial verifier corrections)
 *
 * For each baseline item we:
 *   - overlay the authored overview/keyFeatures/customerFacing/featureCluster
 *   - overlay verifier flips on top (final word on classification/hallucination)
 *   - shape it exactly like an existing data.js item
 *   - assign a new sequential id per dataset (continues from current max)
 * then rewrite each array block in data.js in place (existing items untouched,
 * new items appended), preserving file order via start/end markers.
 *
 * Dry-run by default; pass --write to modify data.js.
 */
const fs = require('fs');
const path = require('path');

const REPO = path.resolve(__dirname, '..');
const DATA_PATH = path.join(REPO, 'data.js');
const WRITE = process.argv.includes('--write');

const dataModule = require(DATA_PATH);
const baseline = JSON.parse(fs.readFileSync('/tmp/seed_baseline.json', 'utf8'));
const authoredResult = JSON.parse(fs.readFileSync('/tmp/authored_result.json', 'utf8'));

const authoredById = {};
for (const a of (authoredResult.authored || [])) authoredById[a.gusEpicId] = a;
const flipById = {};
for (const f of (authoredResult.flips || [])) flipById[f.gusEpicId] = f;

// jsLiteral: serialize a value back to a JS object literal (from refresh-gus-all.js).
function jsLiteral(value, indent = 0) {
    const pad = '    '.repeat(indent);
    const padInner = '    '.repeat(indent + 1);
    if (value === null || value === undefined) return 'null';
    if (typeof value === 'string') return JSON.stringify(value);
    if (typeof value === 'number' || typeof value === 'boolean') return String(value);
    if (Array.isArray(value)) {
        if (value.length === 0) return '[]';
        return '[\n' + value.map(v => padInner + jsLiteral(v, indent + 1)).join(',\n') + '\n' + pad + ']';
    }
    if (typeof value === 'object') {
        const keys = Object.keys(value);
        if (keys.length === 0) return '{}';
        return '{\n' + keys.map(k => padInner + k + ': ' + jsLiteral(value[k], indent + 1)).join(',\n') + '\n' + pad + '}';
    }
    return JSON.stringify(value);
}

// Build a data.js-shaped item from a baseline row + authored/flip overlays.
function shapeItem(b, id) {
    const a = authoredById[b.gusEpicId] || {};
    const flip = flipById[b.gusEpicId] || null;

    let overview = (a.overview && a.overview.trim()) || b.overview || b.title;
    let keyFeatures = Array.isArray(a.keyFeatures) ? a.keyFeatures : (b.keyFeatures || []);
    let customerFacing = (typeof a.customerFacing === 'boolean') ? a.customerFacing : b.customerFacing;
    let featureCluster = (a.featureCluster !== undefined) ? a.featureCluster : b.featureCluster;

    // Verifier has the final word on classification; if it flagged a
    // hallucination, fall back to the safe deterministic baseline text.
    if (flip) {
        if (typeof flip.customerFacing === 'boolean') customerFacing = flip.customerFacing;
        if (flip.featureCluster !== undefined) featureCluster = flip.featureCluster;
        if (flip.hallucination) {
            overview = b.overview || b.title;
            keyFeatures = b.keyFeatures || [];
        }
    }

    // gus dataset convention: no cluster, never customer-facing.
    if (b.ds === 'gus') { featureCluster = null; customerFacing = false; }
    else if (!featureCluster) featureCluster = 'Other';

    const period = b.period || (b.scheduledBuild ? String(b.scheduledBuild) : '');
    return {
        id,
        title: b.title,
        description: (overview || '').slice(0, 500),
        category: 'feature',
        status: b.status || 'planned',
        period,
        quarter: period,
        date: b.scheduledBuild ? String(b.scheduledBuild) : '',
        owner: b.owner || '',
        prdLink: '',
        team: b.team || '',
        scheduledBuild: b.scheduledBuild ? String(b.scheduledBuild) : '',
        health: b.health || 'Not Started',
        devLead: b.devLead || '',
        designLead: '',
        qualityLead: '',
        v2momMethod: b.ds === 'slack' ? 'Slack' : (b.ds === 'gus' ? 'Sales Cloud' : ''),
        version: b.ds,
        details: {
            overview: overview || '',
            keyFeatures: keyFeatures || [],
            impact: '',
        },
        gusEpicId: b.gusEpicId,
        project: b.project || '',
        targetRollOutDate: b.targetRollOutDate || null,
        docStatus: null,
        readinessStatus: b.readinessStatus || null,
        a11yStatus: null,
        tShirtSize: null,
        percentComplete: (typeof b.percentComplete === 'number') ? b.percentComplete : null,
        slippageComments: null,
        pathToGreen: null,
        source: 'gus-netnew-2026-07',
        epicCategory: b.epicCategory || null,
        gusLastModified: b.gusLastModified || null,
        productOwner: null,
        releaseStage: null,
        featureLifecycleStage: null,
        productFeature: null,
        featureCluster,
        customerFacing,
    };
}

const DATASETS = [
    { ds: 'gus', arrName: 'roadmapDataGUS' },
    { ds: 'd360', arrName: 'roadmapDataD360' },
    { ds: 'service', arrName: 'roadmapDataServiceCloud' },
    { ds: 'slack', arrName: 'roadmapDataSlack' },
];

// Guard: ensure we're not re-appending ids that already exist.
const existingIds15 = new Set();
for (const { arrName } of DATASETS) for (const r of dataModule[arrName]) if (r.gusEpicId) existingIds15.add(r.gusEpicId.substring(0, 15));

let src = fs.readFileSync(DATA_PATH, 'utf8');
const stats = {};

for (const { ds, arrName } of DATASETS) {
    const arr = dataModule[arrName];
    const curMax = arr.reduce((mx, r) => Math.max(mx, Number(r.id) || 0), 0);
    let nextId = curMax + 1;

    const news = baseline
        .filter(b => b.ds === ds)
        .filter(b => !existingIds15.has((b.gusEpicId || '').substring(0, 15)));

    const shaped = news.map(b => shapeItem(b, nextId++));
    const merged = arr.concat(shaped);
    stats[arrName] = { existing: arr.length, appended: shaped.length, total: merged.length, idRange: shaped.length ? `${curMax + 1}..${nextId - 1}` : '-' };

    // Rewrite the array block in place: from `const <arrName> = [` to the next `\n];\n`.
    const arrStart = src.indexOf(`\nconst ${arrName} = [`);
    if (arrStart < 0) throw new Error(`Array start for ${arrName} not found`);
    const bodyStart = arrStart + `\nconst ${arrName} = `.length;
    const arrEnd = src.indexOf('\n];\n', bodyStart);
    if (arrEnd < 0) throw new Error(`Array end for ${arrName} not found`);

    const newLiteral = jsLiteral(merged, 0);
    src = src.substring(0, bodyStart) + newLiteral + ';' + src.substring(arrEnd + 3);
}

console.log('Append plan:');
let totalNew = 0;
for (const k of Object.keys(stats)) { console.log(' ', k, JSON.stringify(stats[k])); totalNew += stats[k].appended; }
console.log(`  TOTAL new items: ${totalNew}`);

if (WRITE) {
    fs.writeFileSync(DATA_PATH, src);
    // sanity: re-require a temp copy to ensure it still parses
    const tmp = '/tmp/data.append.check.js';
    fs.writeFileSync(tmp, src);
    delete require.cache[require.resolve(tmp)];
    const check = require(tmp);
    const counts = {
        gus: check.roadmapDataGUS.length, d360: check.roadmapDataD360.length,
        service: check.roadmapDataServiceCloud.length, slack: check.roadmapDataSlack.length,
    };
    console.log(`\n✅ wrote ${DATA_PATH} — parses OK. New counts:`, JSON.stringify(counts));
} else {
    console.log('\n(dry-run) re-run with --write to modify data.js');
}
