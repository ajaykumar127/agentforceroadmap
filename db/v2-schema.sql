-- =====================================================================
-- Agentforce Roadmap v2 — Postgres-backed roadmap store (forward-only)
--
-- Single canonical `epics` table feeding BOTH the /v2 dashboard and
-- (later) the RAG chat, so they can never disagree. Populated by
-- scripts/ingest-epics.js (curated seed from data.js + operational
-- overlay from a fresh GUS pull).
--
-- Safe to run repeatedly: every statement is IF NOT EXISTS / OR REPLACE.
-- Does NOT touch the existing feature_votes / feature_comments tables
-- or the legacy roadmap_items/release_notes RAG tables.
--
-- Apply:  psql "$DATABASE_URL" -f db/v2-schema.sql
-- =====================================================================

CREATE EXTENSION IF NOT EXISTS vector;

-- ---------------------------------------------------------------------
-- epics — one row per (epic, product view).
--
-- Key design decisions (verified against live data.js, 2026-06):
--   * Composite natural key (gus_epic_id, product): 3 epics legitimately
--     appear in BOTH the gus and slack product views. A bare
--     UNIQUE(gus_epic_id) would drop one view's copy.
--   * gus_epic_id is NULLABLE: 2 items (Sales Methodologies) have no GUS
--     epic. The SERIAL surrogate `id` is the real PK so they survive.
--   * ids are canonicalized to 18-char on ingest (source mixes 15/18).
--   * NO ivfflat/hnsw index: at <500 rows exact scan is faster AND gives
--     100% recall. Add an ANN index only past ~10k-50k rows.
--   * embedding is NULLABLE: populated only once the storm Models API
--     credential exists. Dashboard + exact SQL answers work without it.
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS epics (
    id                      SERIAL PRIMARY KEY,
    gus_epic_id             VARCHAR(18),            -- nullable; 18-char canonical
    product                 VARCHAR(8) NOT NULL,    -- 'gus'|'d360'|'service'|'slack'

    -- curated layer (authored in data.js; NEVER overwritten by GUS sync) ----
    item_id                 INTEGER,                -- the source array's `id`
    title                   TEXT NOT NULL,
    description             TEXT,
    category                VARCHAR(64),
    overview                TEXT,                   -- details.overview
    key_features            TEXT[],                 -- details.keyFeatures
    customer_facing         BOOLEAN,
    feature_cluster         TEXT,
    prd_link                TEXT,
    v2mom_method            TEXT,

    -- operational layer (from GUS SOQL via applyFresh; overwritten each sync)
    health                  VARCHAR(32),
    status                  VARCHAR(32),
    scheduled_build         VARCHAR(16),
    period                  TEXT,
    quarter                 TEXT,
    percent_complete        INTEGER,
    target_rollout_date     VARCHAR(64),
    doc_status              VARCHAR(64),
    readiness_status        VARCHAR(64),
    a11y_status             VARCHAR(64),
    t_shirt_size            VARCHAR(16),
    release_stage           VARCHAR(64),
    feature_lifecycle_stage VARCHAR(64),
    product_feature         TEXT,
    owner                   VARCHAR(255),
    dev_lead                VARCHAR(255),
    design_lead             VARCHAR(255),
    quality_lead            VARCHAR(255),
    product_owner           VARCHAR(255),
    team                    VARCHAR(255),
    project                 TEXT,
    epic_category           VARCHAR(64),
    source                  TEXT,
    impact                  TEXT,                   -- details.impact (trimmed health comments)
    gus_last_modified       TIMESTAMPTZ,

    -- sync bookkeeping -----------------------------------------------------
    content_hash            TEXT,                   -- skip re-embed when unchanged
    archived_at             TIMESTAMPTZ,            -- tombstone: absent from latest pull
    synced_at               TIMESTAMPTZ DEFAULT now(),
    created_at              TIMESTAMPTZ DEFAULT now(),
    updated_at              TIMESTAMPTZ DEFAULT now(),
    embedding               vector(1536),           -- Ada-002 via storm Models API (later)

    CONSTRAINT epics_gusid_product_key UNIQUE (gus_epic_id, product)
);

-- A partial unique key can't cover NULL gus_epic_id rows, so the no-id
-- items are disambiguated by (item_id, product) instead.
CREATE UNIQUE INDEX IF NOT EXISTS epics_itemid_product_key
    ON epics (item_id, product) WHERE gus_epic_id IS NULL;

-- Filter/aggregation indexes for the dashboard + SQL Q&A (cheap, useful).
CREATE INDEX IF NOT EXISTS epics_product_idx         ON epics (product);
CREATE INDEX IF NOT EXISTS epics_health_idx          ON epics (health);
CREATE INDEX IF NOT EXISTS epics_status_idx          ON epics (status);
CREATE INDEX IF NOT EXISTS epics_scheduled_build_idx ON epics (scheduled_build);
CREATE INDEX IF NOT EXISTS epics_owner_idx           ON epics (owner);
CREATE INDEX IF NOT EXISTS epics_customer_facing_idx ON epics (customer_facing);
CREATE INDEX IF NOT EXISTS epics_archived_idx        ON epics (archived_at);

-- ---------------------------------------------------------------------
-- sync_runs — observability for each ingest cycle.
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS sync_runs (
    id              SERIAL PRIMARY KEY,
    source          VARCHAR(16),            -- 'laptop-mcp'
    started_at      TIMESTAMPTZ,
    finished_at     TIMESTAMPTZ,
    epics_seen      INTEGER,
    epics_changed   INTEGER,
    epics_archived  INTEGER,
    ok              BOOLEAN,
    note            TEXT
);

-- ---------------------------------------------------------------------
-- updated_at trigger (CREATE OR REPLACE the function; guard the trigger
-- so re-running this file never throws "trigger already exists").
-- ---------------------------------------------------------------------
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS epics_set_updated_at ON epics;
CREATE TRIGGER epics_set_updated_at
    BEFORE UPDATE ON epics
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
