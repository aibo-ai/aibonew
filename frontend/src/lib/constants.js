export const BOOKING_URL =
  "https://calendly.com/myaibo-info";

/**
 * API base, always ending in /api. Resolution order:
 *  - REACT_APP_BACKEND_URL set    → "<host>/api"  (or kept as-is if already ends with /api)
 *  - REACT_APP_BACKEND_URL absent → "/api"        (same-origin Vercel deployment)
 */
const raw = process.env.REACT_APP_BACKEND_URL;
const trimmed = (!raw || raw === "undefined") ? "" : raw.replace(/\/$/, "");
export const BACKEND_URL = trimmed.endsWith("/api") ? trimmed : `${trimmed}/api`;
