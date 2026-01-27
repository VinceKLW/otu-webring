// Site data
const sites = [
    { name: "Vincent Wong", url: "https://vinceklwong.com", year: 2027, desc: "Software Engineer" },
    { name: "Shams Haroon", url: "https://shamsharoon.com", year: 2027, desc: "Software Engineer" },
    { name: "Julian Cruzet", url: "https://juliancruzet.ca", year: 2026, desc: "Software Engineer" },
    { name: "Jon McKesey", url: "https://jonathanmckesey.com/", year: 2027, desc: "Software Engineer" }
];

// Helper to normalize URLs for comparison
function normalizeUrl(url) {
    if (!url) return '';
    // Remove protocol, www. prefix, trailing slashes, and lowercase
    return url
        .replace(/^https?:\/\//, '')
        .replace(/^www\./, '')
        .replace(/\/$/, '')
        .toLowerCase();
}

// Find site index by URL
function findSiteIndex(fromUrl) {
    if (!fromUrl) return -1;
    const normalized = normalizeUrl(fromUrl);
    console.log('Finding site index for:', fromUrl, 'normalized to:', normalized);
    const index = sites.findIndex(site => {
        const siteNormalized = normalizeUrl(site.url);
        console.log('Comparing:', normalized, 'with', siteNormalized, 'from', site.url);
        return siteNormalized === normalized;
    });
    console.log('Found index:', index);
    return index;
}

// Get next site (wraps around)
function getNextSite(fromUrl) {
    const index = findSiteIndex(fromUrl);
    if (index === -1) return sites[0];
    const nextIndex = (index + 1) % sites.length;
    return sites[nextIndex];
}

// Get previous site (wraps around)
function getPrevSite(fromUrl) {
    const index = findSiteIndex(fromUrl);
    if (index === -1) return sites[sites.length - 1];
    const prevIndex = (index - 1 + sites.length) % sites.length;
    return sites[prevIndex];
}
