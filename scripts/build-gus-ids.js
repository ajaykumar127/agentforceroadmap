#!/usr/bin/env node
/**
 * scripts/build-gus-ids.js
 *
 * Regenerate /tmp/gus_ids.json from data.js — the canonical list of epic
 * IDs to poll, spanning ALL FOUR product datasets (gus, d360, service,
 * slack). Run this before every GUS poll so the ID list can never drift
 * out of sync with the data (a hand-built scratch list once silently
 * dropped D360 + ServiceCloud, freezing them on stale data).
 *
 * Writes: { datasets: {gus:[...],...}, allUnique15: [...] }
 */
const fs = require('fs');
const path = require('path');
const m = require(path.resolve(__dirname, '..', 'data.js'));
const OUT = process.env.GUS_IDS || '/tmp/gus_ids.json';

const SETS = [
    ['gus', m.roadmapDataGUS],
    ['d360', m.roadmapDataD360],
    ['service', m.roadmapDataServiceCloud],
    ['slack', m.roadmapDataSlack],
];

const out = { datasets: {}, allUnique15: [] };
const uniq = new Set();
for (const [k, arr] of SETS) {
    if (!Array.isArray(arr)) { console.error(`WARN: ${k} not an array`); out.datasets[k] = []; continue; }
    out.datasets[k] = arr.map(r => r.gusEpicId).filter(Boolean);
    out.datasets[k].forEach(id => uniq.add(id.substring(0, 15)));
}
out.allUnique15 = [...uniq];
fs.writeFileSync(OUT, JSON.stringify(out, null, 2));
console.log(`Wrote ${OUT}: ${out.allUnique15.length} unique ids (` +
    SETS.map(([k]) => `${k}=${out.datasets[k].length}`).join(' ') + ')');
