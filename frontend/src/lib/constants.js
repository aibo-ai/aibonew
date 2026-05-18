export const BOOKING_URL =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1RTsHL7_2Q0w8M2J7ul--JslQuYdb9C9Bfd5yLu0i5VodhSqHB0i9gkvUCTKQ476GMWqETg3QB";

/** Same-origin API base on Vercel; override with REACT_APP_BACKEND_URL for local backend. */
export const BACKEND_URL = (
  process.env.REACT_APP_BACKEND_URL || "/api"
).replace(/\/$/, "");
