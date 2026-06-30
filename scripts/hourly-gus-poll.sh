#!/usr/bin/env bash
# scripts/hourly-gus-poll.sh
#
# One self-contained GUS refresh cycle, safe to run on a schedule.
# Intended to be invoked hourly (e.g. by the /loop command in a Claude
# Code session, or cron/launchd on the operator's machine).
#
# It does NOT itself call the GUS MCP (that needs the interactive Claude
# session). Instead the loop's agent step pulls GUS -> /tmp/gus_fresh.json,
# and THIS script validates that pull and ingests it into prod safely:
#   - aborts (non-zero) if the fresh pull is missing / empty / stale-looking,
#     so a lapsed GUS session never wipes or half-updates the table
#   - ingests via the atomic staging-swap in ingest-epics.js
#   - records a sync_runs row either way
#
# Env:
#   HEROKU_APP   (default: agentforce-roadmap)
#   GUS_FRESH    (default: /tmp/gus_fresh.json)
#   MIN_RECORDS  (default: 380) — guard floor; a real pull is ~434
set -uo pipefail

REPO="$(cd "$(dirname "$0")/.." && pwd)"
HEROKU_APP="${HEROKU_APP:-agentforce-roadmap}"
GUS_FRESH="${GUS_FRESH:-/tmp/gus_fresh.json}"
MIN_RECORDS="${MIN_RECORDS:-380}"
STAMP="$(date '+%Y-%m-%d %H:%M:%S')"

echo "[$STAMP] hourly-gus-poll starting (app=$HEROKU_APP, src=$GUS_FRESH)"

# --- Guard 1: the fresh pull must exist and be a non-trivial array --------
if [ ! -s "$GUS_FRESH" ]; then
  echo "[$STAMP] ABORT: $GUS_FRESH missing/empty — GUS session likely lapsed. Not touching prod data."
  exit 2
fi

COUNT=$(node -e "try{const a=require('$GUS_FRESH');process.stdout.write(String(Array.isArray(a)?a.length:0))}catch(e){process.stdout.write('0')}" 2>/dev/null)
if ! [ "$COUNT" -ge "$MIN_RECORDS" ] 2>/dev/null; then
  echo "[$STAMP] ABORT: fresh pull has $COUNT records (< MIN_RECORDS=$MIN_RECORDS). Refusing to ingest a partial/empty pull."
  exit 3
fi

# --- Guard 2: per-product coverage. A pull that misses a whole product
# (as a buggy ID list once did for D360/ServiceCloud) must NOT ingest —
# otherwise that product silently freezes on stale data with a fresh stamp.
COVERAGE=$(node -e "
  const fresh=require('$GUS_FRESH');
  const m=require('$REPO/data.js');
  const ids=new Set(fresh.map(r=>(r.Id||'').substring(0,15)));
  const sets={gus:m.roadmapDataGUS,d360:m.roadmapDataD360,service:m.roadmapDataServiceCloud,slack:m.roadmapDataSlack};
  let bad=[];
  for(const [k,arr] of Object.entries(sets)){
    const withId=arr.filter(r=>r.gusEpicId);
    const matched=withId.filter(r=>ids.has(r.gusEpicId.substring(0,15)));
    // require at least 50% of each product's id-bearing rows present
    if(withId.length && matched.length < withId.length*0.5) bad.push(k+'('+matched.length+'/'+withId.length+')');
  }
  process.stdout.write(bad.join(','));
" 2>/dev/null)
if [ -n "$COVERAGE" ]; then
  echo "[$STAMP] ABORT: fresh pull under-covers product(s): $COVERAGE. Refusing to ingest (would freeze a product on stale data)."
  exit 5
fi
echo "[$STAMP] fresh pull OK: $COUNT records, all products covered"

# --- Ingest into prod over SSL (atomic staging-swap inside the script) ----
PROD_DB="$(heroku config:get DATABASE_URL -a "$HEROKU_APP" 2>/dev/null)"
if [ -z "$PROD_DB" ]; then
  echo "[$STAMP] ABORT: could not read prod DATABASE_URL (heroku auth?)."
  exit 4
fi

DATABASE_URL="$PROD_DB" PGSSLMODE=require GUS_FRESH="$GUS_FRESH" \
  node "$REPO/scripts/ingest-epics.js"
RC=$?

if [ $RC -eq 0 ]; then
  echo "[$STAMP] ✅ ingest committed to prod."
else
  echo "[$STAMP] ❌ ingest failed (rc=$RC) — transaction rolled back, prod data unchanged."
fi
exit $RC
