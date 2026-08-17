# Quality report

Measured 2026-08-17 on Node 24.19.0. The public build was served locally from `dist/`; Lighthouse 13.4.1 used its default mobile throttling.

## Automated gates

- `npm run check`: passed; formatting, ESLint, Astro diagnostics, Worker TypeScript, content/route/placeholder validators, and 14 Vitest tests.
- `npm run build`: passed; 13 HTML pages, sitemap, static files, and draft-route smoke checks.
- `npm test`: passed; four files and 14 tests.
- `npm run test:e2e`: passed; 37 checks and one intentional desktop skip across Chromium and mobile WebKit.
- `npm run deploy:dry`: passed; 44 static assets packaged.
- `npm run deploy:auth:dry`: passed; OAuth Worker packaged with only its non-secret allowed-origin binding.

Playwright covers every public route, canonical metadata, exactly one H1, console and uncaught page errors, mobile menu focus return, keyboard/hover parity, reduced motion, horizontal overflow, draft legal-route exclusion, custom 404, admin `noindex`, the rendered GitHub login screen, and serious/critical axe findings.

## Cloudflare review snapshot

Commit `38f20f0` is deployed to the isolated Worker `thebhavyapatel-com-preview` at `https://thebhavyapatel-com-preview.patelbhavya216.workers.dev`. The public route matrix returned 200 for all core and project routes, while an unknown route and the draft StuddyBuddy privacy route returned 404. Remote Chromium loaded `/` and `/admin/` without console or uncaught page errors, and the admin rendered the GitHub login control. Public, immutable-asset, and admin-specific security headers matched the repository policies.

The snapshot has no custom domains. Cloudflare still reports `thebhavyapatel.com` and `www.thebhavyapatel.com` only on the preserved `officialweb` Worker, whose deployment timestamp remains unchanged. The snapshot is a durable review artifact, not a substitute for the Git-triggered deployment configured in `MANUAL_ACTIONS.md`.

## Lighthouse

| Page            | Performance | Accessibility | Best Practices | SEO |
| --------------- | ----------: | ------------: | -------------: | --: |
| `/`             |          96 |           100 |            100 | 100 |
| `/studdybuddy/` |         100 |           100 |            100 | 100 |

All four categories meet the required minimum score of 95. Homepage Speed Index was 5.2 s under simulated mobile throttling because the intentional handwriting animation completes over time; LCP was 1.5 s, total blocking time 0 ms, and CLS 0. Reduced-motion mode resolves the drawing immediately.

## Delivery footprint

The full deployment is about 6.1 MB. Decap CMS belongs only to `/admin/` and uses selective, runtime-safe chunking; the largest generated asset is about 4.42 MB, below the 5 MiB limit encountered by Cloudflare's temporary preview account. Public pages do not request those modules. Public interactivity is implemented as small inline scripts with static HTML/CSS as the primary delivery.

## Security and dependency review

Source scanning found no real token, OAuth secret, cloud key, or private key. Unit tests use unmistakable dummy strings such as `client-secret` and `state-secret`; secret names appear only in types, tests, and setup documentation.

`npm audit --omit=dev` reports 31 high findings that reduce to three upstream denial-of-service advisories in Decap CMS's old `immutable@3.8.4` and `trim@0.0.1` dependency graph. `decap-cms-app@3.15.1` is the current pinned release and npm reports no safe direct fix. Forcing `immutable` across a major version could break Decap and was not done. Exposure is limited to the isolated, `noindex`, `no-store`, repository-authorized admin UI; the public route bundle does not load Decap. Dependabot will surface a compatible upstream repair. This exception should be rechecked before production cutover and after every Decap update.

The production build warning about direct `eval` and the large chunk also originates inside Decap/Markdown editor dependencies and is confined to the admin entrypoint. Its Ajv schema validator requires runtime code generation, so `unsafe-eval` is permitted only by the `/admin/*` CSP; public pages retain the stricter policy.

## Link review

The configured GitHub profile returned HTTP 200. LinkedIn blocks unauthenticated automation (HTTP 999); the in-app browser reached LinkedIn's auth wall with the exact profile URL preserved as its post-login destination. Project-specific external links are intentionally omitted until verified rather than replaced with generic profile URLs.
