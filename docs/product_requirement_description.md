Product Requirements Document – Harvard East Asian Center “Teaching Tips” Digital Booklet

(React web application)

⸻

1. Executive Summary

A lightweight, responsive web app that presents a curated “digital booklet” of short teaching tips written by professors affiliated with the Harvard East Asian Center (HEAC). Each professor is showcased with a portrait, bio snippet, and their advice for PhD students. The product will be built with React and deployed as a static site (Jamstack) for simplicity and speed.

⸻

2. Goals & Success Metrics

Goal	Metric	Target (90 days post‑launch)
Share HEAC faculty wisdom with PhD community	Unique visitors	≥ 1 000
Encourage reading completion	Avg. scroll‑depth / page	≥ 75 %
Increase mailing‑list opt‑ins (optional CTA)	Conversion rate	≥ 15 %
Demonstrate HEAC brand quality online	User satisfaction survey (1–5)	≥ 4.5



⸻

3. User Personas & Primary Scenarios

Persona	Needs & Pain Points	Key Scenario
PhD Student Mei (24)	Wants credible, concise teaching advice; limited time.	Browses booklet on mobile while commuting; saves favorite tips.
Professor Lee (45)	Wants tips presented professionally.	Shares own page link with students; edits tip via CMS (phase 2).
HEAC Admin Olivia (32)	Needs easy content updates.	Uploads new professor’s tip and portrait via CMS dashboard (phase 2).



⸻

4. Detailed Requirements

4.1 Epics & User Stories

Epic	User Story (As a …, I want …)	Priority
Content Browsing	… to view list of professors and select one to read their tip.	Must
Responsive UI	… the booklet to render beautifully on desktop, tablet, mobile.	Must
Search / Filter	… to quickly find a professor by name or keyword.	Should
Shareability	… to copy a share link to a professor’s tip.	Should
Favorites (local)	… to bookmark tips I like for quick access.	Could
Admin CMS (phase 2)	… to add/edit professor entries without code changes.	Won’t (v1)

4.2 Acceptance Criteria (sample)

Given a visitor on the home page
When they click a professor card
Then the app navigates to a detail page displaying portrait (alt‑text), bio, and tip body.

(Full Gherkin table in Appendix A)

4.3 Functional Specs (MoSCoW)

Feature	Must	Should	Could	Won’t (v1)
Static professor list (JSON/YAML)	✔			
Detail page per professor	✔			
Global search bar		✔		
Bookmark (localStorage)			✔	
CMS interface				✔

4.4 Non‑Functional
	•	Performance: LCP < 2 s on 3G; bundle < 200 KB gzipped.
	•	Accessibility: WCAG 2.2 AA; keyboard navigation, alt‑text for portraits.
	•	Security: HTTPS, no PII stored; CSP headers via host.
	•	SEO/Analytics: OpenGraph tags; GA4 page‑view tracking.

⸻

5. UX / UI Guidance

Layer	Description
Information Architecture	/ list → /prof/:slug detail → optional /about
Visual Style	Harvard crimson accent (#A41034), serif headings, generous white space.
Components	ProfessorCard, TipDetail, SearchBar, BookmarkButton, Header, Footer.
Wireframes	Designer to supply mobile‑first Figma frames for list & detail views.
Interactions	Fade‑in portrait, smooth scroll between sections, bookmark icon toggle.
Content Rules	Tip length ≤ 120 words; bio ≤ 40 words; alt‑text “Portrait of Prof. X”.



⸻

6. Technical Architecture Overview

Layer	Stack / Notes
Frontend	React 18 (Vite), React Router, Tailwind CSS, Zustand (state)
Build/Deploy	Static export to Netlify or Vercel; CI via GitHub Actions.
Data	professors.json bundled at build (v1); migrate to headless CMS (phase 2).
API Contracts	None for v1 (static). Phase 2 REST /api/professors (GET/POST…).
Images	Portraits optimized to ≤ 120 KB, WebP + 2× retina; stored in /public/img.
Analytics	Google Analytics 4 page‑view and custom “TipShare” event.



⸻

7. Assets & Artefacts Needed for Engineering
	1.	Final hi‑fi Figma files with component specs & redlines.
	2.	Design tokens (color palette, typography scale, spacing).
	3.	Portrait images 1:1 aspect, min 800 × 800 px, WebP + source JPEG.
	4.	Copy deck: professor names, bios, tips (CSV/Google Sheet).
	5.	SVG icons (bookmark, share, search).
	6.	Favicons & social preview (1200×630).
	7.	Accessibility checklist signed‑off by designer.
	8.	Environment variables list (GA4 ID, deploy preview URL).
	9.	CI/CD README (build commands, environment setup).

⸻

8. Delivery Plan & Milestones

Phase	Owner	Start	End	Deliverable
Discovery & content finalization	PM + HEAC	2025‑05‑10	05‑17	Locked professor list & copy
UX/UI design	UI/UX	05‑18	05‑31	Hi‑fi Figma & assets
Front‑end implementation	FE Eng	06‑01	06‑21	Functional MVP (v1)
QA & accessibility audit	QA	06‑22	06‑28	Bug‑free, WCAG‑AA pass
Launch	PM	06‑30	06‑30	Live site on principal domain
Post‑launch analytics review	PM	07‑30	07‑30	Metrics report



⸻

9. Risks & Assumptions

Risk	Impact	Mitigation
Late delivery of portraits or copy	Launch slip	Set 05‑17 hard cutoff; use placeholder silhouettes.
Scope creep (CMS)	Time & budget overrun	Defer CMS to phase 2; document clear v1 scope.
Low mobile performance	Poor UX	Enforce strict bundle budget; Lighthouse audits.
Brand guideline conflicts	Re‑work	Early design reviews with HEAC comms.



⸻

10. Appendices
	•	Appendix A: Full Gherkin acceptance‑criteria table (download separately).
	•	Appendix B: Proposed OpenAPI schema for future CMS.
	•	Appendix C: Accessibility test script.

⸻

Next steps for you (PM/PO):
	1.	Validate professor list, copy, and images are ready by May 17, 2025.
	2.	Review & sign off UX wireframes once delivered.
	3.	Confirm hosting choice (Netlify vs Vercel) and DNS access.
	4.	Decide whether CMS work begins in phase 2 (budget permitting).

Feel free to ask for changes or deeper detail in any section!