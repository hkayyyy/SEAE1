class RailAcronymCentre {
    constructor() {
        this.terms = [];
        this.filteredTerms = [];
        this.currentCategory = 'all';
        this.currentTerm = null;
        
        this.init();
    }
    // Initialize application, ensure loading data and binding events
    async init() {
        console.log('Rail Acronym Centre initializing...');
        try {
            await this.loadData();
            this.bindEvents();
            this.updateResults();
            console.log('Application initialized successfully');1
            console.log(`Loaded ${this.terms.length} terms`);
        } catch (error) {
            console.error('Initialization failed:', error);
            this.showError(`Failed to initialize: ${error.message}`);
        }
    }
    
    // Load and parse CSV data
    async loadData() {
        console.log('Loading BritishRailTerms.csv...');
        const response = await fetch('BritishRailTerms.csv');
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const csvText = await response.text();
        console.log(`CSV loaded (${csvText.length} bytes)`);
        
        this.terms = this.parseCSV(csvText);
        this.filteredTerms = [...this.terms];
        this.updateResultCount();
        
        console.log(`Parsed ${this.terms.length} terms`);
    }
    
    parseCSV(csvText) {
        console.log('Parsing CSV...');
        const lines = csvText.split('\n').filter(line => line.trim() !== '');
        
        if (lines.length === 0) {
            console.warn('CSV file is empty');
            return [];
        }
        
        const headers = lines[0].split(',').map(h => h.trim());
        console.log('Headers:', headers);
        
        const terms = [];
        
        for (let i = 1; i < lines.length; i++) {
            try {
                const values = this.parseCSVLine(lines[i]);
                
                if (values.length === 0 || (values.length === 1 && values[0] === '')) {
                    continue; // Skip empty lines
                }
                
                const term = {};
                headers.forEach((header, idx) => {
                    term[header] = values[idx] ? values[idx].trim() : '';
                });
                
                // Ensure we have an ID
                if (!term.id && term.id !== 0) {
                    term.id = i; // Use line number as ID
                }
                
                terms.push(term);
            } catch (error) {
                console.warn(`Error parsing line ${i + 1}:`, lines[i], error);
            }
        }
        
        console.log(`Successfully parsed ${terms.length} terms`);
        return terms;
    }
    
    // Basic CSV line parser handling quoted values
    parseCSVLine(line) {
        const values = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            const nextChar = line[i + 1];
            
            if (char === '"') {
                if (inQuotes && nextChar === '"') {
                    current += '"';
                    i++; // Skip next quote
                } else {
                    inQuotes = !inQuotes;
                }
            } else if (char === ',' && !inQuotes) {
                values.push(current);
                current = '';
            } else {
                current += char;
            }
        }
        
        // Add the last value
        values.push(current);
        return values;
    }
    
    bindEvents() {
        console.log('Binding events...');
        const searchInput = document.getElementById('searchInput');
        
        if (!searchInput) {
            console.error('Search input element not found!');
            return;
        }
        
        // Search input
        searchInput.addEventListener('input', (e) => {
            console.log('🔍 Searching for:', e.target.value);
            this.handleSearch(e.target.value);
        });
        
        // Clear button
        const clearBtn = document.getElementById('clearBtn');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                searchInput.value = '';
                searchInput.focus();
                this.handleSearch('');
            });
        }
        
        // I'm Feeling Lucky button
        const luckyBtn = document.getElementById('luckyBtn');
        if (luckyBtn) {
            luckyBtn.addEventListener('click', () => {
                console.log('I\'m Feeling Lucky clicked');
                this.handleLucky();
            });
        }
        
        // Category filters
        document.querySelectorAll('.category-tag').forEach(tag => {
            tag.addEventListener('click', (e) => {
                const category = e.target.dataset.category;
                console.log('Filtering by category:', category);
                this.handleCategoryFilter(category);
            });
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
        
        // Enter key selects first result
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && this.filteredTerms.length > 0) {
                console.log('⏎ Enter pressed, selecting first result');
                this.showTermDetail(this.filteredTerms[0]);
            }
        });
        
        console.log('Events bound successfully');
    }
    
    // Handle search input
    handleSearch(query) {
        const normalizedQuery = query.toLowerCase().trim();
        console.log(`Searching for: "${normalizedQuery}"`);
        
        if (!normalizedQuery) {
            this.filteredTerms = [...this.terms];
        } else {
            this.filteredTerms = this.terms.filter(item => {
                const searchText = `${item.term || ''} ${item.fullForm || ''} ${item.description || ''} ${item.commonUse || ''} ${item.category || ''}`.toLowerCase();
                return searchText.includes(normalizedQuery);
            });
        }
        
        console.log(`Found ${this.filteredTerms.length} results`);
        this.updateResults();
        this.updateResultCount();
    }
    
    // Handle category filtering
    handleCategoryFilter(category) {
        this.currentCategory = category;
        console.log(`Setting category to: ${category}`);
        
        // Update active category button
        document.querySelectorAll('.category-tag').forEach(tag => {
            tag.classList.toggle('active', tag.dataset.category === category);
        });
        
        // Filter terms
        if (category === 'all') {
            this.filteredTerms = [...this.terms];
        } else {
            this.filteredTerms = this.terms.filter(item => 
                item.category && item.category.toLowerCase() === category.toLowerCase()
            );
        }
        
        console.log(`Found ${this.filteredTerms.length} terms in category "${category}"`);
        this.updateResults();
        this.updateResultCount();
    }
    
    // Handle "I'm Feeling Lucky"
    handleLucky() {
        if (this.filteredTerms.length === 0) {
            console.log('No terms to pick from');
            return;
        }
        
        const randomIndex = Math.floor(Math.random() * this.filteredTerms.length);
        const randomTerm = this.filteredTerms[randomIndex];
        console.log('Random term selected:', randomTerm.term);
        
        this.showTermDetail(randomTerm);
        
        // Update search input
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.value = randomTerm.term || '';
            this.handleSearch(randomTerm.term || '');
        }
    }
    
    // Handle keyboard shortcuts
    handleKeyboardShortcuts(e) {
        // Escape clears search
        if (e.key === 'Escape') {
            const searchInput = document.getElementById('searchInput');
            if (searchInput && searchInput.value) {
                searchInput.value = '';
                this.handleSearch('');
                searchInput.focus();
                console.log('Escape pressed, cleared search');
            }
        }
        
        // Arrow keys navigation
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            this.navigateResults(e.key === 'ArrowDown' ? 'down' : 'up');
        }
    }
    
    // Navigate results with arrow keys
    navigateResults(direction) {
        if (this.filteredTerms.length === 0) return;
        
        let currentIndex = 0;
        if (this.currentTerm) {
            currentIndex = this.filteredTerms.findIndex(t => t.id == this.currentTerm.id);
            if (currentIndex === -1) currentIndex = 0;
        }
        
        if (direction === 'down') {
            currentIndex = Math.min(currentIndex + 1, this.filteredTerms.length - 1);
        } else {
            currentIndex = Math.max(currentIndex - 1, 0);
        }
        
        const nextTerm = this.filteredTerms[currentIndex];
        console.log(`Navigating ${direction} to:`, nextTerm.term);
        this.showTermDetail(nextTerm);
        
        // Scroll to item
        const items = document.querySelectorAll('.term-item');
        if (items[currentIndex]) {
            items[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
    
    // Update results list in the DOM
    updateResults() {
        const resultsList = document.getElementById('resultsList');
        const termDetail = document.getElementById('termDetail');
        
        if (!resultsList || !termDetail) {
            console.error('Required DOM elements not found');
            return;
        }
        
        if (this.filteredTerms.length === 0) {
            resultsList.innerHTML = `
                <div class="initial-state">
                    <i class="fas fa-search"></i>
                    <p>No terms found. Try a different search.</p>
                </div>
            `;
            termDetail.innerHTML = `
                <div class="detail-placeholder">
                    <i class="fas fa-info-circle"></i>
                    <p>Select a term to view detailed information</p>
                </div>
            `;
            return;
        }
        
        // Update results list
        resultsList.innerHTML = this.filteredTerms.map(item => `
            <div class="term-item ${this.currentTerm?.id == item.id ? 'active' : ''}" 
                 data-id="${item.id}"
                 onclick="window.railPalette.showTermDetail(${JSON.stringify(item).replace(/"/g, '&quot;')})">
                <div class="term-header">
                    <div class="term-name">${this.escapeHtml(item.fullForm || 'No full form')}</div>
                    ${item.term ? `<span class="term-acronym">${this.escapeHtml(item.term)}</span>` : ''}
                </div>
                <div class="term-category">${this.formatCategory(item.category || 'uncategorized')}</div>
                <div class="term-preview">${this.escapeHtml(item.description || 'No description').substring(0, 100)}${(item.description || '').length > 100 ? '...' : ''}</div>
            </div>
        `).join('');
        
        // Update title
        const title = document.getElementById('resultsTitle');
        if (title) {
            const searchInput = document.getElementById('searchInput');
            const searchValue = searchInput ? searchInput.value : '';
            
            if (searchValue) {
                title.textContent = `Results for "${searchValue}"`;
            } else if (this.currentCategory !== 'all') {
                title.textContent = `${this.formatCategory(this.currentCategory)} Terms`;
            } else {
                title.textContent = 'All Terms';
            }
        }
        
        // Auto-select first result if none selected
        if (!this.currentTerm || !this.filteredTerms.some(t => t.id == this.currentTerm.id)) {
            this.showTermDetail(this.filteredTerms[0]);
        }
    }
    
    // Show detailed view of a term
    showTermDetail(item) {
        if (!item) return;
        
        this.currentTerm = item;
        console.log('Showing term detail:', item.term);
        
        const detailSection = document.getElementById('termDetail');
        if (!detailSection) return;
        
        // Populate detail view
        detailSection.innerHTML = `
            <div class="detail-header">
                <div>
                    <h2 class="detail-title">${this.escapeHtml(item.fullForm || 'Unknown Term')}</h2>
                    ${item.term ? `<div style="margin-top: 5px; color: var(--accent-color); font-weight: bold;">${this.escapeHtml(item.term)}</div>` : ''}
                </div>
                <span class="detail-category">${this.formatCategory(item.category || 'uncategorized')}</span>
            </div>
            
            <div class="detail-body">
                <h3>Definition</h3>
                <p>${this.escapeHtml(item.description || 'No description available')}</p>
                
                ${item.commonUse ? `
                    <h3>Common Use</h3>
                    <p>${this.escapeHtml(item.commonUse)}</p>
                ` : ''}
                
                <div class="related-terms">
                    <h3>Category</h3>
                    <div class="related-tags">
                        <span class="related-tag" onclick="window.railPalette.searchTag('${this.escapeHtml(item.category || '')}')">
                            ${this.formatCategory(item.category || 'uncategorized')}
                        </span>
                    </div>
                </div>
                
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid var(--light-bg); color: var(--text-light); font-size: 0.9rem;">
                    <p><i class="fas fa-hashtag"></i> ID: ${item.id || 'N/A'}</p>
                </div>
            </div>
        `;
        
        // Update active state
        document.querySelectorAll('.term-item').forEach(termItem => {
            termItem.classList.remove('active');
            if (termItem.dataset.id == item.id) {
                termItem.classList.add('active');
            }
        });
    }
    
    // Search by tag from detail view
    searchTag(tag) {
        if (!tag) return;
        
        console.log('Searching for tag:', tag);
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.value = tag;
            this.handleSearch(tag);
        }
    }
    
    updateResultCount() {
        const countElement = document.getElementById('resultCount');
        if (countElement) {
            countElement.textContent = `${this.filteredTerms.length} term${this.filteredTerms.length !== 1 ? 's' : ''}`;
        }
    }
    
    formatCategory(category) {
        if (!category || category === 'uncategorized') return 'Uncategorized';
        return category.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    }
    
    escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    showError(message) {
        console.error('Error:', message);
        
        const resultsList = document.getElementById('resultsList');
        if (resultsList) {
            resultsList.innerHTML = `
                <div class="initial-state">
                    <i class="fas fa-exclamation-triangle" style="color: var(--secondary-color);"></i>
                    <p>${message}</p>
                    <p style="margin-top: 10px; font-size: 0.9rem;">Please check the browser console for details.</p>
                </div>
            `;
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, starting application...');
    
    // Make railPalette globally available for onclick handlers
    window.railPalette = new RailAcronymCentre();
    
    // Focus search on load
    setTimeout(() => {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.focus();
            console.log('Search input focused');
        }
    }, 100);
});

// loading indicator
document.addEventListener('DOMContentLoaded', () => {
    const loadingIndicator = document.createElement('div');
    loadingIndicator.id = 'loadingIndicator';
    loadingIndicator.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(255,255,255,0.9); display: flex; justify-content: center; align-items: center; z-index: 9999;">
            <div style="text-align: center;">
                <i class="fas fa-train fa-spin" style="font-size: 3rem; color: var(--primary-color);"></i>
                <p style="margin-top: 20px;">Loading rail terms...</p>
            </div>
        </div>
    `;
    document.body.appendChild(loadingIndicator);
    
    // Hide loading indicator after 2 seconds
    setTimeout(() => {
        loadingIndicator.style.display = 'none';
    }, 2000);
});