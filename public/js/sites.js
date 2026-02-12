// Site data
const sites = [
    { name: "Vincent Wong", url: "https://vinceklwong.com", year: 2027, recent_internship: "Shopify" },
    { name: "Shams Haroon", url: "https://shamsharoon.com", year: 2027, recent_internship: "Wealthsimple" },
    { name: "Julian Cruzet", url: "https://juliancruzet.ca", year: 2027, recent_internship: "Royal Bank of Canada" },
    { name: "Jon McKesey", url: "https://jonathanmckesey.com/", year: 2027, recent_internship: "Verily" },
    { name: "Jun Bin Cheng", url: "https://jb-cheng.github.io/", year: 2026, recent_internship:"H.H Angus & Associates Ltd."},
    { name: "Heather Meatherall", url: "https://heather-meatherall.github.io/", year: 2026, recent_internship: "Ontario Public Service" },
    { name: "Rosie Khurmi", url: "https://rosiekhurmi.github.io/Portfolio-Website/", year: 2027, recent_internship: "Bank of Montreal" },
    { name: "Umad Akram", url: "https://umadakram.com/", year: 2027, recent_internship: "Canadian Imperial Bank of Commerce" },
    { name: "Ali Hakkani", url: "https://alihakkani.vercel.app/", year: 2027, recent_internship: "N/A" },
];

// YOU CAN ADD RECENT_INTERNSHIP OR GENERAL DESCRIPTION! (ex. Software Engineer, Full-Stack Developer, etc.)

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

// Get sites list starting from a random index (for display on main page).
// Order is preserved: [start, start+1, ..., end, 0, 1, ..., start-1].
function getSitesStartingFromRandom() {
    if (sites.length === 0) return [];
    const startIndex = Math.floor(Math.random() * sites.length);
    return [...sites.slice(startIndex), ...sites.slice(0, startIndex)];
}
