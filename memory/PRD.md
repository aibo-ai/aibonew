# MyAibo Homepage - PRD

## Problem Statement
Build a complete single-page React homepage for MyAibo (myaibo.in), a boutique AI + marketing agency with 12 sections, brand colors (Purple #7C3BED, Dark #0F0A1E, Amber #F59E0B), Fraunces/DM Sans typography, and full mobile responsiveness.

## Architecture
- **Frontend**: React SPA with 12 section components
- **Backend**: FastAPI (minimal, no active use for landing page)
- **Database**: MongoDB (not used for current static page)
- **Styling**: Tailwind CSS + custom CSS (App.css) with CSS variables

## User Personas
- Potential marketing clients visiting the agency website
- Technology/SaaS founders looking for AI development partners
- Combined marketing + technology prospects

## Core Requirements
- 12 sections with unique layouts per section
- Brand color system: Purple (marketing), Amber (tech only), Dark (immersive), White/Off-white (breathing room)
- Case study filter (All/Marketing/Technology/Combined)
- Solutions dropdown with 7 sub-items
- Mobile responsive (hamburger menu, stacked layouts)
- CTA links to Outlook booking: https://outlook.office365.com/book/MyAiboConsultation@myaibo.in/

## Deployment (Vercel)
- Vercel serverless function entry points live at `api/index.py` (FastAPI via Mangum) and `api/cms/index.ts` (CMS).
- `vercel.json` declares both in `functions` and uses `rewrites` to map `/api/cms/(.*) -> /api/cms/index.ts`, `/api/(.*) -> /api/index.py`, and the SPA catch-all `/((?!api/).*) -> /index.html`.
- **Important**: Vercel's Python runtime does NOT support Next.js-style `[...path].py` catch-all filenames. Always use `index.py`.

## What's Been Implemented (Feb 2026)
- All 12 homepage sections: Navigation, Hero, Positioning, Marketing Services, Technology Services, Why MyAibo, Results, Case Studies, Process, Testimonials, Final CTA, Footer
- Brand color system with CSS variables
- Fraunces + DM Sans typography via Google Fonts
- Case study filter with useState
- Solutions dropdown (Shadcn DropdownMenu) with 2 categories: Marketing (4) + Technology (3)
- Mobile hamburger menu matching myaibo.in structure with Marketing/Technology sections
- React Router with homepage + 4 marketing service sub-pages
- Service pages: /solutions/geo, /solutions/aeo, /solutions/seo, /solutions/content-marketing
- Each service page: Hero, Intro, Before/After, Process, Deliverables, Why Now, Results, Testimonial, CTA
- All CTAs linked to booking URL
- Newsletter subscribe UI (static placeholder)
- All tests passed (95%+ - AEO browser crash was env issue)

## Backlog
- P0: Connect newsletter subscribe to Supabase backend
- P0: Create Technology sub-pages (AI Automations, White Label, Full Stack) when content is provided
- P1: Add actual client logos to trust strip
- P1: Add smooth scroll animations (intersection observer)
- P2: Add blog/insights page
- P2: SEO meta tags and Open Graph

## Code Quality Improvements (May 2026)
- **httpOnly cookie auth**: Admin JWT moved from sessionStorage to HttpOnly + Secure + SameSite=None cookie. JWT is no longer accessible via `document.cookie` or `sessionStorage` → XSS exfiltration surface eliminated.
  - New helper: `/app/frontend/src/lib/adminApi.js` (uses `credentials: 'include'`).
  - Backend already supported cookies via `set_cookie` in `/app/backend/routes/admin_api.py`; `require_admin()` reads cookie first, Bearer header as fallback.
  - Endpoints: `POST /api/admin/login` (sets cookie), `POST /api/admin/logout` (clears cookie), `GET /api/admin/me` (cookie-only probe).
- **Component refactor**: 
  - `Navigation.js`: 555 → 70 lines. Split into `navigation/DesktopNav.js` (209), `navigation/MobileNav.js` (136), `navigation/navData.js` (12).
  - `ContactPage.js`: 459 → 57 lines. Split into `contact/ContactInfoPanel.js` (116), `contact/ContactForm.js` (310).
- **`BACKEND_URL` normalisation**: `constants.js` now always ends with `/api` so callers work in both Vercel production AND preview env.
- **Regression test**: `/app/backend/tests/test_admin_cookie_auth.py` covers full admin auth + CRUD lifecycle. Run via `pytest backend/tests/`.

