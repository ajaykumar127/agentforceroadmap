// Agentforce Roadmap v2 — frontend.
// Fetches from /v2/api/* (Postgres-backed) instead of the legacy 1 MB data.js.

const state = {
    product: 'gus',
    items: [],
    filters: {},          // server-provided distinct values
    active: {},           // { field: Set(values) }
    search: '',
};

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

async function api(path) {
    const r = await fetch(path, { credentials: 'same-origin' });
    if (!r.ok) throw new Error(`${path} → ${r.status}`);
    return r.json();
}

const healthClass = (h) => 'health ' + (h ? h.toLowerCase().replace(/[^a-z]+/g, '-') : 'none');

// ---- load a product ----
async function loadProduct(product) {
    state.product = product;
    state.active = {};
    state.search = '';
    $('#search').value = '';
    $('#grid').innerHTML = '<div class="loading">Loading…</div>';
    try {
        const [road, filt, stats, sync] = await Promise.all([
            api(`/v2/api/roadmap?product=${product}`),
            api(`/v2/api/filters?product=${product}`),
            api(`/v2/api/stats?product=${product}`),
            api(`/v2/api/sync/status`).catch(() => ({ sync: null })),
        ]);
        state.items = road.items;
        state.filters = filt.filters || {};
        renderStats(stats.stats);
        renderFilters();
        renderStamp(sync.sync);
        render();
    } catch (e) {
        $('#grid').innerHTML = `<div class="empty">Failed to load: ${esc(e.message)}</div>`;
    }
}

function renderStamp(sync) {
    const el = $('#syncStamp');
    if (!sync || !sync.finishedAt) { el.textContent = ''; return; }
    const d = new Date(sync.finishedAt).toISOString().slice(0, 10);
    el.textContent = `· synced ${d}`;
    el.title = `${sync.epicsSeen} epics seen, ${sync.epicsChanged} changed, ${sync.epicsArchived} archived`;
}

function renderStats(s) {
    if (!s) { $('#stats').innerHTML = ''; return; }
    const healthBars = (s.byHealth || []).map(h => {
        const cls = healthClass(h.health).split(' ')[1];
        const pct = s.total ? Math.round(h.n / s.total * 100) : 0;
        return `<span class="health ${cls}" style="width:${Math.max(pct, 4)}%" title="${esc(h.health)}: ${h.n}"></span>`;
    }).join('');
    $('#stats').innerHTML = `
        <div class="stat-card"><div class="n">${s.total}</div><div class="l">Epics</div></div>
        <div class="stat-card"><div class="n">${s.customerFacing ?? 0}</div><div class="l">Customer-facing</div></div>
        <div class="stat-card"><div class="n">${s.avgPercentComplete ?? '—'}%</div><div class="l">Avg complete</div></div>
        <div class="stat-card" style="flex:1;min-width:200px"><div class="l">Health mix</div><div class="bars">${healthBars}</div></div>
    `;
}

// Filter fields surfaced as chip groups (label → server filter key).
const FILTER_FIELDS = [
    { key: 'statuses', field: 'status', label: 'Status' },
    { key: 'healths', field: 'health', label: 'Health' },
    { key: 'builds', field: 'scheduledBuild', label: 'Build' },
    { key: 'clusters', field: 'featureCluster', label: 'Cluster' },
    { key: 'releaseStages', field: 'releaseStage', label: 'Stage' },
];

function renderFilters() {
    const bar = $('#filterBar');
    bar.innerHTML = '';
    for (const f of FILTER_FIELDS) {
        const vals = (state.filters[f.key] || []).filter(Boolean).sort();
        if (!vals.length) continue;
        const group = document.createElement('div');
        group.className = 'chip-group';
        group.innerHTML = `<span class="lbl">${f.label}</span>`;
        for (const v of vals) {
            const chip = document.createElement('button');
            chip.className = 'chip';
            chip.textContent = v;
            chip.onclick = () => {
                const set = state.active[f.field] || (state.active[f.field] = new Set());
                if (set.has(v)) set.delete(v); else set.add(v);
                if (!set.size) delete state.active[f.field];
                chip.classList.toggle('on');
                render();
            };
            group.appendChild(chip);
        }
        bar.appendChild(group);
    }
}

function matches(item) {
    for (const [field, set] of Object.entries(state.active)) {
        if (set.size && !set.has(item[field])) return false;
    }
    if (state.search) {
        const hay = [item.title, item.owner, item.featureCluster, item.productFeature, item.project, item.description]
            .join(' ').toLowerCase();
        if (!hay.includes(state.search)) return false;
    }
    return true;
}

function render() {
    const grid = $('#grid');
    const list = state.items.filter(matches);
    $('#empty').hidden = list.length > 0;
    grid.innerHTML = list.map(cardHtml).join('');
    $$('.card', grid).forEach((el, i) => { el.onclick = () => openModal(list[i]); });
}

function cardHtml(it) {
    const pct = (typeof it.percentComplete === 'number')
        ? `<div class="pct" title="${it.percentComplete}% complete"><i style="width:${it.percentComplete}%"></i></div>` : '';
    return `<article class="card">
        <h3>${esc(it.title)}</h3>
        <div class="meta">
            ${it.health ? `<span class="${healthClass(it.health)}">${esc(it.health)}</span>` : ''}
            ${it.scheduledBuild ? `<span class="build">${esc(it.period || it.scheduledBuild)}</span>` : ''}
            ${it.customerFacing ? `<span class="cf-dot">● customer-facing</span>` : ''}
        </div>
        ${it.owner ? `<div class="owner">👤 ${esc(it.owner)}${it.team ? ' · ' + esc(it.team) : ''}</div>` : ''}
        ${pct}
    </article>`;
}

function openModal(it) {
    const kv = (k, v) => v ? `<dt>${k}</dt><dd>${esc(v)}</dd>` : '';
    const feats = Array.isArray(it.keyFeatures) && it.keyFeatures.length
        ? `<h4>Key features</h4><ul>${it.keyFeatures.map(f => `<li>${esc(f)}</li>`).join('')}</ul>` : '';
    $('#modalBody').innerHTML = `
        <h2>${esc(it.title)}</h2>
        ${it.health ? `<span class="${healthClass(it.health)}">${esc(it.health)}</span>` : ''}
        <dl class="kv">
            ${kv('Product', it.product)}
            ${kv('Build', it.period || it.scheduledBuild)}
            ${kv('Status', it.status)}
            ${kv('% Complete', typeof it.percentComplete === 'number' ? it.percentComplete + '%' : '')}
            ${kv('Owner', it.owner)}
            ${kv('Dev lead', it.devLead)}
            ${kv('Team', it.team)}
            ${kv('Project', it.project)}
            ${kv('Cluster', it.featureCluster)}
            ${kv('Release stage', it.releaseStage)}
            ${kv('Target rollout', it.targetRollOutDate)}
            ${kv('Readiness', it.readinessStatus)}
            ${kv('Customer-facing', it.customerFacing ? 'Yes' : '')}
            ${kv('GUS epic', it.gusEpicId)}
        </dl>
        ${it.overview ? `<h4>Overview</h4><p>${esc(it.overview)}</p>` : ''}
        ${feats}
        ${it.impact ? `<h4>Latest status</h4><p>${esc(it.impact)}</p>` : ''}
        ${it.prdLink ? `<p><a href="${esc(it.prdLink)}" target="_blank" rel="noopener">PRD ↗</a></p>` : ''}
    `;
    $('#modal').hidden = false;
}

// ---- wire up ----
$('#productTabs').addEventListener('click', (e) => {
    const btn = e.target.closest('.ptab');
    if (!btn) return;
    $$('.ptab').forEach(b => b.classList.toggle('active', b === btn));
    loadProduct(btn.dataset.product);
});
$('#search').addEventListener('input', (e) => { state.search = e.target.value.toLowerCase().trim(); render(); });
$('#modal').addEventListener('click', (e) => { if (e.target.id === 'modal' || e.target.classList.contains('modal-close')) $('#modal').hidden = true; });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') $('#modal').hidden = true; });

loadProduct('gus');
