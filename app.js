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
        this.data = this.dataVersions[this.currentVersion];
        this.filteredData = [...this.data];
        this.currentView = 'timeline';
        this.activeFilters = { category: new Set(), status: new Set() };
        this.searchQuery = '';
        this.initTheme();
        this.init();
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
    }

    // ----- Dashboard -----
    renderDashboard() {
        const el = document.getElementById('dashboardStats');
        if (!el) return;
        if (this.currentVersion === 'customer') { el.innerHTML = ''; return; }

        const data = this.data;
        const counts = { total: data.length, completed: 0, 'in-progress': 0, planned: 0, future: 0, pilot: 0 };
        const owners = new Set();
        const ownerCounts = {};
        const thisMonth = [];
        const monthLabels = ['May 2026','June 2026'];
        const isMeta = name => !name || name.startsWith('—');
        data.forEach(i => {
            if (counts[i.status] !== undefined) counts[i.status]++;
            if (i.owner && !isMeta(i.owner)) {
                owners.add(i.owner);
                ownerCounts[i.owner] = (ownerCounts[i.owner] || 0) + 1;
            }
            if (monthLabels.includes(i.period)) thisMonth.push(i);
        });
        const topOwners = Object.entries(ownerCounts).sort((a,b)=>b[1]-a[1]).slice(0,3);

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
                <div class="stat-callout-title">📅 This window (May–Jun ’26)</div>
                <div class="stat-callout-num">${thisMonth.length} features</div>
                ${topOwners.length ? `<div class="stat-callout-sub">Top owners: ${topOwners.map(([n,c])=>`<span class="owner-pill">${n} · ${c}</span>`).join(' ')}</div>` : ''}
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
        this.data.forEach(i => {
            statusCounts[i.status] = (statusCounts[i.status] || 0) + 1;
            catCounts[i.category] = (catCounts[i.category] || 0) + 1;
        });

        const statusChips = statuses.map(s => chipHtml('status', s, this.formatStatus(s), statusCounts[s] || 0)).join('');
        const catChips = cats.map(c => chipHtml('category', c, this.formatCategory(c), catCounts[c] || 0)).join('');

        const clearBtn = (this.activeFilters.category.size + this.activeFilters.status.size) > 0
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
            ${clearBtn}
        `;

        const clear = document.getElementById('chipClear');
        if (clear) clear.addEventListener('click', () => {
            this.activeFilters.category.clear();
            this.activeFilters.status.clear();
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
                'gus': 'GUS Live - Build 262 Epics (Pulled May 2026)',
                'v1': 'V1 - Core Roadmap',
                'v2': 'V2 - Extended Roadmap',
                'v3': 'V3 - Q1-Q2 2026 Roadmap (Updated March 2026)',
                'v4': 'Latest View May-June 2026',
            };
            versionName = versionNames[this.currentVersion] || 'V1 - Core Roadmap';
            itemCount = `${this.data.length} items`;
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

        // Version selector
        document.getElementById('versionSelect').addEventListener('change', (e) => {
            this.switchVersion(e.target.value);
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

        this.filteredData = this.data.filter(item => {
            const catMatch = cats.size === 0 || cats.has(item.category);
            const stMatch = sts.size === 0 || sts.has(item.status);
            if (!catMatch || !stMatch) return false;
            if (!q) return true;
            const haystack = [
                item.title, item.description, item.category, item.status,
                item.owner, item.pmm, item.engLead, item.gusProgram, item.period
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
            items.forEach(i => { if (counts[i.status]!==undefined) counts[i.status]++; });
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

    ownerChips(item) {
        const chips = [];
        if (item.owner) chips.push(`<span class="people-chip people-owner" title="Product Owner">👤 ${item.owner}</span>`);
        if (item.pmm)   chips.push(`<span class="people-chip people-pmm" title="PMM">🎯 ${item.pmm}</span>`);
        if (item.engLead) chips.push(`<span class="people-chip people-eng" title="Engineering Lead">⚙️ ${item.engLead}</span>`);
        return chips.join('');
    }

    createTimelineItem(item) {
        const peopleHtml = this.ownerChips(item);
        const releaseLabel = this.getBuildLabel(item) || item.period || item.date || '';
        return `
            <div class="timeline-item status-${item.status}" data-id="${item.id}">
                <div class="item-header">
                    <h3 class="item-title">${item.title}</h3>
                    <span class="status-badge ${item.status}">${this.formatStatus(item.status)}</span>
                </div>
                <p class="item-description">${item.description}</p>
                <div class="item-meta">
                    ${releaseLabel ? `<span class="meta-item">🗓️ ${releaseLabel}</span>` : ''}
                    <span class="meta-item"><span class="category-tag">${this.formatCategory(item.category)}</span></span>
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
            const releaseLabel = this.getBuildLabel(item) || item.period || item.date || '';
            return `
                <div class="grid-item status-${item.status}" data-id="${item.id}">
                    <div class="item-header">
                        <h3 class="item-title">${item.title}</h3>
                        <span class="status-badge ${item.status}">${this.formatStatus(item.status)}</span>
                    </div>
                    <p class="item-description">${item.description}</p>
                    <div class="item-meta">
                        ${releaseLabel ? `<span class="meta-item">🗓️ ${releaseLabel}</span>` : ''}
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
            const releaseLabel = this.getBuildLabel(item) || item.period || item.date || '';
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
        `;

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

