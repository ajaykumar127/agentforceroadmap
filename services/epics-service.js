// Agentforce Roadmap v2 — epics read service.
// Serves the /v2 dashboard from the Postgres `epics` table (db/v2-schema.sql)
// instead of the 1 MB client-side data.js. Read-only; no LLM needed.

const { query } = require('../db/connection');

const PRODUCTS = new Set(['gus', 'd360', 'service', 'slack']);

// Columns exposed to the client (curated + operational). camelCase to match
// the existing front-end's field expectations where practical.
const SELECT_COLS = `
    id, gus_epic_id        AS "gusEpicId",
    product, item_id       AS "itemId",
    title, description, category,
    overview, key_features AS "keyFeatures",
    customer_facing        AS "customerFacing",
    feature_cluster        AS "featureCluster",
    prd_link               AS "prdLink",
    v2mom_method           AS "v2momMethod",
    health, status, scheduled_build AS "scheduledBuild",
    period, quarter, percent_complete AS "percentComplete",
    target_rollout_date    AS "targetRollOutDate",
    doc_status             AS "docStatus",
    readiness_status       AS "readinessStatus",
    a11y_status            AS "a11yStatus",
    t_shirt_size           AS "tShirtSize",
    release_stage          AS "releaseStage",
    feature_lifecycle_stage AS "featureLifecycleStage",
    product_feature        AS "productFeature",
    owner, dev_lead AS "devLead", design_lead AS "designLead",
    quality_lead AS "qualityLead", product_owner AS "productOwner",
    team, project, impact,
    gus_last_modified      AS "gusLastModified"
`;

// Fetch all live (non-archived) epics for a product, newest-build first-ish.
async function getRoadmap(product) {
    if (!PRODUCTS.has(product)) {
        const err = new Error('unknown_product');
        err.status = 400;
        throw err;
    }
    const { rows } = await query(
        `SELECT ${SELECT_COLS} FROM epics
         WHERE product = $1 AND archived_at IS NULL
         ORDER BY scheduled_build NULLS LAST, item_id`,
        [product]
    );
    return rows;
}

// Distinct filter values for a product (powers the filter chips).
async function getFilters(product) {
    if (!PRODUCTS.has(product)) {
        const err = new Error('unknown_product');
        err.status = 400;
        throw err;
    }
    const { rows } = await query(
        `SELECT
            array_agg(DISTINCT category)        FILTER (WHERE category IS NOT NULL)        AS categories,
            array_agg(DISTINCT status)          FILTER (WHERE status IS NOT NULL)          AS statuses,
            array_agg(DISTINCT health)          FILTER (WHERE health IS NOT NULL)          AS healths,
            array_agg(DISTINCT release_stage)   FILTER (WHERE release_stage IS NOT NULL)   AS "releaseStages",
            array_agg(DISTINCT feature_cluster) FILTER (WHERE feature_cluster IS NOT NULL) AS clusters,
            array_agg(DISTINCT scheduled_build) FILTER (WHERE scheduled_build IS NOT NULL) AS builds
         FROM epics WHERE product = $1 AND archived_at IS NULL`,
        [product]
    );
    return rows[0] || {};
}

// Aggregate stats for a product — exact counts (this is what makes factual
// questions accurate without an LLM).
async function getStats(product) {
    if (!PRODUCTS.has(product)) {
        const err = new Error('unknown_product');
        err.status = 400;
        throw err;
    }
    const [totals, byHealth, byStatus, byBuild] = await Promise.all([
        query(`SELECT count(*)::int AS total,
                      count(*) FILTER (WHERE customer_facing)::int AS "customerFacing",
                      round(avg(percent_complete))::int AS "avgPercentComplete"
               FROM epics WHERE product = $1 AND archived_at IS NULL`, [product]),
        query(`SELECT coalesce(health,'(none)') AS health, count(*)::int AS n
               FROM epics WHERE product = $1 AND archived_at IS NULL GROUP BY health ORDER BY n DESC`, [product]),
        query(`SELECT coalesce(status,'(none)') AS status, count(*)::int AS n
               FROM epics WHERE product = $1 AND archived_at IS NULL GROUP BY status ORDER BY n DESC`, [product]),
        query(`SELECT coalesce(scheduled_build,'(none)') AS build, count(*)::int AS n
               FROM epics WHERE product = $1 AND archived_at IS NULL GROUP BY scheduled_build ORDER BY build`, [product]),
    ]);
    return {
        ...totals.rows[0],
        byHealth: byHealth.rows,
        byStatus: byStatus.rows,
        byBuild: byBuild.rows,
    };
}

// Last successful sync info for the freshness stamp + /v2/api/sync/status.
async function getSyncStatus() {
    const { rows } = await query(
        `SELECT started_at AS "startedAt", finished_at AS "finishedAt",
                epics_seen AS "epicsSeen", epics_changed AS "epicsChanged",
                epics_archived AS "epicsArchived", ok, note
         FROM sync_runs ORDER BY id DESC LIMIT 1`
    );
    return rows[0] || null;
}

module.exports = { getRoadmap, getFilters, getStats, getSyncStatus, PRODUCTS };
