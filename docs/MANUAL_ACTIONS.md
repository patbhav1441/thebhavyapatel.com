# Manual actions

Only credential- or dashboard-dependent actions are listed here. Complete them in order. Do not attach the production `www` domain until preview and CMS acceptance pass.

## 1. Create the GitHub OAuth App

- Dashboard: GitHub → avatar → Settings → Developer settings → OAuth Apps → New OAuth App.
- Application name: `thebhavyapatel.com CMS`.
- Homepage URL: `https://www.thebhavyapatel.com`.
- Authorization callback URL: `https://auth.thebhavyapatel.com/callback`.
- Record: generated Client ID and Client Secret; never place the secret in Git or a screenshot.
- Verify: GitHub shows the callback exactly, including HTTPS and `/callback`.
- Rollback: revoke/delete this OAuth App; CMS login stops, public site remains unaffected.

## 2. Deploy and secret the OAuth Worker

- Dashboard: Cloudflare → Workers & Pages → Create → Worker, or use Wrangler while signed into the correct account.
- Worker name: `thebhavyapatel-cms-auth`.
- Commands from repository root:

```bash
npm run deploy:auth
npx wrangler secret put GITHUB_CLIENT_ID --config workers/cms-auth/wrangler.jsonc
npx wrangler secret put GITHUB_CLIENT_SECRET --config workers/cms-auth/wrangler.jsonc
npx wrangler secret put OAUTH_STATE_SECRET --config workers/cms-auth/wrangler.jsonc
```

Use the OAuth App values for the first two. For `OAUTH_STATE_SECRET`, enter a new high-entropy random secret of at least 32 bytes.

- Verify: open the Worker preview `/health`; expect an OK JSON response. Then check Workers & Pages → Worker → Settings → Variables and Secrets and confirm all three names are encrypted.
- Rollback: Workers & Pages → Worker → Deployments → roll back the version, or delete only this new Worker before it is relied upon; revoke the GitHub OAuth secret if exposed.

## 3. Attach the auth custom domain

- Dashboard: Cloudflare → Workers & Pages → `thebhavyapatel-cms-auth` → Settings → Domains & Routes → Add → Custom Domain.
- Value: `auth.thebhavyapatel.com`.
- Verify: `https://auth.thebhavyapatel.com/health` returns OK over valid TLS; an unrelated origin passed as `site_id` to `/auth` is rejected.
- Rollback: remove this custom domain association; the public website is unaffected.

## 4. Connect the static preview Worker to GitHub

- Dashboard: Cloudflare → Workers & Pages → Create application → Import a repository / Git integration.
- Repository: `patbhav1441/thebhavyapatel.com`.
- Worker/project name: `thebhavyapatel-com` (must match root `wrangler.jsonc`).
- Production branch: `main`.
- Root directory: `/` or blank repository root.
- Build command: `npm ci && npm run build`.
- Deploy command: `npx wrangler deploy`.
- Node environment variable: `NODE_VERSION=24` if Cloudflare does not honor `.nvmrc` automatically.
- Preview deployments for non-production branches: enabled.
- Verify: deploy `rebuild/astro-cms`; the build passes and the Cloudflare preview URL serves `/`, `/studdybuddy/`, `/admin/`, `/sitemap-index.xml`, and the custom 404. Confirm a deliberately invalid test record fails without replacing the prior preview.
- Rollback: disconnect the Git repository or roll back this new Worker's deployment. Do not change `officialweb` or either production domain.

## 5. Complete real CMS acceptance on preview

- Dashboard: GitHub OAuth authorization screen, Decap at the preview `/admin/`, GitHub repository commits, and Cloudflare build history.
- Exact test: follow `docs/CMS_SETUP.md` → Controlled acceptance test.
- Verify: login succeeds; one controlled edit creates a Git commit; Cloudflare deploys it; a revert deploys; temporary project route appears and then disappears.
- Rollback: revert the test commit(s), remove temporary content, revoke the OAuth grant under GitHub Settings → Applications if authorization behavior is suspicious, and roll back the OAuth Worker if necessary.

## 6. Review and publish factual/legal content

- Files/dashboard: Decap collections or `src/content/` in GitHub.
- Exact values: replace unknowns with verified facts; set `needsReview: false` only with evidence; set `published: true` only after page review; set legal/readiness booleans only when the operational requirement is actually satisfied.
- Verify: `npm run check`, `npm run build`, and preview review all pass; App Store pages work without login and match the shipping product.
- Rollback: set `published: false` or revert the content commit; never solve uncertainty by weakening validators.

## 7. Production cutover after acceptance

- Dashboard: Cloudflare → Workers & Pages → `thebhavyapatel-com` → Settings → Domains & Routes.
- Custom domain: `www.thebhavyapatel.com`.
- Redirect: Cloudflare Rules → Redirect Rules → Single Redirect from apex `thebhavyapatel.com/*` to `https://www.thebhavyapatel.com/${path}` with query string preserved and permanent status.
- Verify: apex HTTP/HTTPS permanently redirects to canonical `www`; `www` returns valid TLS and expected security headers; canonical tags, robots, sitemap, 404, every public route, admin login, CMS publish, and rollback all work externally.
- Rollback: remove `www` from the new Worker, reattach it to preserved `officialweb`, disable the apex redirect if it prevents legacy routing, and confirm the legacy home page. Keep `officialweb` until a separately chosen stabilization period has passed.
