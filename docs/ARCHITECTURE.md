# Architecture

## System boundaries

The public site is an Astro 7 static build. It has no application server, database, analytics, forms, account system, or runtime dependency on the CMS. Cloudflare Workers Static Assets serves `dist/` using the root `wrangler.jsonc`.

Content lives in Git:

- Schema-validated Markdown collections: `src/content/`
- Schema-validated global JSON: `src/data/`
- CMS editing schema: `public/admin/config.yml`

Decap CMS is bundled only on `/admin/`. It authenticates through the separate `thebhavyapatel-cms-auth` Worker, then commits authorized edits directly to `main` in `patbhav1441/thebhavyapatel.com`. A Cloudflare Git build validates, builds, and deploys the commit. A failed validation or build must leave the previous successful deployment active.

## Request flow

1. A visitor requests the canonical `www` host.
2. Cloudflare serves a prebuilt HTML route and immutable hashed assets.
3. `_headers` supplies security and caching headers; `_redirects` canonicalizes routes.
4. No private data or draft legal page is required at runtime.

## Editor flow

1. An editor opens `/admin/` and selects GitHub login.
2. Decap opens `https://auth.thebhavyapatel.com/auth`.
3. The OAuth Worker validates the exact site origin, creates signed short-lived state, and redirects to GitHub.
4. GitHub calls `/callback`; the Worker verifies the state cookie and exchanges the code server-side.
5. The Worker posts the token only to the exact allowed opener origin using Decap's expected message protocol.
6. Repository permissions remain the final authorization boundary.

The Worker keeps no session database and logs no authorization code, access token, client secret, or signed state.

## Route generation

Static pages are in `src/pages/`. Published project records produce `/<project>/`. Published child records produce `/<project>/<page>/`. Drafts produce no route. Duplicate and reserved slugs fail validation.

## Failure and rollback model

- Invalid content: build fails before deploy; prior Cloudflare version remains live.
- OAuth failure: public site is unaffected; editor sees a generic error.
- Static deploy regression: roll back the new Worker version or reattach the canonical domain to preserved `officialweb`.
- Content regression: revert the CMS-created Git commit, allowing the same pipeline to redeploy.

The legacy implementation is recoverable from `legacy/react-cra` and `pre-astro-migration-2026-08-17`.
