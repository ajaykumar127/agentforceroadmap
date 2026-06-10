#!/usr/bin/env node
/**
 * scripts/refresh-gus.js
 *
 * Pull the current state of every Agentforce/SFAi epic tracked in
 * roadmapDataGUS and write the result back into data.js. This is the
 * repeatable version of the manual pipeline used on 2026-06-10.
 *
 * USAGE
 *   1. Run the SOQL queries below against GUS via your tool of choice
 *      (jsforce, the Salesforce CLI, or claude-code's gus MCP).
 *   2. Save the raw record array to /tmp/gus_fresh.json
 *      keyed either by 15- or 18-char Id, or as a flat array.
 *   3. node scripts/refresh-gus.js
 *
 * The Heroku app does not query GUS directly — there is no service
 * account, so the data is captured to data.js at deploy time.
 *
 * SOQL TEMPLATE (run in batches of ~50 ids):
 *
 *   SELECT Id, Name, Health__c, Epic_Phase__c, Epic_Health_Comments__c,
 *          Owner.Name, Development_Lead__r.Name, Design_Lead__r.Name,
 *          Quality_Lead__r.Name, Product_Owner__r.Name, TPM_Lead__r.Name,
 *          Scheduled_Build__r.Name, Team__r.Name, Project__r.Name,
 *          Description__c, LastModifiedDate, Category__c,
 *          Start_Date__c, End_Date__c, Actual_End_Date__c,
 *          Target_Roll_Out_Date__c, Source__c, Doc_Status__c,
 *          Readiness_Status__c, Accessibility_Status__c, T_Shirt_Size__c,
 *          Percent_Of_Work_Items_Complete__c, Slippage_Comments__c,
 *          Path_to_Green__c,
 *          Product_Feature__r.Name,
 *          Product_Feature__r.Feature_Public_Facing_Name__c,
 *          Product_Feature__r.Feature_Availability_Status__c,
 *          Product_Feature__r.Feature_Lifecycle_Stage__c,
 *          Product_Feature__r.Feature_Initial_Release_Date__c
 *   FROM ADM_Epic__c
 *   WHERE Id IN (...) AND IsDeleted = false
 *
 * To collect the IDs to refresh, the script reads the gusEpicId field
 * already on each entry in data.js. Epics without gusEpicId are skipped.
 */

const fs = require('fs');
const path = require('path');

const REPO = path.resolve(__dirname, '..');
const DATA_PATH = path.join(REPO, 'data.js');
const FRESH_PATH = process.env.GUS_FRESH || '/tmp/gus_fresh.json';

const dataModule = require(DATA_PATH);
const arr = dataModule.roadmapDataGUS;
const SALESFORCE_BUILDS = dataModule.SALESFORCE_BUILDS;
const src = fs.readFileSync(DATA_PATH, 'utf8');

if (!fs.existsSync(FRESH_PATH)) {
    console.error(`Missing ${FRESH_PATH}. Save the SOQL records as JSON to that path first.`);
    console.error('IDs to query:');
    const ids = arr.map(r => r.gusEpicId).filter(Boolean);
    console.error(ids.map(id => `'${id}'`).join(','));
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

// Trim Epic_Health_Comments__c down to roughly the most recent entry.
function trimComments(comments) {
    if (!comments) return '';
    const dateRegex = /\n\s*\d{1,2}\/\d{1,2}\b/g;
    const matches = [...comments.matchAll(dateRegex)];
    let cut = comments;
    if (matches.length >= 2) cut = comments.substring(0, matches[1].index).trim();
    if (cut.length > 1500) cut = cut.substring(0, 1500).trim() + '…';
    return cut;
}

// MCP-flattened scalars vs jsforce-style nested objects — both supported.
const traverse = (val) => (val && typeof val === 'object' && 'Name' in val) ? val.Name : val;

let stats = { changed: 0, unchanged: 0, missing: 0 };
for (const r of arr) {
    if (!r.gusEpicId) { stats.missing++; continue; }
    const f = byId[r.gusEpicId.substring(0, 15)] || byId[r.gusEpicId];
    if (!f) { stats.missing++; continue; }

    const before = JSON.stringify(r);

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
        if (trimmed) r.details.impact = trimmed;
    }

    if (JSON.stringify(r) !== before) stats.changed++; else stats.unchanged++;
}

console.log('Refresh stats:', stats);

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
const newBlock = `const LAST_GUS_REFRESH = "${today}";\nconst roadmapDataGUS = ` + jsLiteral(arr, 0) + ';';

const startMarker = src.includes('\nconst LAST_GUS_REFRESH = ')
    ? '\nconst LAST_GUS_REFRESH = '
    : '\nconst roadmapDataGUS = [';
const startIdx = src.indexOf(startMarker);
if (startIdx < 0) throw new Error('start marker not found');
const endMarker = '\n];\n\nif (typeof module';
const endIdx = src.indexOf(endMarker, startIdx);
if (endIdx < 0) throw new Error('end marker not found');

const before = src.substring(0, startIdx + 1);
const tail = src.substring(endIdx + 3);
const newTail = tail.replace(
    /module\.exports = \{ roadmapDataGUS(?:, LAST_GUS_REFRESH(?:, SALESFORCE_BUILDS)?)? \};/,
    'module.exports = { roadmapDataGUS, LAST_GUS_REFRESH, SALESFORCE_BUILDS };'
);

fs.writeFileSync(DATA_PATH, before + newBlock + newTail);
console.log(`Wrote ${DATA_PATH}`);
console.log(`LAST_GUS_REFRESH = ${today}`);
