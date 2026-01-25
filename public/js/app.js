// OTU Webring - Main App

document.addEventListener('DOMContentLoaded', () => {
    renderSitesList();
    // Initialize tracking after sites are rendered
    if (typeof initTracking === 'function') {
        initTracking();
    }
});

// Render the list of sites
function renderSitesList() {
    const list = document.getElementById('sites');
    if (!list) return;

    sites.forEach(site => {
        const li = document.createElement('li');
        const displayUrl = site.url.replace(/^https?:\/\//, '');

        li.innerHTML = `
            <a href="${site.url}" target="_blank" rel="noopener">
                <span class="name">${site.name}</span>
                <span class="url">${displayUrl}</span>
            </a>
        `;
        list.appendChild(li);
    });
}

