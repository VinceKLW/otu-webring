// OTU Webring - Main App

let currentSort = 'default';
let searchQuery = '';
// Random starting order for default view (set once per page load)
let displayOrder = [];

document.addEventListener('DOMContentLoaded', () => {
    displayOrder = typeof getSitesStartingFromRandom === 'function' ? getSitesStartingFromRandom() : [...sites];
    renderSitesList();
    initControls();
    if (typeof initTracking === 'function') {
        initTracking();
    }
});

function initControls() {
    const searchInput = document.getElementById('search');
    const filterButtons = document.querySelectorAll('.filters button');

    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase();
        renderSitesList();
    });

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentSort = btn.dataset.sort;
            renderSitesList();
        });
    });
}

function getFilteredSites() {
    // Default: use random-start order (still includes every site, ring order)
    let filtered = currentSort === 'default' && displayOrder.length > 0 ? [...displayOrder] : [...sites];

    // Search filter
    if (searchQuery) {
        filtered = filtered.filter(site =>
            site.name.toLowerCase().includes(searchQuery) ||
            site.url.toLowerCase().includes(searchQuery) ||
            (site.recent_internship && site.recent_internship.toLowerCase().includes(searchQuery))
        );
    }

    // Sort (only when not default)
    if (currentSort === 'alpha') {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (currentSort === 'year') {
        filtered.sort((a, b) => (a.year || 9999) - (b.year || 9999));
    }

    return filtered;
}

function renderSitesList() {
    const list = document.getElementById('sites');
    if (!list) return;

    list.innerHTML = '';
    const filtered = getFilteredSites();

    if (filtered.length === 0) {
        list.innerHTML = '<li class="empty">No sites found</li>';
        return;
    }

    filtered.forEach(site => {
        const li = document.createElement('li');
        const displayUrl = site.url.replace(/^https?:\/\//, '').replace(/\/$/, '');
        const yearDisplay = site.year ? `<span class="year">'${String(site.year).slice(-2)}</span>` : '';
        const descDisplay = site.recent_internship ? `<span class="desc">${site.recent_internship}</span>` : '';

        li.innerHTML = `
            <a href="${site.url}" target="_blank" rel="noopener">
                <div class="site-info">
                    <span class="name">${site.name}${yearDisplay}</span>
                    ${descDisplay}
                </div>
                <span class="url">${displayUrl}</span>
            </a>
        `;
        list.appendChild(li);
    });
}
