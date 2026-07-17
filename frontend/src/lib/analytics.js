/**
 * Lightweight analytics helper for GA4 (via gtag.js, already loaded in public/index.html)
 * and GTM's dataLayer. Safe to call even if analytics hasn't loaded yet (e.g. ad blockers).
 *
 * Usage:
 *   trackEvent('qualify_lead', { source: 'contact_form' });
 *   trackEvent('close_convert_lead', { source: 'calendly_booking', page: '/solutions/geo' });
 */
export function trackEvent(eventName, params = {}) {
  try {
    if (typeof window === 'undefined') return;

    // GA4 direct (gtag.js is loaded in index.html and configured with G-9SDH7S2VET)
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    }

    // GTM dataLayer (GTM-TQTC4S5G) — also push here so GTM-side triggers/tags can use it
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: eventName, ...params });
    }
  } catch (err) {
    // Never let analytics failures break the UI
    console.error('[analytics] trackEvent failed:', err);
  }
}

export function trackLeadFormSubmit(extra = {}) {
  trackEvent('qualify_lead', { source: 'contact_form', ...extra });
}

export function trackBookingClick(extra = {}) {
  trackEvent('close_convert_lead', { source: 'calendly_booking', ...extra });
}
