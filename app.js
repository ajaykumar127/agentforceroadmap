// Agentforce Roadmap Application
// Main application logic

class RoadmapApp {
    constructor() {
        this.currentVersion = 'v3';
        this.dataVersions = {
            v1: roadmapDataV1,
            v2: roadmapDataV2,
            v3: roadmapDataV3
        };
        this.data = this.dataVersions[this.currentVersion];
        this.filteredData = [...this.data];
        this.currentView = 'timeline';
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
        this.render();
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
                'v1': 'V1 - Core Roadmap',
                'v2': 'V2 - Extended Roadmap',
                'v3': 'V3 - Q1-Q2 2026 Roadmap (Updated March 2026)'
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

        // Filters
        document.getElementById('categoryFilter').addEventListener('change', () => {
            this.applyFilters();
        });

        document.getElementById('statusFilter').addEventListener('change', () => {
            this.applyFilters();
        });

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
        
        // Handle customer facing version (release notes)
        if (version === 'customer') {
            // Hide controls bar (no need for view toggle or filters)
            document.querySelector('.controls-bar').style.display = 'none';
            
            // Show customer view
            document.querySelectorAll('.view-container').forEach(container => {
                container.classList.remove('active');
            });
            document.getElementById('customerView').classList.add('active');
            
            this.updateVersionInfo();
            return;
        }
        
        // Show controls bar for V1/V2
        document.querySelector('.controls-bar').style.display = 'block';
        
        // Update data for V1/V2
        this.data = this.dataVersions[version];
        this.filteredData = [...this.data];
        
        // Reset filters
        document.getElementById('searchInput').value = '';
        document.getElementById('categoryFilter').value = 'all';
        document.getElementById('statusFilter').value = 'all';
        
        // Show the current view (timeline, grid, or list)
        document.querySelectorAll('.view-container').forEach(container => {
            container.classList.remove('active');
        });
        document.getElementById(`${this.currentView}View`).classList.add('active');
        
        this.updateVersionInfo();
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
        const lowerQuery = query.toLowerCase();
        this.filteredData = this.data.filter(item => {
            return item.title.toLowerCase().includes(lowerQuery) ||
                   item.description.toLowerCase().includes(lowerQuery) ||
                   item.category.toLowerCase().includes(lowerQuery);
        });
        this.render();
    }

    applyFilters() {
        const categoryFilter = document.getElementById('categoryFilter').value;
        const statusFilter = document.getElementById('statusFilter').value;

        this.filteredData = this.data.filter(item => {
            const categoryMatch = categoryFilter === 'all' || item.category === categoryFilter;
            const statusMatch = statusFilter === 'all' || item.status === statusFilter;
            return categoryMatch && statusMatch;
        });

        this.render();
    }

    render() {
        switch(this.currentView) {
            case 'timeline':
                this.renderTimeline();
                break;
            case 'grid':
                this.renderGrid();
                break;
            case 'list':
                this.renderList();
                break;
        }
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

        // Sort periods
        const periodOrder = ['Q4 2024', 'Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025', '2026+'];
        const sortedPeriods = Object.keys(periods).sort((a, b) => {
            return periodOrder.indexOf(a) - periodOrder.indexOf(b);
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

    createTimelineItem(item) {
        const ownerHtml = item.owner ? `<span class="meta-item">👤 ${item.owner}</span>` : '';
        return `
            <div class="timeline-item status-${item.status}" data-id="${item.id}">
                <div class="item-header">
                    <h3 class="item-title">${item.title}</h3>
                    <span class="status-badge ${item.status}">${this.formatStatus(item.status)}</span>
                </div>
                <p class="item-description">${item.description}</p>
                <div class="item-meta">
                    <span class="meta-item">📅 ${item.date}</span>
                    ${ownerHtml}
                    <span class="meta-item">
                        <span class="category-tag">${this.formatCategory(item.category)}</span>
                    </span>
                </div>
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
            const ownerHtml = item.owner ? `<span class="meta-item">👤 ${item.owner}</span>` : '';
            return `
                <div class="grid-item status-${item.status}" data-id="${item.id}">
                    <div class="item-header">
                        <h3 class="item-title">${item.title}</h3>
                        <span class="status-badge ${item.status}">${this.formatStatus(item.status)}</span>
                    </div>
                    <p class="item-description">${item.description}</p>
                    <div class="item-meta">
                        <span class="meta-item">📅 ${item.date}</span>
                        ${ownerHtml}
                        <span class="meta-item">
                            <span class="category-tag">${this.formatCategory(item.category)}</span>
                        </span>
                    </div>
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
                        <span class="meta-item">📅 ${item.date}</span>
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

        // Owner and PRD section (V2 features)
        let ownerPrdHtml = '';
        if (item.owner || item.prdLink) {
            ownerPrdHtml = '<div class="modal-section owner-prd-section">';
            if (item.owner) {
                ownerPrdHtml += `
                    <div class="owner-info">
                        <span class="owner-label">👤 Product Owner:</span>
                        <span class="owner-name">${item.owner}</span>
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
                    <span class="meta-item">📅 ${item.date}</span>
                    <span class="meta-item">📊 ${item.quarter}</span>
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
            'feature': '✨ Feature',
            'enhancement': '⚡ Enhancement',
            'integration': '🔗 Integration',
            'infrastructure': '🏗️ Infrastructure'
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

