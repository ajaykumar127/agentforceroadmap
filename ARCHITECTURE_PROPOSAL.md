# Architecture Proposal — Continuous GUS Sync + Postgres RAG

**Date:** 2026-06-26
**Status:** Proposal for review (no code changes yet)
**Method:** 4 independent architecture proposals → adversarial judge panel → synthesis → adversarial risk/completeness critic, every load-bearing claim verified against the repo and live `data.js`.

---

## TL;DR

The instinct to redesign is correct, but the single most important fact reframes *how*:

> **`data.js` is not a GUS scan. It is a hand-curated content layer (titles, descriptions, overviews, customer-facing copy, feature clustering) with a thin GUS *operational* overlay (health, status, dates, owners, % complete) merged on top.**

The refresh scripts (`applyFresh()` in `refresh-gus-all.js`) only ever write ~15 operational fields plus `details.impact`. **Titles, `description`, `details.overview`, `details.keyFeatures`, `customerFacing`, `featureCluster` come exclusively from the human-authored file** — SOQL doesn't even fetch them. So "make Postgres the single source of truth and retire `data.js`" — the most attractive-sounding option — would blank out every dashboard title and produce useless embeddings. **GUS is the source of truth for operational fields; a human is the source of truth for the narrative.** The architecture has to honor both.

Three more verified facts set the constraints:

1. **The RAG layer is dormant, not just stale.** `DATABASE_URL` is still the placeholder `username:password@localhost`; no `agentforce_roadmap` DB exists; the tables were never created. `scripts/ingest-data.js` *crashes* (`require('./data.js')` returns only the 4 GUS arrays because the final `module.exports=` clobbers V1–V4; line 50 destructures `undefined`). Even if it ran, it ingests the **historical** arrays, not the 4 GUS-backed arrays the dashboard shows. Re-enabling chat today answers from nothing.
2. **Pure vector top-5 can't answer the questions PMs actually ask.** With 1 Blocked / 6 Watch epics out of 439, "how many Service Cloud epics are Blocked?" and "what slipped to 264?" are exact COUNT/filter/timeline questions that cosine similarity guesses wrong.
3. **GUS auth is fixed: the owner's existing interactive MCP/SSO session is the *only* access — no service account is obtainable.** (Owner decision, 2026-06-26: no extra GUS perms will be granted.) This rules out a Connected App / JWT bearer and any headless GUS access from Heroku. **Consequence:** the sync must run wherever the owner's authenticated session lives (their machine or an always-on box they've authenticated on); it can be *scheduled*, but never truly *unattended* on Heroku. "Continuous" is therefore calibrated as "scheduled capture on the owner's session," not "service-account daemon."

**Recommended shape:** one Postgres `epics` table that feeds **both** the dashboard and chat (so they can never disagree), populated by a **deterministic scripted sync** (not an LLM agent), with chat answered by an **LLM that calls two read-only tools** — exact SQL for facts/counts, vector search for semantics. The "background agent" the goal asks for is best realized as *a scheduled autonomous sync process + a genuinely agentic (tool-using) chat* — wrapping a fixed-template SOQL batch job in an LLM loop adds cost, nondeterminism, and a fragile kept-alive session for zero benefit.

---

## What was evaluated

| Proposal | Judge score | Effort | One-line |
|---|---|---|---|
| **Pragmatic** — automate refresh, fix ingest, keep `data.js` as served cache | **46/60** | M (~1wk) | Lowest risk; only mitigates the dual-source problem |
| Agent-Native — agentic RAG over a GUS mirror | 43/60 | L | Best answer-quality ideas; over-built sync |
| Postgres-as-Source-of-Truth — invert the data flow | 42/60 | L | Best structural backbone; approval-gated |
| Event-Driven Hybrid — CDC + SQL+vector+rerank | 41/60 | L | Freshest; heaviest ops, CDC entitlement unconfirmed |

The recommendation **synthesizes** these — Postgres-as-SoT's single-table backbone, Pragmatic's sequencing discipline and hybrid-RAG insight, Agent-Native's `sync_runs`/audit observability and read-only tool surface, Event-Driven's two real technical corrections (the `ivfflat lists=100` mis-tuning and incremental embedding) — then the adversarial critic **corrected** the synthesis's central schema premise. The corrected version is below.

---

## Recommended architecture

### 1. One canonical `epics` table — but keyed correctly, and seeded by the curated layer

```sql
-- Operational fields come from GUS sync; curated fields come from the
-- hand-authored seed. ONE row per (epic, product) — NOT per epic.
CREATE TABLE epics (
  id              SERIAL PRIMARY KEY,        -- surrogate; survives no-GUS-id items
  gus_epic_id     VARCHAR(18),               -- NULLABLE: 2 items (Sales Methodologies) have none
                                             -- canonicalize ALL ids to 18-char on ingest
  product         VARCHAR(8) NOT NULL,       -- 'gus'|'d360'|'service'|'slack'  (match app.js keys, NOT 'sc')
  -- curated (from seed/data.js; NOT overwritten by SOQL):
  title           TEXT NOT NULL,
  description     TEXT,
  category        VARCHAR(64),
  overview        TEXT,                      -- details.overview
  key_features    TEXT[],                    -- details.keyFeatures
  customer_facing BOOLEAN,
  feature_cluster TEXT,
  prd_link        TEXT,
  -- operational (from GUS SOQL via applyFresh; overwritten each sync):
  health          VARCHAR(32),
  status          VARCHAR(32),
  scheduled_build VARCHAR(16),
  percent_complete INT,                      -- present on only 369/439 rows
  target_rollout_date VARCHAR(32),
  doc_status VARCHAR(32), readiness_status VARCHAR(32), a11y_status VARCHAR(32),
  release_stage VARCHAR(64), feature_lifecycle_stage VARCHAR(64),
  owner VARCHAR(255), dev_lead VARCHAR(255), product_owner VARCHAR(255),
  product_feature TEXT,
  impact          TEXT,                      -- details.impact (trimmed health comments)
  -- sync bookkeeping:
  gus_last_modified TIMESTAMPTZ,             -- present on only 437/439 rows
  content_hash    TEXT,
  archived_at     TIMESTAMPTZ,               -- tombstone: present in DB, absent from latest pull
  synced_at       TIMESTAMPTZ DEFAULT now(),
  embedding       vector(1536),
  UNIQUE (gus_epic_id, product)              -- composite: 3 epics live in BOTH gus & slack
);
```

**Why composite key + nullable id + surrogate:** verified — `a3QEE0000024rPZ`, `a3QEE0000027bWL`, `a3QEE000001xadB` each appear in **both** the `gus` and `slack` arrays (intentional cross-product features); `UNIQUE(gus_epic_id)` alone would drop one tab's copy. Items 67/68 have **no** `gusEpicId`; `NOT NULL` would delete them at cutover.

**Vector index:** drop `ivfflat lists=100` (over-partitions 439 rows, hurts recall). At this corpus size an **exact sequential cosine scan is sub-millisecond and 100% recall** — no ANN index needed. (HNSW is fine but unnecessary.)

Keep `release_notes` (embedded) and `chat_history`. Optional `sync_runs(started, finished, seen, changed, ok, note)` for observability.

### 2. Dashboard and chat read the same `epics` rows

This is the structural fix the Pragmatic option could only *mitigate*: one dataset → dashboard and chatbot can never disagree, and the ingest-wrong-data bug is fixed **by construction**.

### 3. Hybrid RAG via LLM tool-calling (no separate classifier)

Two **read-only, parameterized** tools — never free-form text-to-SQL:

- `query_roadmap(filters)` → real `COUNT`/`GROUP BY`/`WHERE` over typed columns. Exact for "how many Service Cloud epics are Blocked?", "list everything slipping to 264", "who owns X". This is what cures the verified top-5 cosine weakness.
- `semantic_search(text, k, filters?)` → vector top-k (exact scan) for "what are we doing about latency".

The LLM picks the tool(s); mixed questions call both; the "answer only from provided context" guardrail is retained. **Embeddings are for descriptive semantic search ONLY** — status/health/build/count questions route to SQL, so a status flip never needs a re-embed.

### 4. Deterministic scripted sync, abstracted behind a query interface

A single Node `sync` module reuses the existing `applyFresh()` normalizers, **merges GUS operational fields onto the curated seed** (never overwriting curated fields), diffs by `gus_last_modified` + `content_hash`, and writes to a **staging table swapped atomically** into `epics` (all-or-nothing — a mid-batch SOQL failure must not half-update the live dashboard).

**GUS fetch — single mode, the owner's existing access.** Per the owner constraint (2026-06-26, no extra GUS perms), there is exactly one fetch implementation: the human-captured `/tmp/gus_fresh.json` produced by the owner's interactive MCP/SSO session — i.e. today's pipeline, automated. No JWT/service-account mode exists, so the upsert path is the only thing that needs building. (The fetch step still sits behind a thin interface purely so the *capture host* — laptop cron vs. always-on box vs. manual trigger — can change without touching the upsert.)

Plus explicit **delete reconciliation:** rows in `epics` absent from the latest full pull get `archived_at` set (not hard-deleted), so stale Blocked/Watch counts don't live forever.

### 5. Operability for one owner

`GET /api/sync/status` surfaces last success / rows changed / staleness; a **stale-session & zero-row guard aborts before any write and alerts** — if the owner's GUS session has lapsed (the capture comes back empty), the sync serves last-good data and pings the owner rather than wiping the table. Graceful degradation preserved: if `OPENAI_API_KEY` is unset, embeddings/chat skip but the structured dashboard and SQL-based factual answers still work.

---

## Phased plan (each phase ships independent value)

> **No Phase 0.** The GUS service-account / Connected App track is removed entirely — the owner has confirmed no extra GUS perms are obtainable. There is nothing to file and nothing to wait on; the critical path is pure engineering.

| Phase | Goal | Exit criteria |
|---|---|---|
| **1 — Schema + seed + fixed ingest** | Forward-only migration (do **not** re-run `schema.sql` — its `CREATE TRIGGER` lines 89/92 lack `IF NOT EXISTS` and throw). New `scripts/ingest-epics.js`: reads the 4 GUS arrays, seeds curated fields, canonicalizes ids to 18-char, UPSERTs by `(gus_epic_id, product)`, embeds. Retire crashing `ingest-data.js` (re-home `release_notes` loader). Also: provision the DB — `DATABASE_URL` is still the placeholder `username:password@localhost`, so the DB/tables don't exist yet. | `epics` has 442 rows by composite key (439 epics incl. the 2 no-id + 3 cross-product duplicates); psql COUNT of Blocked/Watch matches dashboard. |
| **2 — Hybrid grounded chat** | Rewrite `rag-service.js` to the two-tool design; switch vector to exact scan; re-add `chat.js`/`chat.css` to `index.html`; set `OPENAI_API_KEY`. **Gate:** chat must read the same rows the dashboard will (Phase 3) — freeze `epics` to match `data.js` until Phase 3 so chat & dashboard don't diverge in the interim. | Counting question returns exact SQL number; semantic question cites epics; both read `epics`. |
| **3 — Dashboard reads `epics`** | `GET /api/roadmap`, `/api/filters`, `/api/stats` with ETag; **parity-diff test comparing row *presence + counts*, not just fields** (catches the 2 no-id + 3 cross-product items); flip `app.js` behind a flag; remove the `data.js <script>` tag only after parity passes. | All 4 dashboards render identically from `epics`; 1MB file no longer parsed in browsers. |
| **4 — Automate the capture+sync** | Wrap today's flow in one command: owner's MCP/SSO capture → staging swap into Postgres → `sync_runs`. Schedule it on the **owner's session host** (laptop `cron`/`launchd` to start, or an always-on box the owner has authenticated on). Stale-session/zero-row guard + `/api/sync/status` + alert. Retire the manual `refresh-gus*.js` → git-commit → deploy loop. | Two scheduled cycles match a manual baseline; a deliberately-lapsed GUS session aborts+alerts and serves last-good data instead of wiping the table. |

**Right-sized path:** Phases 1–2 (fix the bug + grounded chat) are the high-value slice — a few days, behind today's infra and the data you already capture. Phase 3 (kill the 1MB parse, true single source of truth) is worthwhile but deferrable. Phase 4 makes the capture push-button/scheduled within the limits of session-based auth. **The old Phase 5 (JWT/CDC) is gone** — it depended on perms that won't exist.

---

## Open decisions for you

1. **~~GUS automation auth~~ — SETTLED (2026-06-26).** No service account / JWT is obtainable; the sync runs on the owner's existing interactive MCP/SSO session, period. The only remaining sub-choice is the **capture host**: laptop cron (free, breaks on sleep/SSO-expiry — fine given daily data + the stale-session guard), an always-on box the owner has authenticated on (best hands-off option short of a service account), or manual trigger (most reliable, costs the owner a minute a day). — **Recommended: laptop cron now, move to an always-on box only if "set-and-forget" becomes worth the hardware.**
2. **Retire `data.js` as the dashboard source (Phase 3)?** — Recommended yes, **after** Phases 1–2 ship and **only** behind a passing presence+count parity diff. Accept the new dependency (dashboard now needs the DB up) — mitigate with ETag caching + a health fallback.
3. **Where do curated fields live once `data.js` is "retired"?** They can't vanish. Options: (a) keep a `data.js`-derived **seed table** in Postgres that the sync merges onto; (b) push curation into GUS `Product_Feature__r` so SOQL carries it. (a) is far cheaper. — **Recommended (a).**
4. **Embedding model.** Keep OpenAI `text-embedding-3-small` (1536-dim) to avoid a reindex; the chat model is swappable independently. (If you ever migrate chat to Claude tool-use, hold the embedding model constant.)
5. **Votes/comments keying.** `feedback-service.js` keys feedback by feature; confirm it won't orphan when the dashboard moves to `gus_epic_id` keying. *(Not yet analyzed — flag before Phase 3.)*

---

## Must-fix-before-build (verified, load-bearing)

These are not edge cases — they are schema decisions that must be right in **Phase 1**:

- **Composite key `(gus_epic_id, product)`**, not `UNIQUE(gus_epic_id)`. *(3 epics in 2 products — verified.)*
- **Nullable `gus_epic_id` + surrogate PK.** *(2 items have no id — verified.)*
- **Canonicalize ids to 18-char on ingest.** *(171 are 15-char, 266 are 18-char — verified.)*
- **Curated-field provenance:** seed table holds title/description/overview/keyFeatures/customerFacing/featureCluster; sync merges operational fields *onto* it, never nulling them. *(verified: `applyFresh` never writes these, and SOQL doesn't even fetch them — they exist only in hand-authored `data.js`. This is why the curated layer can never be "replaced by GUS.")*
- **Delete/tombstone reconciliation** (`archived_at`) — the plan upserts but the data otherwise never goes away.
- **Atomic staging + swap**, not row-by-row upsert — an 11-batch pull that fails mid-way must not half-update the live table.
- **Forward-only migration**, never re-run `schema.sql` via `setup-database.js` (`CREATE TRIGGER` re-run throws).
- **Product enum:** use `gus/d360/service/slack` (the `app.js` keys), not the synthesis's stray `'sc'`.
- **Gate chat (Phase 2) on consistency** so the dashboard/chat divergence the project exists to kill doesn't ship during the gap.
- **Re-home the `release_notes` loader** when `ingest-data.js` is retired.

---

## Honest scope note

With the auth question settled (session-based only, no service account), this drops from **L toward M** — the entire Connected-App/JWT/CDC track is gone, and **there is no external dependency on the critical path; it's pure engineering.** The genuinely valuable, low-risk slice is **narrow**: (1) provision the DB (it doesn't exist yet) and fix the ingest to read the GUS arrays onto a correctly-keyed `epics` table, (2) ground chat with the SQL tool + exact-scan vector. That's a few days and delivers both stated goals (fresh data feeding a working Q&A) on the data you already capture. Phase 3 (frontend cutover) and Phase 4 (scheduled capture) are the durable end-state — worthwhile, each independently shippable and deferrable. The one inherent limit to accept: because GUS access is your interactive session, "continuous" means "scheduled on a host where you're logged in," not a Heroku daemon — and that's as good as it gets without perms you won't get.
