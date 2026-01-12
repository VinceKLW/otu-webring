// Filter and display sites based on search input
function filterSites() {
    const searchInput = document.getElementById('searchInput');
    const sitesList = document.getElementById('sitesList');
    const searchTerm = searchInput.value.toLowerCase().trim();

    // Clear existing list
    sitesList.innerHTML = '';

    // Filter sites
    const filteredSites = allSites.filter(site => {
        const nameMatch = site.name.toLowerCase().includes(searchTerm);
        const websiteMatch = site.website.toLowerCase().includes(searchTerm);
        const yearMatch = site.year.toString().includes(searchTerm);
        return nameMatch || websiteMatch || yearMatch;
    });

    // Display filtered sites or empty state
    if (filteredSites.length === 0 && searchTerm !== '') {
        sitesList.innerHTML = '<div class="empty-state">No sites found matching your search.</div>';
    } else if (filteredSites.length === 0) {
        sitesList.innerHTML = '<div class="empty-state">No sites available.</div>';
    } else {
        filteredSites.forEach(site => {
            const siteWrapper = document.createElement('div');
            siteWrapper.className = 'site-wrapper';
            
            const siteItem = document.createElement('div');
            siteItem.className = 'site-item';
            
            const nameDiv = document.createElement('div');
            nameDiv.className = 'site-name';
            nameDiv.textContent = site.name.toUpperCase();
            
            const yearDiv = document.createElement('div');
            yearDiv.className = 'site-year';
            yearDiv.textContent = site.year;
            
            const linkDiv = document.createElement('div');
            linkDiv.className = 'site-link-container';
            
            const link = document.createElement('a');
            link.className = 'site-link';
            link.href = site.website;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            const websiteText = site.website.replace(/^https?:\/\//, '').replace(/\/$/, '');
            link.textContent = websiteText.toLowerCase();
            
            const dropdownBtn = document.createElement('button');
            dropdownBtn.className = 'dropdown-btn';
            dropdownBtn.innerHTML = '▼';
            dropdownBtn.setAttribute('aria-label', 'Toggle details');
            
            linkDiv.appendChild(link);
            linkDiv.appendChild(dropdownBtn);
            
            siteItem.appendChild(nameDiv);
            siteItem.appendChild(yearDiv);
            siteItem.appendChild(linkDiv);
            
            // Dropdown content
            const dropdownContent = document.createElement('div');
            dropdownContent.className = 'dropdown-content';
            
            // Only show dropdown if there are internships
            if (site.internships && site.internships.length > 0) {
                // Display all internships
                site.internships.forEach(internship => {
                    const internshipDiv = document.createElement('div');
                    internshipDiv.className = 'internship-item';
                    internshipDiv.innerHTML = `
                        <strong>${internship.company}</strong> - ${internship.role}<br>
                        <span class="internship-period">${internship.period}</span>
                    `;
                    dropdownContent.appendChild(internshipDiv);
                });
            } else {
                // Hide dropdown button if no internships
                dropdownBtn.style.display = 'none';
            }
            
            // Toggle dropdown
            dropdownBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                siteWrapper.classList.toggle('expanded');
                dropdownBtn.innerHTML = siteWrapper.classList.contains('expanded') ? '▲' : '▼';
            });
            
            siteWrapper.appendChild(siteItem);
            siteWrapper.appendChild(dropdownContent);
            sitesList.appendChild(siteWrapper);
        });
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    
    // Display all sites on load
    filterSites();
    
    // Add event listener for search
    searchInput.addEventListener('input', filterSites);
    
    // Add keyboard shortcut (Cmd/Ctrl + K) to focus search
    document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
        }
    });
});
