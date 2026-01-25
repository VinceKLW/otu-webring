// Site data
const sites = [
    { name: "Vincent Wong", url: "https://vinceklwong.com" },
    { name: "Shams Haroon", url: "https://shamsharoon.com" },
    { name: "Julian Cruzet", url: "https://juliancruzet.ca" },
    { name: "Jon McKesey", url: "https://jonathanmckesey.com/" }
];

// Helper to normalize URLs for comparison
function normalizeUrl(url) {
    return url.replace(/^https?:\/\//, '').replace(/\/$/, '').toLowerCase();
}

// Find site index by URL
function findSiteIndex(fromUrl) {
    const normalized = normalizeUrl(fromUrl);
    return sites.findIndex(site => normalizeUrl(site.url) === normalized);
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
