// Agentforce Roadmap Application
// Main application logic

class RoadmapApp {
    constructor() {
        this.currentVersion = 'v4';
        this.dataVersions = {
            combined: roadmapDataCombined,
            gus: roadmapDataGUS,
            v1: roadmapDataV1,
            v2: roadmapDataV2,
            v3: roadmapDataV3,
            v4: roadmapDataV4,
        };
        // Views that require an additional in-app password before showing data.
        // Soft gate only — every user is already vibewareauth-authenticated.
        this.viewLocks = {
            combined: 'agentforce1!',
            gus:      'agentforce1!',
        };
        this.data = this.dataVersions[this.currentVersion];
        this.filteredData = [...this.data];
        this.currentView = 'timeline';
        this.activeFilters = { category: new Set(), status: new Set(), releaseStage: new Set() };
        this.searchQuery = '';
        this.feedbackSummary = {};   // { 'v4:7': { votes: 3, comments: 2, userVoted: true } }
        this.initTheme();
        this.init();
    }

    // Stable identifier for a feature across views.
    // V4 view: 'v4:7'. Combined view: uses item.version + item._origId.
    // GUS: 'gus:<id>'. Other historical: '<version>:<id>'.
    featureKey(item) {
        if (!item) return null;
        const v = item.version || (this.currentVersion === 'gus' ? 'gus' : this.currentVersion);
        const id = item._origId != null ? item._origId : item.id;
        return `${v}:${id}`;
    }

    async loadFeedbackSummary() {
        try {
            const r = await fetch('/api/feedback/summary', { credentials: 'same-origin' });
            if (!r.ok) return;
            this.feedbackSummary = await r.json();
            // Re-render to surface counts (no-op if data identical)
            if (this.currentView !== 'customer') this.render();
        } catch (e) { /* feedback is optional */ }
    }

    summaryFor(item) {
        const key = this.featureKey(item);
        return this.feedbackSummary[key] || { votes: 0, comments: 0, userVoted: false };
    }

    isViewUnlocked(version) {
        if (!this.viewLocks[version]) return true;
        return sessionStorage.getItem('vw_view_unlock_' + version) === '1';
    }

    markViewUnlocked(version) {
        sessionStorage.setItem('vw_view_unlock_' + version, '1');
    }

    promptForViewPassword(version, label) {
        return new Promise((resolve) => {
            const expected = this.viewLocks[version];
            // Lazy-create a single overlay element
            let overlay = document.getElementById('viewLockOverlay');
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.id = 'viewLockOverlay';
                overlay.className = 'view-lock-overlay';
                overlay.innerHTML = `
                    <div class="view-lock-card">
                        <h3>🔒 Restricted view</h3>
                        <p class="view-lock-msg" id="viewLockMsg">Enter the access password to view this dataset.</p>
                        <p class="view-lock-target" id="viewLockTarget"></p>
                        <input type="password" id="viewLockInput" placeholder="Password" autocomplete="off" />
                        <div class="view-lock-error" id="viewLockError"></div>
                        <div class="view-lock-actions">
                            <button class="view-lock-cancel" id="viewLockCancel" type="button">Cancel</button>
                            <button class="view-lock-submit" id="viewLockSubmit" type="button">Unlock</button>
                        </div>
                    </div>`;
                document.body.appendChild(overlay);
            }
            const target = overlay.querySelector('#viewLockTarget');
            const input = overlay.querySelector('#viewLockInput');
            const err = overlay.querySelector('#viewLockError');
            const submit = overlay.querySelector('#viewLockSubmit');
            const cancel = overlay.querySelector('#viewLockCancel');
            target.textContent = label || version;
            input.value = '';
            err.textContent = '';
            overlay.classList.add('is-open');
            setTimeout(() => input.focus(), 30);

            let attempts = 0;
            const cleanup = (result) => {
                overlay.classList.remove('is-open');
                submit.removeEventListener('click', onSubmit);
                cancel.removeEventListener('click', onCancel);
                input.removeEventListener('keydown', onKey);
                resolve(result);
            };
            const onSubmit = () => {
                if (input.value === expected) {
                    this.markViewUnlocked(version);
                    cleanup(true);
                } else {
                    attempts++;
                    err.textContent = attempts >= 3 ? 'Incorrect (3 attempts) — try again.' : 'Incorrect password.';
                    input.value = '';
                    input.focus();
                }
            };
            const onCancel = () => cleanup(false);
            const onKey = (e) => {
                if (e.key === 'Enter') { e.preventDefault(); onSubmit(); }
                if (e.key === 'Escape') { e.preventDefault(); onCancel(); }
            };
            submit.addEventListener('click', onSubmit);
            cancel.addEventListener('click', onCancel);
            input.addEventListener('keydown', onKey);
        });
    }
    
    initTheme() {
        // Check for saved theme preference or default to light mode
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        // Set toggle position
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.checked = savedTheme === 'dark';
        }
    }
    
    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }

    init() {
        this.setupEventListeners();
        this.updateVersionInfo();
        this.renderDashboard();
        this.renderFilterChips();
        this.render();
        this.loadFeedbackSummary();
    }

    // ----- Dashboard -----
    renderDashboard() {
        const el = document.getElementById('dashboardStats');
        if (!el) return;
        if (this.currentVersion === 'customer') { el.innerHTML = ''; return; }

        const data = this.data;
        const v = this.currentVersion;
        const counts = { total: data.length, completed: 0, 'in-progress': 0, planned: 0, future: 0, pilot: 0 };
        const owners = new Set();
        const ownerCounts = {};
        const isMeta = name => !name || name.startsWith('—');
        data.forEach(i => {
            if (counts[i.status] !== undefined) counts[i.status]++;
            if (i.owner && !isMeta(i.owner)) {
                owners.add(i.owner);
                ownerCounts[i.owner] = (ownerCounts[i.owner] || 0) + 1;
            }
        });
        const topOwners = Object.entries(ownerCounts).sort((a,b)=>b[1]-a[1]).slice(0,3);

        // Version-specific callout
        let calloutTitle = '', calloutNum = '', calloutSubtitle = '';
        if (v === 'v4') {
            const monthLabels = ['May 2026','June 2026'];
            const inWindow = data.filter(i => monthLabels.includes(i.period)).length;
            calloutTitle = '📅 This window (May–Jun ’26)';
            calloutNum = `${inWindow} features`;
        } else if (v === 'gus') {
            const onTrack = data.filter(i => (i.health || '').toLowerCase().includes('on track')).length;
            const blocked = data.filter(i => (i.health || '').toLowerCase().includes('blocked')).length;
            calloutTitle = '🩺 Build 262 health';
            calloutNum = `${onTrack} on track${blocked ? ` · ${blocked} blocked` : ''}`;
        } else if (v === 'combined') {
            calloutTitle = '🗂️ Historical roadmap';
            calloutNum = `V1 + V2 + V3 + V4`;
            calloutSubtitle = `Spanning Q4 2024 → August 2026+`;
        } else {
            calloutTitle = `📋 ${v.toUpperCase()} dataset`;
            calloutNum = `${counts.total} items`;
        }

        const stat = (n, label, klass) => `
            <div class="stat-card ${klass||''}">
                <div class="stat-num">${n}</div>
                <div class="stat-label">${label}</div>
            </div>`;
        el.innerHTML = `
            ${stat(counts.total, 'Total Features', 'is-total')}
            ${stat(counts.completed, 'Delivered', 'is-completed')}
            ${stat(counts['in-progress'], 'In Progress', 'is-in-progress')}
            ${stat(counts.planned, 'Planned', 'is-planned')}
            ${stat(counts.future, 'In Build', 'is-future')}
            ${stat(owners.size, 'Owners', 'is-owners')}
            <div class="stat-card stat-callout">
                <div class="stat-callout-title">${calloutTitle}</div>
                <div class="stat-callout-num">${calloutNum}</div>
                ${calloutSubtitle ? `<div class="stat-callout-sub">${calloutSubtitle}</div>` :
                  (topOwners.length ? `<div class="stat-callout-sub">Top owners: ${topOwners.map(([n,c])=>`<span class="owner-pill">${n} · ${c}</span>`).join(' ')}</div>` : '')}
            </div>
        `;
    }

    // ----- Filter chips -----
    renderFilterChips() {
        const bar = document.getElementById('filterChipsBar');
        if (!bar) return;
        if (this.currentVersion === 'customer') { bar.innerHTML = ''; return; }

        const cats = [...new Set(this.data.map(i => i.category))].filter(Boolean).sort();
        const statuses = ['completed','in-progress','planned','future','pilot']
            .filter(s => this.data.some(i => i.status === s));

        const chipHtml = (group, value, label, count) => {
            const active = this.activeFilters[group].has(value);
            return `<button class="chip ${active?'is-active':''} chip-${group}-${value}"
                            data-group="${group}" data-value="${value}">
                       <span class="chip-label">${label}</span>
                       <span class="chip-count">${count}</span>
                    </button>`;
        };

        const statusCounts = {};
        const catCounts = {};
        const stageCounts = {};
        this.data.forEach(i => {
            statusCounts[i.status] = (statusCounts[i.status] || 0) + 1;
            catCounts[i.category] = (catCounts[i.category] || 0) + 1;
            const sk = i.releaseStage || 'Unspecified';
            stageCounts[sk] = (stageCounts[sk] || 0) + 1;
        });

        const statusChips = statuses.map(s => chipHtml('status', s, this.formatStatus(s), statusCounts[s] || 0)).join('');
        const catChips = cats.map(c => chipHtml('category', c, this.formatCategory(c), catCounts[c] || 0)).join('');

        // Release-stage chips: only show the row if any tagged epic exists OR we're on the GUS view.
        const stageOrder = ['GA', 'GA with Limited Availability', 'Beta', 'Pilot', 'Not Deployed', 'Retired', 'Unspecified'];
        const stagesPresent = stageOrder.filter(s => stageCounts[s] > 0);
        const showStages = this.currentVersion === 'gus' && stagesPresent.length > 0;
        const stageChips = showStages
            ? stagesPresent.map(s => chipHtml('releaseStage', s, this.formatReleaseStage(s), stageCounts[s] || 0)).join('')
            : '';
        const stageGroup = showStages
            ? `<div class="chip-group">
                   <span class="chip-group-label" title="Source: ADM_Epic__c.Product_Feature__r.Feature_Availability_Status__c">Release stage</span>
                   ${stageChips}
               </div>`
            : '';

        const totalActive = this.activeFilters.category.size + this.activeFilters.status.size + this.activeFilters.releaseStage.size;
        const clearBtn = totalActive > 0
            ? `<button class="chip chip-clear" id="chipClear">Clear all ✕</button>` : '';

        bar.innerHTML = `
            <div class="chip-group">
                <span class="chip-group-label">Status</span>
                ${statusChips}
            </div>
            <div class="chip-group">
                <span class="chip-group-label">Category</span>
                ${catChips}
            </div>
            ${stageGroup}
            ${clearBtn}
        `;

        const clear = document.getElementById('chipClear');
        if (clear) clear.addEventListener('click', () => {
            this.activeFilters.category.clear();
            this.activeFilters.status.clear();
            this.activeFilters.releaseStage.clear();
            this.renderFilterChips();
            this.applyFilters();
        });
    }

    toggleChip(group, value) {
        const set = this.activeFilters[group];
        if (set.has(value)) set.delete(value); else set.add(value);
        this.renderFilterChips();
        this.applyFilters();
    }

    updateVersionInfo() {
        const versionInfo = document.getElementById('versionInfo');
        let versionName = '';
        let itemCount = '';

        if (this.currentVersion === 'customer') {
            versionName = 'Customer Facing - Release Notes';
            itemCount = 'Official Salesforce Documentation';
        } else {
            const versionNames = {
                'combined': 'Historical Roadmap (V1 + V2 + V3 + V4 combined)',
                'gus': 'GUS Live · Agentforce / SFAi Epics',
                'v1': 'V1 - Core Roadmap',
                'v2': 'V2 - Extended Roadmap',
                'v3': 'V3 - Q1-Q2 2026 Roadmap (Updated March 2026)',
                'v4': 'Latest View May-June 2026',
            };
            versionName = versionNames[this.currentVersion] || 'V1 - Core Roadmap';
            const refreshStamp = (this.currentVersion === 'gus' && typeof LAST_GUS_REFRESH !== 'undefined')
                ? ` <span class="refresh-stamp" title="Last refreshed from GUS ADM_Epic__c">· Refreshed ${LAST_GUS_REFRESH}</span>` : '';
            itemCount = `${this.data.length} items${refreshStamp}`;
        }

        versionInfo.innerHTML = `<strong>${versionName}</strong> • ${itemCount}`;
    }

    setupEventListeners() {
        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('change', () => {
                this.toggleTheme();
            });
        }

        // Version selector — gate locked views with a password prompt
        const versionSelect = document.getElementById('versionSelect');
        versionSelect.addEventListener('change', async (e) => {
            const newV = e.target.value;
            if (this.viewLocks[newV] && !this.isViewUnlocked(newV)) {
                const label = e.target.options[e.target.selectedIndex].text;
                const ok = await this.promptForViewPassword(newV, label);
                if (!ok) {
                    versionSelect.value = this.currentVersion; // revert dropdown
                    return;
                }
            }
            this.switchVersion(newV);
        });

        // View toggle
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchView(e.target.closest('.view-btn').dataset.view);
            });
        });

        // Search
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });

        // Filter chips (event delegation)
        const chipsBar = document.getElementById('filterChipsBar');
        if (chipsBar) {
            chipsBar.addEventListener('click', (e) => {
                const chip = e.target.closest('.chip');
                if (!chip) return;
                const group = chip.dataset.group;
                const value = chip.dataset.value;
                if (group && value) this.toggleChip(group, value);
            });
        }

        // Export button
        document.getElementById('exportBtn').addEventListener('click', () => {
            this.exportData();
        });

        // Modal close
        const modal = document.getElementById('itemModal');
        const closeBtn = document.querySelector('.close-modal');
        
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                modal.classList.remove('active');
            }
            if (e.key === '/' && e.target.tagName !== 'INPUT') {
                e.preventDefault();
                searchInput.focus();
            }
        });

        // Release detail links
        document.addEventListener('click', (e) => {
            if (e.target.closest('.release-detail-link')) {
                e.preventDefault();
                const releaseId = e.target.closest('.release-detail-link').dataset.release;
                this.showReleaseDetail(releaseId);
            }
        });

        // Back to releases button
        document.getElementById('backToReleases').addEventListener('click', () => {
            this.backToCustomerView();
        });
    }

    switchVersion(version) {
        this.currentVersion = version;

        const controlsBar = document.querySelector('.controls-bar');
        const chipsBar = document.getElementById('filterChipsBar');
        const dashboard = document.getElementById('dashboardStats');

        // Handle customer facing version (release notes)
        if (version === 'customer') {
            controlsBar.style.display = 'none';
            if (chipsBar) chipsBar.style.display = 'none';
            if (dashboard) dashboard.style.display = 'none';

            document.querySelectorAll('.view-container').forEach(c => c.classList.remove('active'));
            document.getElementById('customerView').classList.add('active');
            this.updateVersionInfo();
            return;
        }

        // Show controls + chips + dashboard for data versions
        controlsBar.style.display = '';
        if (chipsBar) chipsBar.style.display = '';
        if (dashboard) dashboard.style.display = '';

        // Update data
        this.data = this.dataVersions[version];
        this.activeFilters.category.clear();
        this.activeFilters.status.clear();
        this.activeFilters.releaseStage.clear();
        this.searchQuery = '';
        this.filteredData = [...this.data];

        // Reset UI
        document.getElementById('searchInput').value = '';

        // Show the current view (timeline, grid, list, or owner)
        document.querySelectorAll('.view-container').forEach(c => c.classList.remove('active'));
        document.getElementById(`${this.currentView}View`).classList.add('active');

        this.updateVersionInfo();
        this.renderDashboard();
        this.renderFilterChips();
        this.render();
    }

    switchView(view) {
        this.currentView = view;
        
        // Update buttons
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-view="${view}"]`).classList.add('active');

        // Update views
        document.querySelectorAll('.view-container').forEach(container => {
            container.classList.remove('active');
        });
        document.getElementById(`${view}View`).classList.add('active');

        this.render();
    }

    handleSearch(query) {
        this.searchQuery = (query || '').toLowerCase();
        this.applyFilters();
    }

    applyFilters() {
        const q = this.searchQuery;
        const cats = this.activeFilters.category;
        const sts = this.activeFilters.status;
        const stages = this.activeFilters.releaseStage;

        this.filteredData = this.data.filter(item => {
            const catMatch = cats.size === 0 || cats.has(item.category);
            const stMatch = sts.size === 0 || sts.has(item.status);
            const stageMatch = stages.size === 0 || stages.has(item.releaseStage || 'Unspecified');
            if (!catMatch || !stMatch || !stageMatch) return false;
            if (!q) return true;
            const haystack = [
                item.title, item.description, item.category, item.status,
                item.owner, item.pmm, item.engLead, item.gusProgram, item.period,
                item.team, item.project, item.releaseStage
            ].filter(Boolean).join(' ').toLowerCase();
            return haystack.includes(q);
        });

        this.render();
    }

    render() {
        this.renderDashboard();
        switch(this.currentView) {
            case 'timeline': this.renderTimeline(); break;
            case 'grid':     this.renderGrid();     break;
            case 'list':     this.renderList();     break;
            case 'owner':    this.renderOwnerView();break;
            case 'top':      this.renderTopView();  break;
            case 'feed':     this.renderFeedView(); break;
        }
    }

    // ----- Public feedback feed view -----
    // User-supplied content goes only through textContent / value / setAttribute,
    // never through innerHTML, to keep this XSS-safe.
    async renderFeedView() {
        const container = document.getElementById('feedContent');
        if (!container) return;
        container.textContent = '';
        const loading = document.createElement('div');
        loading.className = 'feed-loading';
        loading.textContent = 'Loading the team’s feedback…';
        container.appendChild(loading);

        const allItems = [
            ...this.dataVersions.v4.map(i => ({ ...i, version: 'v4' })),
            ...this.dataVersions.v3.map(i => ({ ...i, version: 'v3' })),
            ...this.dataVersions.v2.map(i => ({ ...i, version: 'v2' })),
            ...this.dataVersions.v1.map(i => ({ ...i, version: 'v1' })),
            ...this.dataVersions.gus.map(i => ({ ...i, version: 'gus' })),
        ];
        const byKey = {};
        allItems.forEach(it => {
            const v = it.version;
            const id = it._origId != null ? it._origId : it.id;
            byKey[`${v}:${id}`] = it;
        });

        try {
            const r = await fetch('/api/feedback/all?limit=200');
            const { items = [] } = await r.json();
            container.textContent = '';

            if (!items.length) {
                const empty = document.createElement('div');
                empty.className = 'feed-empty';
                const h3 = document.createElement('h3'); h3.textContent = 'No feedback yet';
                const p1 = document.createElement('p'); p1.textContent = 'Be the first — open any feature card and share a customer signal.';
                empty.append(h3, p1);
                container.appendChild(empty);
                return;
            }

            const headerBlock = document.createElement('div');
            headerBlock.className = 'feed-header-block';
            const h2 = document.createElement('h2'); h2.textContent = '💬 Feedback Feed';
            const sub = document.createElement('p'); sub.className = 'muted';
            sub.textContent = 'Latest customer signal from the whole team — click any feature title to jump into its detail.';
            headerBlock.append(h2, sub);
            container.appendChild(headerBlock);

            const list = document.createElement('div');
            list.className = 'feed-list';
            items.forEach(c => list.appendChild(this._buildFeedCard(c, byKey)));
            container.appendChild(list);

            container._commentMap = Object.fromEntries(items.map(c => [c.id, c]));
        } catch (e) {
            container.textContent = '';
            const empty = document.createElement('div');
            empty.className = 'feed-empty';
            const p = document.createElement('p'); p.textContent = 'Failed to load. Try again.';
            empty.appendChild(p);
            container.appendChild(empty);
        }
    }

    _fmtAgo(iso) {
        const d = new Date(iso); const diff = (Date.now() - d.getTime()) / 1000;
        if (diff < 60) return 'just now';
        if (diff < 3600) return Math.floor(diff/60) + 'm ago';
        if (diff < 86400) return Math.floor(diff/3600) + 'h ago';
        if (diff < 86400*30) return Math.floor(diff/86400) + 'd ago';
        return d.toLocaleDateString();
    }

    _buildFeedCard(c, byKey) {
        const item = byKey[c.feature_key];
        const featureTitle = (item && item.title) || c.feature_title || c.feature_key;

        const card = document.createElement('article');
        card.className = `feed-card fb-priority-${c.priority || 'none'}`;
        card.dataset.commentId = c.id;

        const head = document.createElement('header');
        head.className = 'feed-card-head';

        const featureWrap = document.createElement('div');
        featureWrap.className = 'feed-feature';
        const link = document.createElement('a');
        link.href = '#';
        link.className = 'feed-feature-link';
        link.dataset.key = c.feature_key;
        link.textContent = '📌 ' + featureTitle;
        link.addEventListener('click', (e) => { e.preventDefault(); this.openByFeatureKey(c.feature_key); });
        featureWrap.appendChild(link);
        if (item && item.owner) {
            const owner = document.createElement('span');
            owner.className = 'people-chip people-owner';
            owner.textContent = '👤 ' + item.owner;
            featureWrap.appendChild(owner);
        }

        const meta = document.createElement('div');
        meta.className = 'feed-meta';
        const author = document.createElement('span'); author.className = 'fb-author'; author.textContent = c.user_email;
        const when = document.createElement('span'); when.className = 'fb-when'; when.textContent = this._fmtAgo(c.created_at);
        meta.append(author, when);
        if (c.priority) {
            const prio = document.createElement('span');
            prio.className = `fb-prio fb-prio-${c.priority}`;
            prio.textContent = c.priority;
            meta.appendChild(prio);
        }
        if (c.mine) {
            const editBtn = document.createElement('button');
            editBtn.type = 'button';
            editBtn.className = 'feed-edit';
            editBtn.title = 'Edit your comment';
            editBtn.textContent = '✏️ Edit';
            editBtn.addEventListener('click', () => this.openFeedEdit(c.id));
            const delBtn = document.createElement('button');
            delBtn.type = 'button';
            delBtn.className = 'feed-delete';
            delBtn.title = 'Delete your comment';
            delBtn.textContent = '✕';
            delBtn.addEventListener('click', () => this.handleFeedDelete(c.id));
            meta.append(editBtn, delBtn);
        }

        head.append(featureWrap, meta);

        const body = document.createElement('div');
        body.className = 'feed-body';
        body.dataset.commentBody = c.id;
        body.textContent = c.body;

        card.append(head, body);

        if (c.customer || c.pfr_link) {
            const extras = document.createElement('div');
            extras.className = 'feed-extras';
            if (c.customer) {
                const cust = document.createElement('span');
                cust.className = 'fb-cust';
                cust.textContent = '🏢 ' + c.customer;
                extras.appendChild(cust);
            }
            if (c.pfr_link) {
                const a = document.createElement('a');
                a.className = 'fb-link';
                a.href = c.pfr_link;
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
                a.textContent = '🔗 PFR / link';
                extras.appendChild(a);
            }
            card.appendChild(extras);
        }

        return card;
    }

    openByFeatureKey(key) {
        for (const [v, arr] of Object.entries(this.dataVersions)) {
            for (const it of arr) {
                const k = `${it.version || v}:${it._origId != null ? it._origId : it.id}`;
                if (k === key) {
                    if (this.currentVersion !== v && !this.viewLocks[v]) {
                        document.getElementById('versionSelect').value = v;
                        this.switchVersion(v);
                    }
                    setTimeout(() => this.showItemDetails(it.id), 50);
                    return;
                }
            }
        }
    }

    // Build an inline edit form (used by both modal + feed) — text via textContent / value
    _buildEditForm(c, onSubmit, onCancel) {
        const form = document.createElement('form');
        form.className = 'fb-edit-form';

        const ta = document.createElement('textarea');
        ta.className = 'fb-edit-body'; ta.rows = 3; ta.maxLength = 2000; ta.required = true;
        ta.value = c.body || '';

        const row = document.createElement('div');
        row.className = 'fb-form-row';
        const sel = document.createElement('select');
        sel.className = 'fb-edit-prio';
        ['', 'low', 'medium', 'high', 'critical'].forEach(p => {
            const opt = document.createElement('option');
            opt.value = p;
            opt.textContent = p ? p[0].toUpperCase() + p.slice(1) : 'No priority';
            if (p === (c.priority || '')) opt.selected = true;
            sel.appendChild(opt);
        });
        const cust = document.createElement('input');
        cust.className = 'fb-edit-cust'; cust.type = 'text'; cust.maxLength = 200;
        cust.placeholder = 'Customer (optional)';
        cust.value = c.customer || '';
        const link = document.createElement('input');
        link.className = 'fb-edit-link'; link.type = 'url'; link.maxLength = 500;
        link.placeholder = 'PFR / Slack / GUS link (optional)';
        link.value = c.pfr_link || '';
        row.append(sel, cust, link);

        const actions = document.createElement('div');
        actions.className = 'fb-form-actions';
        const submit = document.createElement('button'); submit.type = 'submit'; submit.className = 'fb-submit'; submit.textContent = 'Save';
        const cancel = document.createElement('button'); cancel.type = 'button'; cancel.className = 'fb-cancel-edit'; cancel.textContent = 'Cancel';
        const msg = document.createElement('span'); msg.className = 'fb-form-msg';
        actions.append(submit, cancel, msg);

        form.append(ta, row, actions);
        cancel.addEventListener('click', () => onCancel && onCancel());
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const body = ta.value.trim();
            if (!body) { msg.textContent = 'Comment body is required.'; return; }
            msg.textContent = 'Saving…';
            onSubmit({
                body,
                priority: sel.value || null,
                customer: cust.value.trim() || null,
                pfr_link: link.value.trim() || null,
            }, msg);
        });
        setTimeout(() => ta.focus(), 0);
        return form;
    }

    async _patchComment(id, payload) {
        const r = await fetch('/api/feedback/comments/' + id, {
            method: 'PATCH',
            headers: { 'content-type': 'application/json' },
            credentials: 'same-origin',
            body: JSON.stringify(payload),
        });
        if (!r.ok) {
            const txt = await r.text().catch(() => '');
            throw new Error(txt || ('HTTP ' + r.status));
        }
        return r.json();
    }

    openCommentEdit(item, sectionEl, id) {
        const wrap = sectionEl.querySelector(`.fb-comment[data-comment-id="${id}"]`);
        if (!wrap) return;
        const c = (sectionEl._commentMap || {})[id];
        if (!c) return;
        wrap.classList.add('fb-editing');
        const bodyEl = wrap.querySelector('.fb-body'); if (bodyEl) bodyEl.style.display = 'none';
        const meta = wrap.querySelector('.fb-meta'); if (meta) meta.style.display = 'none';
        const form = this._buildEditForm(c,
            async (payload, msg) => {
                try { await this._patchComment(id, payload); this.loadFeedbackForFeature(item); }
                catch (e) { msg.textContent = 'Failed: ' + e.message; }
            },
            () => this.loadFeedbackForFeature(item)
        );
        wrap.appendChild(form);
    }

    openFeedEdit(id) {
        const container = document.getElementById('feedContent');
        const card = container.querySelector(`.feed-card[data-comment-id="${id}"]`);
        if (!card) return;
        const c = (container._commentMap || {})[id];
        if (!c) return;
        const bodyEl = card.querySelector('.feed-body'); if (bodyEl) bodyEl.style.display = 'none';
        const extras = card.querySelector('.feed-extras'); if (extras) extras.style.display = 'none';
        const form = this._buildEditForm(c,
            async (payload, msg) => {
                try { await this._patchComment(id, payload); this.renderFeedView(); }
                catch (e) { msg.textContent = 'Failed: ' + e.message; }
            },
            () => this.renderFeedView()
        );
        card.appendChild(form);
    }

    async handleFeedDelete(id) {
        if (!confirm('Delete this comment?')) return;
        try {
            const r = await fetch('/api/feedback/comments/' + id, {
                method: 'DELETE',
                credentials: 'same-origin',
            });
            if (!r.ok) return;
            this.loadFeedbackSummary();
            this.renderFeedView();
        } catch { /* noop */ }
    }

    // ----- Top Requested view -----
    async renderTopView() {
        const container = document.getElementById('topContent');
        if (!container) return;
        container.innerHTML = '<div class="top-loading">Loading top-requested features…</div>';

        // Build a map across ALL versions so we can resolve feature_key → item
        const allItems = [
            ...this.dataVersions.v4.map(i => ({ ...i, version: 'v4' })),
            ...this.dataVersions.v3.map(i => ({ ...i, version: 'v3' })),
            ...this.dataVersions.v2.map(i => ({ ...i, version: 'v2' })),
            ...this.dataVersions.v1.map(i => ({ ...i, version: 'v1' })),
            ...this.dataVersions.gus.map(i => ({ ...i, version: 'gus' })),
        ];
        const byKey = {};
        allItems.forEach(it => {
            const v = it.version;
            const id = it._origId != null ? it._origId : it.id;
            byKey[`${v}:${id}`] = it;
        });

        try {
            const r = await fetch('/api/feedback/top?limit=100');
            const { items = [] } = await r.json();
            if (!items.length) {
                container.innerHTML = `
                    <div class="top-empty">
                        <h3>No upvotes yet</h3>
                        <p>When users upvote features from the modal, the most-requested ones will surface here.</p>
                        <p class="muted">Open any feature card → 💬 Feedback &amp; Sentiment → 👍.</p>
                    </div>`;
                return;
            }
            const rows = items.map((row, idx) => {
                const item = byKey[row.feature_key];
                const title = item?.title || row.feature_title || row.feature_key;
                const owner = item?.owner ? `<span class="people-chip people-owner">👤 ${item.owner}</span>` : '';
                const period = item?.period || item?.date || '';
                const status = item?.status ? `<span class="status-badge ${item.status}">${this.formatStatus(item.status)}</span>` : '';
                const cat = item?.category ? `<span class="category-tag">${this.formatCategory(item.category)}</span>` : '';
                return `
                    <div class="top-row" data-key="${row.feature_key}" ${item ? `data-id="${item.id}" data-version="${item.version || ''}"` : ''}>
                        <div class="top-rank">#${idx + 1}</div>
                        <div class="top-stats">
                            <div class="top-stat-votes">👍 ${row.votes}</div>
                            <div class="top-stat-comments">💬 ${row.comments}</div>
                        </div>
                        <div class="top-main">
                            <div class="top-title">${title}</div>
                            <div class="top-meta">
                                ${status}${cat}${owner}${period ? `<span class="meta-item">🗓️ ${period}</span>` : ''}
                            </div>
                        </div>
                    </div>`;
            }).join('');
            container.innerHTML = `<div class="top-list">${rows}</div>`;
            container.querySelectorAll('.top-row').forEach(el => {
                el.addEventListener('click', () => {
                    const id = parseInt(el.dataset.id, 10);
                    if (!id) return;
                    // Find item in current data (or fall back to any)
                    let target = this.data.find(i => i.id === id);
                    if (!target) {
                        const v = el.dataset.version;
                        target = (this.dataVersions[v] || []).find(i => i.id === id);
                    }
                    if (target) this.showItemDetails(target.id);
                });
            });
        } catch (e) {
            container.innerHTML = '<div class="top-empty"><p>Failed to load. Try again.</p></div>';
        }
    }

    // ----- Owner view -----
    renderOwnerView() {
        const container = document.getElementById('ownerContent');
        if (!container) return;
        if (this.filteredData.length === 0) { container.innerHTML = this.getEmptyState(); return; }

        // Group by owner; items without owner go into 'Unassigned'
        const byOwner = {};
        this.filteredData.forEach(item => {
            const key = item.owner || 'Unassigned';
            (byOwner[key] = byOwner[key] || []).push(item);
        });

        // Sort: real owners (largest first) → meta/sample groups → Unassigned
        const isMeta = name => name === 'Unassigned' || name.startsWith('—');
        const sorted = Object.entries(byOwner).sort((a,b) => {
            const am = isMeta(a[0]), bm = isMeta(b[0]);
            if (am && !bm) return 1;
            if (!am && bm) return -1;
            return b[1].length - a[1].length;
        });

        const initials = name => {
            if (name === 'Unassigned') return '?';
            if (name.startsWith('—')) return '∗';
            return name.replace(/\(.*?\)/g,'').trim().split(/\s+/).map(s=>s[0]).slice(0,2).join('').toUpperCase();
        };

        const statusDot = s => `<span class="dot status-dot-${s}" title="${this.formatStatus(s)}"></span>`;

        const html = sorted.map(([owner, items]) => {
            const counts = {completed:0,'in-progress':0,planned:0,future:0,pilot:0};
            let totalVotes = 0, totalComments = 0;
            items.forEach(i => {
                if (counts[i.status]!==undefined) counts[i.status]++;
                const s = this.summaryFor(i);
                totalVotes += s.votes || 0;
                totalComments += s.comments || 0;
            });
            const pmmSet = new Set(items.map(i=>i.pmm).filter(Boolean));
            const engSet = new Set(items.map(i=>i.engLead).filter(Boolean));

            const featuresHtml = items.map(item => `
                <div class="owner-feature" data-id="${item.id}">
                    <div class="owner-feature-main">
                        ${statusDot(item.status)}
                        <span class="owner-feature-title">${item.title}</span>
                    </div>
                    <div class="owner-feature-meta">
                        <span class="status-badge ${item.status}">${this.formatStatus(item.status)}</span>
                        <span class="meta-item">🗓️ ${item.period || item.date || '—'}</span>
                        <span class="meta-item">${this.formatCategory(item.category)}</span>
                    </div>
                </div>
            `).join('');

            const metaClass = isMeta(owner) ? ' is-meta' : '';
            return `
                <div class="owner-card${metaClass}">
                    <div class="owner-card-header">
                        <div class="owner-avatar">${initials(owner)}</div>
                        <div class="owner-card-meta">
                            <h3 class="owner-name-title">${owner}</h3>
                            <div class="owner-sub">
                                ${pmmSet.size ? `<span class="owner-sub-item">PMM: ${[...pmmSet].join(', ')}</span>` : ''}
                                ${engSet.size ? `<span class="owner-sub-item">Eng: ${[...engSet].join(', ')}</span>` : ''}
                            </div>
                        </div>
                        <div class="owner-stats">
                            <span class="owner-stat">${items.length} <small>features</small></span>
                            <span class="owner-stat-mini status-completed">${counts.completed} ✓</span>
                            <span class="owner-stat-mini status-in-progress">${counts['in-progress']} ▶</span>
                            <span class="owner-stat-mini status-planned">${counts.planned} ◐</span>
                            <span class="owner-stat-mini status-future">${counts.future} ○</span>
                            ${(totalVotes || totalComments)
                                ? `<span class="owner-stat-feedback" title="Total feedback received across this owner's features">👍 ${totalVotes} · 💬 ${totalComments}</span>`
                                : ''}
                        </div>
                    </div>
                    <div class="owner-features">
                        ${featuresHtml}
                    </div>
                </div>
            `;
        }).join('');

        container.innerHTML = html;
        container.querySelectorAll('.owner-feature').forEach(el => {
            el.addEventListener('click', () => this.showItemDetails(parseInt(el.dataset.id)));
        });
    }

    renderTimeline() {
        const container = document.getElementById('timelineContent');
        
        if (this.filteredData.length === 0) {
            container.innerHTML = this.getEmptyState();
            return;
        }

        // Group by period
        const periods = {};
        this.filteredData.forEach(item => {
            if (!periods[item.period]) {
                periods[item.period] = [];
            }
            periods[item.period].push(item);
        });

        // Sort periods — handles both legacy Q-format and new seasonal names
        const periodOrder = [
            'Q4 2024',
            "Summer '24 (252)", "Winter '25 (254)", "Spring '25 (256)",
            'Q1 2025', 'Q2 2025', 'Q3 2025',
            "Summer '25 (258)", "Summer '25 Patch (258.patch)",
            'Q4 2025',
            "Winter '26 (260)", "Winter '26 Patch (260.patch)",
            'Q1 2026', 'Q2 2026',
            "Spring '26 (262)", "Spring '26 Patch (262.patch)",
            'May 2026', 'June 2026',
            "Summer '26 (264)",
            'July 2026', 'August 2026+',
            'Q3 2026', 'Q4 2026',
            "Winter '27 (266)", "Spring '27 (268)", "Summer '27 (270)",
            '2026+', 'Backlog', 'TBD',
        ];
        const sortedPeriods = Object.keys(periods).sort((a, b) => {
            const ai = periodOrder.indexOf(a);
            const bi = periodOrder.indexOf(b);
            if (ai !== -1 && bi !== -1) return ai - bi;
            if (ai !== -1) return -1;
            if (bi !== -1) return 1;
            return a.localeCompare(b);
        });

        let html = '';
        sortedPeriods.forEach(period => {
            const items = periods[period];
            const itemCount = items.length;
            
            html += `
                <div class="timeline-period">
                    <div class="period-header">
                        <h2>${period}</h2>
                        <span class="period-badge">${itemCount} ${itemCount === 1 ? 'Item' : 'Items'}</span>
                    </div>
                    <div class="timeline-items">
                        ${items.map(item => this.createTimelineItem(item)).join('')}
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
        this.attachItemListeners();
    }

    getBuildLabel(item) {
        if (item.scheduledBuild && typeof SALESFORCE_BUILDS !== 'undefined' && SALESFORCE_BUILDS[item.scheduledBuild]) {
            return SALESFORCE_BUILDS[item.scheduledBuild].name + ' (' + item.scheduledBuild + ')';
        }
        return item.scheduledBuild ? 'Build ' + item.scheduledBuild : (item.period || '');
    }

    // Release label with GA date appended when SALESFORCE_BUILDS knows the build.
    getReleaseLabel(item) {
        const base = this.getBuildLabel(item) || item.period || item.date || '';
        if (!base) return '';
        const meta = item.scheduledBuild && typeof SALESFORCE_BUILDS !== 'undefined'
            ? SALESFORCE_BUILDS[item.scheduledBuild] : null;
        return meta && meta.gaDate ? `${base} · GA ${meta.gaDate}` : base;
    }

    // ISO datetime → "YYYY-MM-DD"
    fmtDate(iso) {
        if (!iso) return '';
        const m = String(iso).match(/^(\d{4}-\d{2}-\d{2})/);
        return m ? m[1] : iso;
    }

    // Inline rollout chip for cards/lists when the epic has Target_Roll_Out_Date.
    rolloutBadge(item) {
        if (!item.targetRollOutDate) return '';
        return `<span class="meta-item" title="Target Roll Out Date (GUS)">🎯 Rollout: ${this.fmtDate(item.targetRollOutDate)}</span>`;
    }

    // Release-stage chip (Pilot / Open Beta / GA / Unspecified) used in filters & cards.
    formatReleaseStage(stage) {
        if (!stage) return 'Unspecified';
        if (stage === 'GA') return 'GA';
        if (stage === 'GA with Limited Availability') return 'GA (Limited)';
        return stage;
    }

    ownerChips(item) {
        const chips = [];
        if (item.owner) chips.push(`<span class="people-chip people-owner" title="Product Owner">👤 ${item.owner}</span>`);
        if (item.pmm)   chips.push(`<span class="people-chip people-pmm" title="PMM">🎯 ${item.pmm}</span>`);
        if (item.engLead) chips.push(`<span class="people-chip people-eng" title="Engineering Lead">⚙️ ${item.engLead}</span>`);
        return chips.join('');
    }

    docsBadge(item) {
        const n = (item.docs && item.docs.length) || 0;
        if (n === 0) return '';
        const label = n === 1 ? '1 doc' : `${n} docs`;
        return `<span class="docs-badge" title="Click for resources">📚 ${label}</span>`;
    }

    feedbackBadge(item) {
        const s = this.summaryFor(item);
        if (!s.votes && !s.comments) return '';
        const voteCls = s.userVoted ? 'feedback-badge feedback-voted' : 'feedback-badge';
        return `<span class="${voteCls}" title="${s.votes} upvotes · ${s.comments} comments">👍 ${s.votes} · 💬 ${s.comments}</span>`;
    }

    renderDocsSection(docs) {
        if (!docs || !docs.length) return '';
        // Group by category, then sort categories by a known priority
        const ORDER = ['Release Notes','Help Article','Showcase Deck','PRD','Tech Spec','Doc',
                       'Enablement Guide','Figma','Roadmap Deck','Slack Canvas','GUS Program','Resource'];
        const groups = {};
        docs.forEach(d => {
            const c = d.category || 'Resource';
            (groups[c] = groups[c] || []).push(d);
        });
        const sortedCats = Object.keys(groups).sort((a,b) => {
            const ai = ORDER.indexOf(a), bi = ORDER.indexOf(b);
            if (ai !== -1 && bi !== -1) return ai - bi;
            if (ai !== -1) return -1;
            if (bi !== -1) return 1;
            return a.localeCompare(b);
        });
        const safe = s => (s||'').replace(/</g,'&lt;').replace(/>/g,'&gt;');
        const groupHtml = sortedCats.map(cat => {
            const items = groups[cat];
            const icon = items[0].icon || '🔗';
            const links = items.map(d => `
                <a class="doc-link" href="${d.url}" target="_blank" rel="noopener noreferrer">
                    <span class="doc-link-label">${safe(d.label)}</span>
                    <span class="doc-link-host">${(new URL(d.url)).hostname.replace(/^www\./,'')}</span>
                </a>`).join('');
            return `
                <div class="doc-group">
                    <div class="doc-group-header">
                        <span class="doc-group-icon">${icon}</span>
                        <span class="doc-group-title">${cat}</span>
                        <span class="doc-group-count">${items.length}</span>
                    </div>
                    <div class="doc-group-links">${links}</div>
                </div>`;
        }).join('');
        return `
            <div class="modal-section docs-section">
                <h3>📚 Resources & Documentation <span class="docs-section-count">${docs.length}</span></h3>
                <div class="doc-groups">${groupHtml}</div>
            </div>`;
    }

    // ----- Feedback (votes + comments) -----
    renderFeedbackSectionShell(item) {
        const key = this.featureKey(item);
        if (!key) return '';
        // Skeleton — populated by loadFeedbackForFeature() once data arrives
        return `
            <div class="modal-section feedback-section" data-feature-key="${key}">
                <h3>💬 Feedback &amp; Sentiment</h3>
                <div class="feedback-loading">Loading…</div>
            </div>`;
    }

    async loadFeedbackForFeature(item) {
        const key = this.featureKey(item);
        if (!key) return;
        const safeKey = key.replace(/"/g, '\\"');
        const sectionEl = document.querySelector(`.feedback-section[data-feature-key="${safeKey}"]`);
        if (!sectionEl) return;
        try {
            const r = await fetch('/api/feedback/feature/' + encodeURIComponent(key));
            if (!r.ok) {
                sectionEl.innerHTML = `<h3>💬 Feedback &amp; Sentiment</h3>
                    <p class="feedback-error">Couldn't load feedback (${r.status}).</p>`;
                return;
            }
            const data = await r.json();
            this.renderFeedbackSection(sectionEl, item, data);
        } catch (e) {
            sectionEl.innerHTML = `<h3>💬 Feedback &amp; Sentiment</h3>
                <p class="feedback-error">Network error loading feedback.</p>`;
        }
    }

    renderFeedbackSection(sectionEl, item, data) {
        const key = this.featureKey(item);
        const fmtAgo = (iso) => {
            const d = new Date(iso); const diff = (Date.now() - d.getTime()) / 1000;
            if (diff < 60) return 'just now';
            if (diff < 3600) return Math.floor(diff/60) + 'm ago';
            if (diff < 86400) return Math.floor(diff/3600) + 'h ago';
            if (diff < 86400*30) return Math.floor(diff/86400) + 'd ago';
            return d.toLocaleDateString();
        };
        const safe = (s) => (s == null ? '' : String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])));

        const commentsHtml = data.comments.map(c => `
            <div class="fb-comment fb-priority-${c.priority || 'none'}" data-comment-id="${c.id}">
                <div class="fb-comment-head">
                    <span class="fb-author">${safe(c.user_email)}</span>
                    <span class="fb-when">${fmtAgo(c.created_at)}</span>
                    ${c.priority ? `<span class="fb-prio fb-prio-${c.priority}">${c.priority}</span>` : ''}
                    ${c.mine ? `
                        <button class="fb-edit" data-id="${c.id}" title="Edit">✏️</button>
                        <button class="fb-delete" data-id="${c.id}" title="Delete">✕</button>
                    ` : ''}
                </div>
                <div class="fb-body" data-original="${safe(c.body)}">${safe(c.body)}</div>
                ${c.customer || c.pfr_link ? `
                    <div class="fb-meta">
                        ${c.customer ? `<span class="fb-cust">🏢 ${safe(c.customer)}</span>` : ''}
                        ${c.pfr_link ? `<a class="fb-link" href="${safe(c.pfr_link)}" target="_blank" rel="noopener noreferrer">🔗 PFR / link</a>` : ''}
                    </div>` : ''}
            </div>`).join('');

        // Stash comment payloads for the edit form to repopulate
        sectionEl._commentMap = Object.fromEntries(data.comments.map(c => [c.id, c]));

        sectionEl.innerHTML = `
            <h3>💬 Feedback &amp; Sentiment <span class="docs-section-count">${data.votes} 👍 · ${data.comments.length} 💬</span></h3>

            <div class="fb-vote-row">
                <button class="fb-vote-btn ${data.userVoted ? 'is-voted' : ''}" type="button" data-key="${key}">
                    <span class="fb-vote-icon">👍</span>
                    <span class="fb-vote-text">${data.userVoted ? 'You upvoted' : 'Upvote this'}</span>
                    <span class="fb-vote-count">${data.votes}</span>
                </button>
                <span class="fb-vote-hint">Tell PMs which features matter most to your customers.</span>
            </div>

            <details class="fb-form-wrap" ${data.comments.length ? '' : 'open'}>
                <summary>Add a comment, customer signal, or PFR link</summary>
                <form class="fb-form">
                    <textarea class="fb-body-input" name="body" rows="3" maxlength="2000"
                              placeholder="What's the context? Customer ask, regression, blocker, anything PMs should weigh." required></textarea>
                    <div class="fb-form-row">
                        <select class="fb-prio-input" name="priority">
                            <option value="">No priority</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                            <option value="critical">Critical</option>
                        </select>
                        <input class="fb-cust-input" name="customer" type="text" placeholder="Customer (optional)" maxlength="200">
                        <input class="fb-link-input" name="pfr_link" type="url" placeholder="PFR / Slack / GUS link (optional)" maxlength="500">
                    </div>
                    <div class="fb-form-actions">
                        <button class="fb-submit" type="submit">Post comment</button>
                        <span class="fb-form-msg"></span>
                    </div>
                </form>
            </details>

            <div class="fb-comments">
                ${data.comments.length ? commentsHtml : '<p class="fb-empty">No comments yet — be the first to add context.</p>'}
            </div>
        `;

        // Wire interactions
        const voteBtn = sectionEl.querySelector('.fb-vote-btn');
        voteBtn.addEventListener('click', () => this.handleVoteClick(item, sectionEl));

        const form = sectionEl.querySelector('.fb-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleCommentSubmit(item, sectionEl);
        });

        sectionEl.querySelectorAll('.fb-delete').forEach(btn => {
            btn.addEventListener('click', () => this.handleCommentDelete(item, sectionEl, parseInt(btn.dataset.id, 10)));
        });
        sectionEl.querySelectorAll('.fb-edit').forEach(btn => {
            btn.addEventListener('click', () => this.openCommentEdit(item, sectionEl, parseInt(btn.dataset.id, 10)));
        });
    }

    async handleVoteClick(item, sectionEl) {
        const key = this.featureKey(item);
        const btn = sectionEl.querySelector('.fb-vote-btn');
        btn.disabled = true;
        try {
            const r = await fetch('/api/feedback/vote', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                credentials: 'same-origin',
                body: JSON.stringify({ feature_key: key, feature_title: item.title }),
            });
            if (!r.ok) throw new Error(await r.text());
            const { voted } = await r.json();
            // Update summary cache + this section
            const cur = this.feedbackSummary[key] || { votes: 0, comments: 0, userVoted: false };
            this.feedbackSummary[key] = {
                ...cur,
                votes: Math.max(0, cur.votes + (voted ? 1 : -1)),
                userVoted: voted,
            };
            // Refresh just the modal feedback block
            this.loadFeedbackForFeature(item);
            // Re-render lists so badges update
            this.render();
        } catch (e) {
            btn.disabled = false;
            console.error('vote failed', e);
        }
    }

    async handleCommentSubmit(item, sectionEl) {
        const form = sectionEl.querySelector('.fb-form');
        const msg = sectionEl.querySelector('.fb-form-msg');
        const body = form.body.value.trim();
        if (!body) return;
        msg.textContent = 'Posting…';
        try {
            const r = await fetch('/api/feedback/comments', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                credentials: 'same-origin',
                body: JSON.stringify({
                    feature_key: this.featureKey(item),
                    feature_title: item.title,
                    body,
                    priority: form.priority.value || null,
                    customer: form.customer.value.trim() || null,
                    pfr_link: form.pfr_link.value.trim() || null,
                }),
            });
            if (!r.ok) {
                const txt = await r.text();
                msg.textContent = 'Failed: ' + txt;
                return;
            }
            // Bump comment count in summary
            const key = this.featureKey(item);
            const cur = this.feedbackSummary[key] || { votes: 0, comments: 0, userVoted: false };
            this.feedbackSummary[key] = { ...cur, comments: cur.comments + 1 };
            form.reset();
            msg.textContent = 'Posted ✓';
            this.loadFeedbackForFeature(item);
            this.render();
        } catch (e) {
            msg.textContent = 'Network error.';
        }
    }

    async handleCommentDelete(item, sectionEl, id) {
        if (!confirm('Delete this comment?')) return;
        try {
            const r = await fetch('/api/feedback/comments/' + id, {
                method: 'DELETE',
                credentials: 'same-origin',
            });
            if (!r.ok) return;
            const key = this.featureKey(item);
            const cur = this.feedbackSummary[key] || { votes: 0, comments: 0, userVoted: false };
            this.feedbackSummary[key] = { ...cur, comments: Math.max(0, cur.comments - 1) };
            this.loadFeedbackForFeature(item);
            this.render();
        } catch (e) { /* swallow */ }
    }

    createTimelineItem(item) {
        const peopleHtml = this.ownerChips(item);
        const releaseLabel = this.getReleaseLabel(item);
        return `
            <div class="timeline-item status-${item.status}" data-id="${item.id}">
                <div class="item-header">
                    <h3 class="item-title">${item.title}</h3>
                    <span class="status-badge ${item.status}">${this.formatStatus(item.status)}</span>
                </div>
                <p class="item-description">${item.description}</p>
                <div class="item-meta">
                    ${releaseLabel ? `<span class="meta-item">🗓️ ${releaseLabel}</span>` : ''}
                    ${this.rolloutBadge(item)}
                    <span class="meta-item"><span class="category-tag">${this.formatCategory(item.category)}</span></span>
                    ${this.docsBadge(item)}
                    ${this.feedbackBadge(item)}
                </div>
                ${peopleHtml ? `<div class="item-people">${peopleHtml}</div>` : ''}
            </div>
        `;
    }

    renderGrid() {
        const container = document.getElementById('gridContent');
        
        if (this.filteredData.length === 0) {
            container.innerHTML = this.getEmptyState();
            return;
        }

        const html = this.filteredData.map(item => {
            const peopleHtml = this.ownerChips(item);
            const releaseLabel = this.getReleaseLabel(item);
            return `
                <div class="grid-item status-${item.status}" data-id="${item.id}">
                    <div class="item-header">
                        <h3 class="item-title">${item.title}</h3>
                        <span class="status-badge ${item.status}">${this.formatStatus(item.status)}</span>
                    </div>
                    <p class="item-description">${item.description}</p>
                    <div class="item-meta">
                        ${releaseLabel ? `<span class="meta-item">🗓️ ${releaseLabel}</span>` : ''}
                        ${this.rolloutBadge(item)}
                        <span class="meta-item"><span class="category-tag">${this.formatCategory(item.category)}</span></span>
                    </div>
                    ${peopleHtml ? `<div class="item-people">${peopleHtml}</div>` : ''}
                </div>
            `;
        }).join('');

        container.innerHTML = html;
        this.attachItemListeners();
    }

    renderList() {
        const container = document.getElementById('listContent');

        if (this.filteredData.length === 0) {
            container.innerHTML = this.getEmptyState();
            return;
        }

        const html = this.filteredData.map(item => {
            const ownerHtml = item.owner ? `<span class="meta-item">👤 ${item.owner}</span>` : '';
            const releaseLabel = this.getReleaseLabel(item);
            return `
                <div class="list-item" data-id="${item.id}">
                    <div class="list-item-status ${item.status}"></div>
                    <div class="list-item-content">
                        <div class="list-item-title">${item.title}</div>
                        <div class="list-item-description">${item.description}</div>
                    </div>
                    <div class="list-item-meta">
                        <span class="status-badge ${item.status}">${this.formatStatus(item.status)}</span>
                        <span class="category-tag">${this.formatCategory(item.category)}</span>
                        ${ownerHtml}
                        ${releaseLabel ? `<span class="meta-item">🗓️ ${releaseLabel}</span>` : ''}
                        ${this.rolloutBadge(item)}
                        ${this.docsBadge(item)}
                        ${this.feedbackBadge(item)}
                    </div>
                </div>
            `;
        }).join('');

        container.innerHTML = html;
        this.attachItemListeners();
    }

    attachItemListeners() {
        const items = document.querySelectorAll('.timeline-item, .grid-item, .list-item');
        items.forEach(item => {
            item.addEventListener('click', () => {
                const id = parseInt(item.dataset.id);
                this.showItemDetails(id);
            });
        });
    }

    showItemDetails(id) {
        const item = this.data.find(i => i.id === id);
        if (!item) return;

        const modal = document.getElementById('itemModal');
        const modalBody = document.getElementById('modalBody');

        // Build release label using SALESFORCE_BUILDS lookup
        const buildLabel = (item.scheduledBuild && typeof SALESFORCE_BUILDS !== 'undefined' && SALESFORCE_BUILDS[item.scheduledBuild])
            ? `${SALESFORCE_BUILDS[item.scheduledBuild].name} (Build ${item.scheduledBuild})`
            : (item.scheduledBuild ? `Build ${item.scheduledBuild}` : '');
        const gaDate = (item.scheduledBuild && typeof SALESFORCE_BUILDS !== 'undefined' && SALESFORCE_BUILDS[item.scheduledBuild])
            ? SALESFORCE_BUILDS[item.scheduledBuild].gaDate : null;

        // Owner, PRD, and GUS metadata section
        let ownerPrdHtml = '';
        const hasGUSFields = item.version === 'gus' && (item.scheduledBuild || item.devLead || item.designLead || item.qualityLead || item.team || item.health);
        if (item.owner || item.pmm || item.engLead || item.gusProgram || item.prdLink || hasGUSFields) {
            ownerPrdHtml = '<div class="modal-section owner-prd-section">';
            if (buildLabel) {
                ownerPrdHtml += `
                    <div class="owner-info">
                        <span class="owner-label">🗓️ Release:</span>
                        <span class="owner-name"><strong>${buildLabel}</strong>${gaDate ? ` · GA: ${gaDate}` : ''}</span>
                    </div>
                `;
            }
            if (item.health) {
                const healthIcon = item.health === 'Completed' ? '✅' : item.health === 'On Track' ? '🟢' : item.health === 'Blocked' ? '🔴' : '🟡';
                ownerPrdHtml += `
                    <div class="owner-info">
                        <span class="owner-label">${healthIcon} Health:</span>
                        <span class="owner-name">${item.health}</span>
                    </div>
                `;
            }
            if (item.owner) {
                ownerPrdHtml += `
                    <div class="owner-info">
                        <span class="owner-label">👤 Product Owner:</span>
                        <span class="owner-name">${item.owner}</span>
                    </div>
                `;
            }
            if (item.pmm) {
                ownerPrdHtml += `<div class="owner-info"><span class="owner-label">🎯 PMM:</span><span class="owner-name">${item.pmm}</span></div>`;
            }
            if (item.engLead) {
                ownerPrdHtml += `<div class="owner-info"><span class="owner-label">⚙️ Engineering Lead:</span><span class="owner-name">${item.engLead}</span></div>`;
            }
            if (item.devLead) {
                ownerPrdHtml += `<div class="owner-info"><span class="owner-label">🛠️ Dev Lead:</span><span class="owner-name">${item.devLead}</span></div>`;
            }
            if (item.designLead && item.designLead !== '-') {
                ownerPrdHtml += `<div class="owner-info"><span class="owner-label">🎨 Design Lead:</span><span class="owner-name">${item.designLead}</span></div>`;
            }
            if (item.qualityLead && item.qualityLead !== '-') {
                ownerPrdHtml += `<div class="owner-info"><span class="owner-label">🧪 Quality Lead:</span><span class="owner-name">${item.qualityLead}</span></div>`;
            }
            if (item.team && item.team !== '-') {
                ownerPrdHtml += `<div class="owner-info"><span class="owner-label">🏢 Team:</span><span class="owner-name">${item.team}</span></div>`;
            }
            if (item.project) {
                ownerPrdHtml += `<div class="owner-info"><span class="owner-label">📁 Project:</span><span class="owner-name">${item.project}</span></div>`;
            }
            if (item.targetRollOutDate) {
                ownerPrdHtml += `<div class="owner-info"><span class="owner-label">🎯 Target Roll Out:</span><span class="owner-name">${this.fmtDate(item.targetRollOutDate)}</span></div>`;
            }
            if (item.releaseStage) {
                ownerPrdHtml += `<div class="owner-info"><span class="owner-label">🚀 Release Stage:</span><span class="owner-name">${this.formatReleaseStage(item.releaseStage)}</span></div>`;
            }
            if (typeof item.percentComplete === 'number') {
                ownerPrdHtml += `<div class="owner-info"><span class="owner-label">📈 Work Complete:</span><span class="owner-name">${item.percentComplete}%</span></div>`;
            }
            if (item.readinessStatus) {
                ownerPrdHtml += `<div class="owner-info"><span class="owner-label">🟦 Readiness:</span><span class="owner-name">${item.readinessStatus}</span></div>`;
            }
            if (item.tShirtSize) {
                ownerPrdHtml += `<div class="owner-info"><span class="owner-label">📏 T-Shirt:</span><span class="owner-name">${item.tShirtSize}</span></div>`;
            }
            if (item.gusEpicId) {
                ownerPrdHtml += `<div class="owner-info"><span class="owner-label">🔗 GUS Epic:</span><span class="owner-name"><a href="https://gus.my.salesforce.com/lightning/r/ADM_Epic__c/${item.gusEpicId}/view" target="_blank" rel="noopener noreferrer">${item.gusEpicId}</a></span></div>`;
            }
            if (item.gusProgram) {
                ownerPrdHtml += `
                    <div class="owner-info">
                        <span class="owner-label">📌 GUS Program:</span>
                        <span class="owner-name">${item.gusProgram}</span>
                    </div>
                `;
            }
            if (item.prdLink) {
                ownerPrdHtml += `
                    <div class="prd-link-info">
                        <a href="${item.prdLink}" target="_blank" rel="noopener noreferrer" class="prd-link">
                            📄 View Product Requirements Document →
                        </a>
                    </div>
                `;
            }
            ownerPrdHtml += '</div>';
        }

        let detailsHtml = '';
        if (item.details) {
            detailsHtml = `
                <div class="modal-section">
                    <h3>Overview</h3>
                    <p>${item.details.overview}</p>
                </div>
            `;

            if (item.details.keyFeatures && item.details.keyFeatures.length > 0) {
                detailsHtml += `
                    <div class="modal-section">
                        <h3>Key Features</h3>
                        <ul>
                            ${item.details.keyFeatures.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                `;
            }

            if (item.details.impact) {
                detailsHtml += `
                    <div class="modal-section">
                        <h3>Expected Impact</h3>
                        <p>${item.details.impact}</p>
                    </div>
                `;
            }
        }

        modalBody.innerHTML = `
            <div class="modal-header">
                <h2 class="modal-title">${item.title}</h2>
                <div class="modal-meta">
                    <span class="status-badge ${item.status}">${this.formatStatus(item.status)}</span>
                    <span class="category-tag">${this.formatCategory(item.category)}</span>
                    ${item.date && item.date !== '-' ? `<span class="meta-item">📅 ${item.date}</span>` : ''}
                    <span class="meta-item">📊 ${buildLabel || item.quarter || item.period}</span>
                </div>
            </div>
            ${ownerPrdHtml}
            <div class="modal-section">
                <h3>Description</h3>
                <p>${item.description}</p>
            </div>
            ${detailsHtml}
            ${this.renderDocsSection(item.docs)}
            ${this.renderFeedbackSectionShell(item)}
        `;

        // Hydrate the feedback section in the background once the modal is open
        this.loadFeedbackForFeature(item);

        modal.classList.add('active');
    }

    showReleaseDetail(releaseId) {
        const release = releaseNotesData[releaseId];
        if (!release) return;

        const container = document.getElementById('releaseDetailContent');
        
        // Build the detailed view HTML
        let html = `
            <div class="release-detail-header">
                <h1>${release.icon} ${release.name}</h1>
                <div class="release-detail-meta">
                    <span class="release-badge ${release.status}">${this.formatReleaseStatus(release.status)}</span>
                    <span class="meta-item">📅 ${release.releaseDate}</span>
                    <span class="meta-item">🔖 Version ${release.version}</span>
                </div>
                <p class="release-detail-summary">${release.summary}</p>
                <a href="${release.mainUrl}" target="_blank" rel="noopener noreferrer" class="external-doc-link">
                    📄 View Official Salesforce Documentation →
                </a>
            </div>
        `;

        // Add each category
        release.categories.forEach(category => {
            html += `
                <div class="feature-category">
                    <div class="category-header">
                        <h2>${category.icon} ${category.name}</h2>
                        <span class="feature-count">${category.features.length} ${category.features.length === 1 ? 'Feature' : 'Features'}</span>
                    </div>
                    <div class="category-features">
            `;

            // Add each feature
            category.features.forEach(feature => {
                html += `
                    <div class="feature-card" data-feature-id="${feature.id}">
                        <div class="feature-header">
                            <div>
                                <h3>${feature.title}</h3>
                                <span class="feature-status ${feature.status.toLowerCase()}">${feature.status}</span>
                            </div>
                            <button class="expand-toggle" data-target="${feature.id}">
                                <span class="toggle-icon">+</span>
                            </button>
                        </div>
                        <p class="feature-description">${feature.description}</p>
                        
                        <div class="feature-details" id="details-${feature.id}">
                            <div class="detail-section">
                                <h4>Overview</h4>
                                <p>${feature.details.overview}</p>
                            </div>

                            <div class="detail-section">
                                <h4>Capabilities</h4>
                                <ul class="capabilities-list">
                                    ${feature.details.capabilities.map(cap => `<li>${cap}</li>`).join('')}
                                </ul>
                            </div>

                            <div class="detail-section">
                                <h4>Use Cases</h4>
                                <ul class="use-cases-list">
                                    ${feature.details.useCases.map(uc => `<li>${uc}</li>`).join('')}
                                </ul>
                            </div>

                            <div class="detail-section availability-section">
                                <h4>Availability</h4>
                                <p>${feature.details.availability}</p>
                            </div>

                            ${feature.details.documentation ? `
                                <div class="detail-section">
                                    <a href="${feature.details.documentation}" target="_blank" rel="noopener noreferrer" class="feature-doc-link">
                                        📖 View Feature Documentation →
                                    </a>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                `;
            });

            html += `
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;

        // Show the detail view
        document.querySelectorAll('.view-container').forEach(container => {
            container.classList.remove('active');
        });
        document.getElementById('releaseDetailView').classList.add('active');

        // Add expand/collapse functionality
        this.setupExpandToggles();

        // Update version info
        const versionInfo = document.getElementById('versionInfo');
        versionInfo.innerHTML = `<strong>${release.icon} ${release.name} Details</strong> • ${this.countTotalFeatures(release)} features`;
    }

    countTotalFeatures(release) {
        return release.categories.reduce((total, cat) => total + cat.features.length, 0);
    }

    formatReleaseStatus(status) {
        const statusMap = {
            'upcoming': 'Upcoming Release',
            'current': 'Current Release',
            'previous': 'Previous Release',
            'archived': 'Archived'
        };
        return statusMap[status] || status;
    }

    setupExpandToggles() {
        document.querySelectorAll('.expand-toggle').forEach(button => {
            button.addEventListener('click', (e) => {
                const targetId = button.dataset.target;
                const detailsDiv = document.getElementById(`details-${targetId}`);
                const toggleIcon = button.querySelector('.toggle-icon');
                
                if (detailsDiv.classList.contains('expanded')) {
                    detailsDiv.classList.remove('expanded');
                    toggleIcon.textContent = '+';
                } else {
                    detailsDiv.classList.add('expanded');
                    toggleIcon.textContent = '−';
                }
            });
        });
    }

    backToCustomerView() {
        document.querySelectorAll('.view-container').forEach(container => {
            container.classList.remove('active');
        });
        document.getElementById('customerView').classList.add('active');

        // Update version info
        const versionInfo = document.getElementById('versionInfo');
        versionInfo.innerHTML = `<strong>Customer Facing - Release Notes</strong> • Official Salesforce Documentation`;
    }

    getEmptyState() {
        return `
            <div class="empty-state">
                <div class="empty-state-icon">🔍</div>
                <h3>No items found</h3>
                <p>Try adjusting your search or filters</p>
            </div>
        `;
    }

    formatStatus(status) {
        const statusMap = {
            'completed': 'Completed',
            'in-progress': 'In Progress',
            'planned': 'Planned',
            'future': 'Future'
        };
        return statusMap[status] || status;
    }

    formatCategory(category) {
        const categoryMap = {
            // V4 SSOT product areas
            'context':       '📚 Context',
            'operate':       '🔬 Operate',
            'control':       '🛠️ Control',
            'orchestration': '🔗 Orchestration',
            'experiences':   '💬 Experiences',
            // Legacy V1/V2/V3 categories
            'feature':        '✨ Feature',
            'enhancement':    '⚡ Enhancement',
            'integration':    '🔗 Integration',
            'infrastructure': '🏗️ Infrastructure',
            'knowledge':      '📚 Knowledge',
            'testing':        '🧪 Testing',
            'platform':       '🏗️ Platform',
            'analytics':      '📊 Analytics',
            'memory':         '🧠 Memory',
            'prompts':        '✍️ Prompts'
        };
        return categoryMap[category] || category;
    }

    exportData() {
        // Export as JSON
        const dataStr = JSON.stringify(this.filteredData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'agentforce-roadmap.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new RoadmapApp();
});

