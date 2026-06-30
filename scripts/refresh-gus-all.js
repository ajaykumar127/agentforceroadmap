#!/usr/bin/env node
/**
 * scripts/refresh-gus-all.js
 *
 * Generalization of refresh-gus.js that refreshes all four GUS-backed
 * datasets in data.js (roadmapDataGUS, roadmapDataD360,
 * roadmapDataServiceCloud, roadmapDataSlack) from a single
 * /tmp/gus_fresh.json snapshot. Each block's LAST_GUS_REFRESH_<X>
 * constant is bumped to today.
 *
 * USAGE
 *   1. Pull SOQL records for every gusEpicId in the four arrays and
 *      save them as a flat JSON array (or id-keyed object) to
 *      /tmp/gus_fresh.json. See refresh-gus.js for the SOQL template.
 *   2. node scripts/refresh-gus-all.js
 */

const fs = require('fs');
const path = require('path');

const REPO = path.resolve(__dirname, '..');
const DATA_PATH = path.join(REPO, 'data.js');
const FRESH_PATH = process.env.GUS_FRESH || '/tmp/gus_fresh.json';

const dataModule = require(DATA_PATH);
const SALESFORCE_BUILDS = dataModule.SALESFORCE_BUILDS;

if (!fs.existsSync(FRESH_PATH)) {
    console.error(`Missing ${FRESH_PATH}. Save the SOQL records as JSON to that path first.`);
    process.exit(1);
}

const fresh = JSON.parse(fs.readFileSync(FRESH_PATH, 'utf8'));
const byId = {};
const ingest = (rec) => {
    if (!rec || !rec.Id) return;
    byId[rec.Id.substring(0, 15)] = rec;
    byId[rec.Id] = rec;
};
if (Array.isArray(fresh)) fresh.forEach(ingest);
else for (const k of Object.keys(fresh)) ingest(fresh[k]);

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

const traverse = (val) => (val && typeof val === 'object' && 'Name' in val) ? val.Name : val;

function applyFresh(r, f) {
    const owner = traverse(f.Owner);
    if (owner) r.owner = owner;
    const devLead = traverse(f.Development_Lead) || (f.Development_Lead__r && f.Development_Lead__r.Name);
    if (devLead) r.devLead = devLead;
    const designLead = traverse(f.Design_Lead) || (f.Design_Lead__r && f.Design_Lead__r.Name);
    if (designLead) r.designLead = designLead;
    const qualityLead = traverse(f.Quality_Lead) || (f.Quality_Lead__r && f.Quality_Lead__r.Name);
    if (qualityLead) r.qualityLead = qualityLead;
    const productOwner = traverse(f.Product_Owner) || (f.Product_Owner__r && f.Product_Owner__r.Name);
    if (productOwner) r.productOwner = productOwner;
    const tpmLead = traverse(f.TPM_Lead) || (f.TPM_Lead__r && f.TPM_Lead__r.Name);
    if (tpmLead) r.tpmLead = tpmLead;
    const team = traverse(f.Team) || (f.Team__r && f.Team__r.Name);
    if (team) r.team = team;
    const project = traverse(f.Project) || (f.Project__r && f.Project__r.Name);
    if (project) r.project = project;

    if (f.Health__c) {
        r.health = f.Health__c;
        r.status = statusFromHealth(f.Health__c);
    }

    const sb = traverse(f.Scheduled_Build) || (f.Scheduled_Build__r && f.Scheduled_Build__r.Name);
    if (sb) {
        r.scheduledBuild = sb;
        r.date = sb;
        r.period = periodFor(sb);
        r.quarter = r.period;
    }

    r.targetRollOutDate = f.Target_Roll_Out_Date__c || null;
    r.docStatus = f.Doc_Status__c || null;
    r.readinessStatus = f.Readiness_Status__c || null;
    r.a11yStatus = f.Accessibility_Status__c || null;
    r.tShirtSize = f.T_Shirt_Size__c || null;
    r.percentComplete = (typeof f.Percent_Of_Work_Items_Complete__c === 'number') ? f.Percent_Of_Work_Items_Complete__c : null;
    r.slippageComments = f.Slippage_Comments__c || null;
    r.pathToGreen = f.Path_to_Green__c || null;
    r.source = f.Source__c || null;
    r.epicCategory = f.Category__c || null;
    r.gusLastModified = f.LastModifiedDate || null;

    const pf = f.Product_Feature__r;
    r.releaseStage = (pf && pf.Feature_Availability_Status__c) || null;
    r.featureLifecycleStage = (pf && pf.Feature_Lifecycle_Stage__c) || null;
    r.productFeature = (pf && (pf.Feature_Public_Facing_Name__c || pf.Name)) || null;

    if (f.Epic_Health_Comments__c) {
        const trimmed = trimComments(f.Epic_Health_Comments__c);
        if (trimmed) r.details = r.details || {}, r.details.impact = trimmed;
    }
}

function jsLiteral(value, indent = 0) {
    const pad = '    '.repeat(indent);
    const padInner = '    '.repeat(indent + 1);
    if (value === null) return 'null';
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

const today = new Date().toISOString().slice(0, 10);

// Four datasets to refresh. The order matters only for cosmetic stats output;
// rewrite uses unique start/end markers so order in the file is preserved.
const DATASETS = [
    { arrName: 'roadmapDataGUS',          stampName: 'LAST_GUS_REFRESH' },
    { arrName: 'roadmapDataD360',         stampName: 'LAST_GUS_REFRESH_D360' },
    { arrName: 'roadmapDataServiceCloud', stampName: 'LAST_GUS_REFRESH_SC' },
    { arrName: 'roadmapDataSlack',        stampName: 'LAST_GUS_REFRESH_SLACK' },
];

let src = fs.readFileSync(DATA_PATH, 'utf8');
const overallStats = {};

for (const { arrName, stampName } of DATASETS) {
    const arr = dataModule[arrName];
    if (!Array.isArray(arr)) {
        console.error(`Skipping ${arrName}: not an array in data.js`);
        continue;
    }
    const stats = { changed: 0, unchanged: 0, missing: 0 };
    for (const r of arr) {
        if (!r.gusEpicId) { stats.missing++; continue; }
        const f = byId[r.gusEpicId.substring(0, 15)] || byId[r.gusEpicId];
        if (!f) { stats.missing++; continue; }
        const before = JSON.stringify(r);
        applyFresh(r, f);
        if (JSON.stringify(r) !== before) stats.changed++; else stats.unchanged++;
    }
    overallStats[arrName] = stats;

    const newBlock = `const ${stampName} = "${today}";\nconst ${arrName} = ` + jsLiteral(arr, 0) + ';';

    const startMarker = `\nconst ${stampName} = `;
    const startIdx = src.indexOf(startMarker);
    if (startIdx < 0) {
        console.error(`Start marker for ${stampName} not found; skipping rewrite.`);
        continue;
    }
    const arrStart = src.indexOf(`\nconst ${arrName} = [`, startIdx);
    if (arrStart < 0) throw new Error(`Array start for ${arrName} not found`);
    const arrEnd = src.indexOf('\n];\n', arrStart);
    if (arrEnd < 0) throw new Error(`Array end for ${arrName} not found`);

    src = src.substring(0, startIdx + 1) + newBlock + src.substring(arrEnd + 3);
}

fs.writeFileSync(DATA_PATH, src);

console.log('Refresh stats:');
for (const k of Object.keys(overallStats)) console.log(' ', k, overallStats[k]);
console.log(`LAST_GUS_REFRESH* stamps -> ${today}`);
console.log(`Wrote ${DATA_PATH}`);
