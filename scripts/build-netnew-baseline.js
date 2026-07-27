#!/usr/bin/env node
/**
 * scripts/build-netnew-baseline.js
 *
 * Turn /tmp/netnew_full.json (1033 fresh GUS ADM_Epic__c records, already
 * markdown-cleaned) into a DETERMINISTIC curated baseline that matches the
 * shape of the hand-curated items in data.js (roadmapDataGUS etc.).
 *
 * No LLM here — every field is derived mechanically from the GUS record, so
 * there is zero hallucination risk. A later workflow step REFINES the
 * overview/keyFeatures/customerFacing/featureCluster grounded in this text.
 *
 * Writes:
 *   /tmp/seed_baseline.json         — all 1033 baseline items (with ds + raw source text)
 *   /tmp/seed_batch_<NN>.json       — the same, split into batches for the workflow
 */
const fs = require('fs');
const path = require('path');

const REPO = path.resolve(__dirname, '..');
const m = require(path.join(REPO, 'data.js'));
const SALESFORCE_BUILDS = m.SALESFORCE_BUILDS || {};

const all = JSON.parse(fs.readFileSync('/tmp/netnew_full.json', 'utf8'));
const idDs = JSON.parse(fs.readFileSync('/tmp/candidate_id_ds.json', 'utf8'));

// ---- helpers ----------------------------------------------------------
const to18 = (id) => {
    if (!id) return null; id = String(id).trim();
    if (id.length === 18) return id; if (id.length !== 15) return id;
    let s = ''; for (let b = 0; b < 3; b++) { let v = 0; for (let i = 0; i < 5; i++) { const c = id[b * 5 + i]; if (c >= 'A' && c <= 'Z') v += 1 << i; } s += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ012345'[v]; } return id + s;
};
const traverse = (v) => (v && typeof v === 'object' && 'Name' in v) ? v.Name : v;
function periodFor(build) { const b = SALESFORCE_BUILDS[String(build).trim()]; return b ? `${b.name} (${build})` : build; }
function statusFromHealth(h) { if (h === 'Completed') return 'completed'; if (h === 'On Track' || h === 'Watch' || h === 'Blocked') return 'in-progress'; return 'planned'; }

// Clean a GUS epic Name into a display title: strip leading build-tag / bracket
// prefixes like "[264] [UDS] [BYOK] - " and "262 Trust: " and "[SP - 262] ".
function cleanTitle(name) {
    if (!name) return '(untitled)';
    let t = String(name).trim();
    // strip repeated leading [....] bracket groups
    let prev;
    do { prev = t; t = t.replace(/^\s*\[[^\]]*\]\s*[-–:]?\s*/, ''); } while (t !== prev && t.length > 3);
    // strip a leading build number token "262 " / "262: " / "262 - "
    t = t.replace(/^\s*\d{3}(\.\w+)?\s*[-–:]?\s*/, '');
    // strip leading standalone tag words we recognize as build/tag noise
    t = t.trim();
    if (!t) t = String(name).trim();
    // collapse whitespace
    return t.replace(/\s+/g, ' ').slice(0, 160);
}

// HTML -> plain text (block tags -> newlines, strip the rest, decode entities).
function htmlToText(html) {
    if (!html) return '';
    let s = String(html);
    s = s.replace(/<\s*(br|\/p|\/li|\/h[1-6]|\/div|\/tr)\s*>/gi, '\n');
    s = s.replace(/<\s*li[^>]*>/gi, '• ');
    s = s.replace(/<[^>]+>/g, '');
    const ent = { '&nbsp;': ' ', '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&rsquo;': '’', '&lsquo;': '‘', '&ldquo;': '“', '&rdquo;': '”', '&mdash;': '—', '&ndash;': '–', '&hellip;': '…' };
    s = s.replace(/&[a-z#0-9]+;/gi, e => ent[e] !== undefined ? ent[e] : ' ');
    s = s.replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').replace(/[ \t]{2,}/g, ' ');
    return s.trim();
}

// Extract bullet-ish key features from the HTML (list items / lines).
function extractKeyFeatures(html) {
    if (!html) return [];
    const items = [];
    const liRe = /<li[^>]*>([\s\S]*?)<\/li>/gi; let mm;
    while ((mm = liRe.exec(html)) !== null) {
        const t = htmlToText(mm[1]).replace(/^•\s*/, '').trim();
        if (t && t.length > 3 && t.length < 240) items.push(t);
    }
    return items.slice(0, 8);
}

// First 1-2 sentences of the description text, as a baseline overview.
function baselineOverview(text) {
    if (!text) return '';
    const flat = text.replace(/\n+/g, ' ').replace(/•\s*/g, '').trim();
    const sentences = flat.match(/[^.!?]+[.!?]+/g) || [flat];
    let out = ''; for (const s of sentences) { if ((out + s).length > 320) break; out += s; }
    return (out || flat).trim().slice(0, 400);
}

// Build a team->cluster map from the EXISTING curated data per dataset, so new
// epics inherit the cluster their teammates already use.
const teamCluster = { gus: {}, d360: {}, service: {}, slack: {} };
const sets = { gus: m.roadmapDataGUS, d360: m.roadmapDataD360, service: m.roadmapDataServiceCloud, slack: m.roadmapDataSlack };
for (const [k, arr] of Object.entries(sets)) {
    const tally = {};
    for (const r of arr) {
        if (!r.team || !r.featureCluster) continue;
        (tally[r.team] = tally[r.team] || {})[r.featureCluster] = (tally[r.team]?.[r.featureCluster] || 0) + 1;
    }
    for (const [team, clusters] of Object.entries(tally)) {
        teamCluster[k][team] = Object.entries(clusters).sort((a, b) => b[1] - a[1])[0][0];
    }
}

// Baseline customerFacing: Feature category => candidate true; Trust/Eng/Ops => false.
// (Refined by the LLM step, but this is a sane default.)
function baselineCustomerFacing(ds, cat) {
    if (ds === 'gus') return false;                 // gus view is internal (matches existing 0/141)
    return cat === 'Feature';
}

const out = [];
for (const r of all) {
    const ds = idDs[(r.Id || '').substring(0, 15)] || 'gus';
    const descText = htmlToText(r.Description__c);
    const item = {
        ds,
        gusEpicId: to18(r.Id),
        rawName: r.Name,
        title: cleanTitle(r.Name),
        category: 'feature',
        status: statusFromHealth(r.Health__c),
        health: r.Health__c || null,
        scheduledBuild: traverse(r.Scheduled_Build) || null,
        period: periodFor(traverse(r.Scheduled_Build)),
        owner: traverse(r.Owner) || null,
        devLead: (r.Development_Lead__r && r.Development_Lead__r.Name) || r.Development_Lead || null,
        team: traverse(r.Team) || null,
        project: traverse(r.Project) || null,
        percentComplete: (typeof r.Percent_Of_Work_Items_Complete__c === 'number') ? r.Percent_Of_Work_Items_Complete__c : null,
        targetRollOutDate: r.Target_Roll_Out_Date__c || null,
        readinessStatus: r.Readiness_Status__c || null,
        epicCategory: r.Category__c || null,
        gusLastModified: r.LastModifiedDate || null,
        // curated (baseline, LLM-refined later)
        description: baselineOverview(descText),
        overview: baselineOverview(descText),
        keyFeatures: extractKeyFeatures(r.Description__c),
        customerFacing: baselineCustomerFacing(ds, r.Category__c),
        featureCluster: (teamCluster[ds] && teamCluster[ds][traverse(r.Team)]) || (ds === 'gus' ? null : 'Other'),
        // raw source text handed to the LLM step (grounding), trimmed
        _sourceText: descText.slice(0, 1800),
        _hasDesc: !!r.Description__c,
    };
    out.push(item);
}

fs.writeFileSync('/tmp/seed_baseline.json', JSON.stringify(out, null, 2));

// split into batches of 30
const SIZE = 30;
const batches = [];
for (let i = 0; i < out.length; i += SIZE) batches.push(out.slice(i, i + SIZE));
batches.forEach((b, i) => fs.writeFileSync(`/tmp/seed_batch_${String(i).padStart(2, '0')}.json`, JSON.stringify(b)));

const byDs = {}; for (const r of out) byDs[r.ds] = (byDs[r.ds] || 0) + 1;
const withDesc = out.filter(r => r._hasDesc).length;
console.log(`baseline: ${out.length} items ${JSON.stringify(byDs)}`);
console.log(`with description: ${withDesc}, name-only: ${out.length - withDesc}`);
console.log(`wrote /tmp/seed_baseline.json + ${batches.length} batch files (/tmp/seed_batch_00.json ..)`);
console.log('sample title cleans:');
out.slice(0, 6).forEach(r => console.log(`  [${r.ds}] "${r.rawName}" -> "${r.title}"`));
