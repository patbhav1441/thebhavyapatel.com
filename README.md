# thebhavyapatel.com

Bhavya Patel's Git-backed portfolio and project system. The public website is a static Astro build; Decap CMS edits the same Markdown and JSON records through GitHub; Cloudflare Workers serves the static assets and a separate Worker completes GitHub OAuth for the CMS.

Production remains on the preserved legacy Worker until the preview and CMS acceptance tests in `docs/MANUAL_ACTIONS.md` pass.

## Requirements

- Node.js 24 (see `.nvmrc`)
- npm

## Local development

```bash
nvm use
npm ci
npm run dev
```

Open `http://localhost:4321/`. To edit through Decap locally, run the site and proxy in separate terminals:

```bash
npm run dev
npm run dev:cms
```

Then open `http://localhost:4321/admin/`.

## Quality gates

```bash
npm run check
npm run build
npm run test:e2e
npm run deploy:dry
npm run deploy:auth:dry
```

`npm run build` produces `dist/`. Draft records, reserved slugs, invalid readiness combinations, placeholder content, and conflicting routes fail before deployment.

## Content editing

- Global identity, homepage, and navigation: `src/data/`
- Projects and nested project pages: `src/content/`
- Browser editor: `/admin/`
- CMS schema: `public/admin/config.yml`

Projects are folder records at `src/content/projects/<slug>/index.md`. A public route is created only when `published: true`. Nested pages use `src/content/project-pages/<project>--<page>.md`; legal pages additionally require reviewed dates and readiness flags before publication.

See `docs/CMS_SETUP.md` for editor workflows and `docs/CONTENT_MODEL.md` for the field contract.

## Deployment

- Isolated review snapshot: `https://thebhavyapatel-com-preview.patelbhavya216.workers.dev`
- Public site Worker: `thebhavyapatel-com` from root `wrangler.jsonc`
- CMS OAuth Worker: `thebhavyapatel-cms-auth` from `workers/cms-auth/wrangler.jsonc`
- Canonical site: `https://www.thebhavyapatel.com`
- Intended auth host: `https://auth.thebhavyapatel.com`

No OAuth secret belongs in Git. Complete the credential and Cloudflare dashboard steps in `docs/MANUAL_ACTIONS.md`; architecture and rollback details are in `docs/CLOUDFLARE_SETUP.md` and `docs/CMS_AUTH_SETUP.md`.

## Recovery

The pre-migration site is preserved by the annotated tag `pre-astro-migration-2026-08-17` and branch `legacy/react-cra`. Cloudflare's existing `officialweb` Worker must remain available until the rebuilt site is accepted in production.

## Documentation

- `docs/ARCHITECTURE.md` — request, content, and deploy flows
- `docs/CONTENT_AUDIT.md` — migration inventory and decisions
- `docs/MIGRATION_REPORT.md` — what moved, changed, or remains
- `docs/CMS_SETUP.md` — editing and controlled acceptance tests
- `docs/CMS_AUTH_SETUP.md` — OAuth Worker design and secrets
- `docs/CLOUDFLARE_SETUP.md` — build/deploy/cutover/rollback
- `docs/APP_STORE_WEBSITE_CHECKLIST.md` — candidate-specific website readiness
- `docs/APP_STORE_DATA_INVENTORY.md` — SDK and data-flow questionnaire
- `docs/MANUAL_ACTIONS.md` — credential-only work with verification and rollback
