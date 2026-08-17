# Migration report

Migration date: 2026-08-17. Source baseline: legacy Create React App site at commit `e8f9a43`.

## Content migrated

- Identity, public contact, navigation, hero, and homepage direction into JSON.
- Six project records and routes: StuddyBuddy, Zargon, Stock Predictor, AI Therapist, FHS Checklist, and Vlogz.
- Six StuddyBuddy nested legal/support drafts, deliberately unpublished.
- 16 experience, two education, 10 credential, and three research records, deliberately unpublished pending review.

## Content omitted

- Two placeholder YouTube embeds.
- Unverified generic testimonials.
- General GitHub-profile URLs used as if they were project-specific links.
- Unverified metrics, availability claims, stale-date assertions, and private FHS details.
- A resume download because no reviewed PDF was supplied.

## Routes changed

The single JavaScript-rendered page became static `/`, `/work/`, `/about/`, `/resume/`, `/contact/`, `/admin/`, six project routes, generic future project/child routes, and a custom 404. Draft child pages do not generate routes.

## Redirects and canonical behavior

`public/_redirects` normalizes common non-trailing-slash routes. Canonical metadata uses `https://www.thebhavyapatel.com`. The apex-to-`www` redirect remains a Cloudflare cutover action because the current production deployment must not be disturbed before preview acceptance.

## Media

No useful verified project media existed to migrate. The new project-local media convention and alt-text fields are ready. No large video was copied.

## Code and infrastructure

The Astro project now owns the repository root. The old app remains in `bhavya-portfolio/` for comparison and is also preserved by `legacy/react-cra` and `pre-astro-migration-2026-08-17`. Removal is intentionally deferred until production stabilization.

Added: schema validation, Decap CMS, OAuth Worker, Workers Static Assets config, security headers, sitemap, robots, CI, Dependabot, unit/browser/accessibility tests, and operational documentation.

## Remaining manual decisions

- Review migrated factual records and selectively publish them.
- Supply approved images, alt text, project URLs, a reviewed resume, and any authorized testimonials.
- Complete StuddyBuddy/Vlogz product, privacy, moderation, support, deletion, and App Store decisions.
- Complete GitHub OAuth credentials, Cloudflare Git automation, CMS acceptance, and production cutover actions. An isolated Cloudflare review snapshot is already deployed without production domains.
