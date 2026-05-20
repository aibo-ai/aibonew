export const BOOKING_URL =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1RTsHL7_2Q0w8M2J7ul--JslQuYdb9C9Bfd5yLu0i5VodhSqHB0i9gkvUCTKQ476GMWqETg3QB";

/**
 * API base, always ending in /api. Resolution order:
 *  - REACT_APP_BACKEND_URL set    → "<host>/api"  (or kept as-is if already ends with /api)
 *  - REACT_APP_BACKEND_URL absent → "/api"        (same-origin Vercel deployment)
 */
const raw = process.env.REACT_APP_BACKEND_URL;
const trimmed = (!raw || raw === "undefined") ? "" : raw.replace(/\/$/, "");
export const BACKEND_URL = trimmed.endsWith("/api") ? trimmed : `${trimmed}/api`;
