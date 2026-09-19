# GUniverse — Landing Page PRD

## Original Problem Statement
Sleek, modern, futuristic, professional landing page for GUniverse — a pre-seed startup at the intersection of XR, spatial computing, and digital therapeutics. Dark-mode glassmorphism aesthetic with cyan/deep-indigo/electric-violet gradients and neon accents. Sections: header/nav, hero with 3D spatial canvas, problem & solution, core platform features grid, target markets, CTA banner with lead form, footer.

## Architecture
- Frontend: React 19 + Tailwind + framer-motion (scroll reveals, masked hero line reveal) + lenis (momentum smooth scroll) + three.js (interactive 3D particle/orbital hero canvas with mouse parallax)
- Backend: FastAPI, all routes under /api
- DB: MongoDB via MONGO_URL/DB_NAME env vars — `leads` collection stores pilot-access submissions
- Design tokens: /app/design_guidelines.json (deep space #050714, cyan #00f2fe, violet #8b5cf6; Outfit/Inter/JetBrains Mono)

## User Personas
- Healthcare providers / rehab center directors evaluating XR therapy pilots
- Medical institutions & enterprises exploring immersive training
- Investors reviewing traction and vision

## Core Requirements (static)
1. Sticky glass nav: Platform, Applications, Technology, Traction, About Us, Contact + "Request Pilot Access" CTA
2. Hero: headline, subheadline, Explore Platform / View Pitch Highlights CTAs, interactive 3D canvas
3. Problem & Solution section
4. Features grid: Spatial Therapeutics, WebXR compatibility, Interactive Learning, Data-Driven Insights
5. Target markets: Healthcare & Rehab Centers / Institutions & Enterprises (tabs)
6. CTA banner with lead form (Name, Email, Organization, Message)
7. Footer with links, LinkedIn, contact details

## Implemented (2026-09-19)
- Full landing page: Navbar (mobile menu), Hero (3D canvas, masked line-by-line reveal, scroll parallax), editorial marquee, numbered manifesto chapters (problem/solution), bento features grid, markets tabs with imagery, technology stack section, traction stats with animated counters, about section with parallax image, CTA lead form, footer
- Backend: POST /api/leads (validated, EmailStr), GET /api/leads
- Lead form verified end-to-end (UI submit → toast → success state → stored in MongoDB)
- All interactive elements carry data-testid attributes per design guidelines

## Implemented (2026-09-19, iteration 2)
- Email alerts: every pilot form submission triggers a branded notification email via Emergent-managed Resend proxy (verified 202 Accepted). Recipient is ADMIN_NOTIFY_EMAIL in backend/.env — currently the Resend test sink until the user provides a real inbox.
- Private Leads Dashboard at /admin: JWT cookie auth (access + refresh, httpOnly), bcrypt hashing, brute-force lockout (5 tries / 15 min), seeded admin, leads table with stats (total, orgs, latest). Footer "Admin" link.
- Pitch Highlights: hero button opens an animated 7-chapter investor pitch modal (Vision → The Ask) with ESC/backdrop close and CTA into the contact form.
- Logo: user will add manually — text logo retained; swap in Navbar.jsx `Logo` component (also used in footer & admin).
- Test playbook saved to /app/auth_testing.md; credentials in /app/memory/test_credentials.md.

## Backlog
- P0: User to provide real notification email for ADMIN_NOTIFY_EMAIL
- P1: Swap in real logo image, real social links
- P2: Downloadable pitch deck PDF, lead export (CSV), lead status tracking in dashboard

## Next Tasks
- Set ADMIN_NOTIFY_EMAIL to the user's real inbox and restart backend
- Replace Logo component content when logo file arrives
