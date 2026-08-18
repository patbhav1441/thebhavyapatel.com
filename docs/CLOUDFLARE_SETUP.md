# Cloudflare setup

## Workers

| Purpose                         | Worker                       | Config                             | Output        |
| ------------------------------- | ---------------------------- | ---------------------------------- | ------------- |
| Isolated review snapshot        | `thebhavyapatel-com-preview` | Review-only deployment             | `dist/`       |
| Git-driven production candidate | `thebhavyapatel-com`         | `/wrangler.jsonc`                  | `dist/`       |
| Decap GitHub OAuth              | `thebhavyapatel-cms-auth`    | `/workers/cms-auth/wrangler.jsonc` | Worker module |

The current production domains point to the separate legacy `officialweb` Worker. Keep it and its last good deployment until the rebuilt site and CMS workflow pass preview acceptance.

The isolated snapshot is available at `https://thebhavyapatel-com-preview.patelbhavya216.workers.dev`. It contains the verified build from commit `38f20f0`, has no custom domains, and is intentionally not the automatic deployment path. Use Workers Builds with the root Wrangler configuration for ongoing Git-driven preview and production releases.

## Static build settings

Connect `patbhav1441/thebhavyapatel.com` to the new public Worker with:

- Production branch: `main`
- Root directory: `/` (repository root)
- Build command: `npm ci && npm run build`
- Deploy command: `npx wrangler deploy`
- Build output: `dist` (declared in Wrangler)
- Node version: `24` (also pinned by `.nvmrc`)
- Non-production branch builds: enabled

Invalid content fails before deployment. Cloudflare should keep serving the previous successful version.

## Preview-first release

1. Deploy both Workers without attaching the production domains.
2. Open the Cloudflare-provided preview URL and verify every public route, headers, sitemap, 404, theme, mobile navigation, and console.
3. Attach `auth.thebhavyapatel.com` only to the OAuth Worker and verify `/health`.
4. Test GitHub login, a controlled CMS commit, automatic build, preview update, and revert.
5. Only after acceptance, attach `www.thebhavyapatel.com` to `thebhavyapatel-com`.
6. Redirect apex `thebhavyapatel.com` to the canonical `www` HTTPS URL, preserving path and query.
7. Verify TLS, canonical tags, robots, sitemap, and both hosts externally.

## Rollback

If the new public version fails, use Workers & Pages → `thebhavyapatel-com` → Deployments to roll back to a known-good version. If the failure involves routing or the new Worker itself, remove the canonical custom-domain association from it and reattach the domain to preserved `officialweb`. Do not delete either Worker during the stabilization period.

If OAuth fails, roll back only `thebhavyapatel-cms-auth`; the public site does not depend on it. Revoke compromised GitHub OAuth credentials immediately.

Exact dashboard and verification steps are in `MANUAL_ACTIONS.md`.
