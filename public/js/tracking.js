// Tracking utility for OTU Webring
// Tracks link clicks and navigation events

// Initialize tracking
function initTracking() {
    // Track all link clicks
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) return;

        const href = link.getAttribute('href');
        const text = link.textContent.trim();
        
        // Track different types of clicks
        if (href && href.startsWith('http')) {
            // External site link
            trackEvent('site_click', {
                url: href,
                link_text: text,
                page: window.location.pathname
            });
        } else if (href && (href.includes('prev.html') || href.includes('next.html') || href.includes('random.html'))) {
            // Navigation button
            const navType = href.includes('prev.html') ? 'prev' : 
                          href.includes('next.html') ? 'next' : 'random';
            trackEvent('navigation_click', {
                type: navType,
                from: new URLSearchParams(window.location.search).get('from') || 'index',
                page: window.location.pathname
            });
        } else if (href && href.includes('index.html') || href === '/' || href === '') {
            // Home page link
            trackEvent('home_click', {
                page: window.location.pathname
            });
        }
    });

    // Track page views
    trackPageView();
}

// Track page view
function trackPageView() {
    trackEvent('page_view', {
        path: window.location.pathname,
        referrer: document.referrer,
        from: new URLSearchParams(window.location.search).get('from') || null
    });
}

// Track custom events
function trackEvent(eventName, eventData = {}) {
    // Log to console in development
    if (window.location.hostname === 'localhost' || window.location.hostname.includes('localhost')) {
        console.log('📊 Track:', eventName, eventData);
    }

    // Send to Vercel Analytics API endpoint
    try {
        const payload = {
            event: eventName,
            data: eventData,
            timestamp: new Date().toISOString(),
            url: window.location.href,
            path: window.location.pathname,
            referrer: document.referrer
        };
        
        const data = JSON.stringify(payload);
        
        // Use navigator.sendBeacon for reliable tracking (works even if page is unloading)
        // This is especially important for redirect pages
        if (navigator.sendBeacon) {
            const blob = new Blob([data], { type: 'application/json' });
            navigator.sendBeacon('/api/analytics', blob);
        } else {
            // Fallback to fetch with keepalive
            fetch('/api/analytics', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: data,
                keepalive: true
            }).catch(() => {}); // Silently fail if endpoint doesn't exist
        }
    } catch (e) {
        // Ignore errors - don't break the user experience
    }
}

// Track site redirect (for prev/next/random pages)
function trackRedirect(targetUrl, redirectType) {
    trackEvent('site_redirect', {
        target_url: targetUrl,
        redirect_type: redirectType,
        from: new URLSearchParams(window.location.search).get('from') || null,
        page: window.location.pathname
    });
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { trackEvent, trackRedirect, initTracking };
}
