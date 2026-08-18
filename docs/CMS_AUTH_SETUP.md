# CMS GitHub OAuth Worker

The Worker at `workers/cms-auth/` implements Decap's GitHub popup protocol without exposing the GitHub client secret to the browser.

## Routes

- `GET /health` — no-secret health response.
- `GET /auth?site_id=...` — validates the site, sets signed short-lived state, redirects to GitHub.
- `GET /callback?code=...&state=...` — verifies cookie/state, exchanges the code, and posts the result to the exact opener origin.

All other routes return 404. Success and failure pages use `no-store`, a restrictive CSP, `noopener` behavior, exact `postMessage` target origins, and generic user-facing failures. The Worker limits OAuth response parsing and never logs secrets or token-bearing parameters.

## Configuration

Non-secret config is in `workers/cms-auth/wrangler.jsonc`:

- Worker: `thebhavyapatel-cms-auth`
- Compatibility date: `2026-08-17`
- Allowed production origin: `https://www.thebhavyapatel.com`
- Intended custom host: `auth.thebhavyapatel.com`

Required encrypted secrets:

- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`
- `OAUTH_STATE_SECRET` — a high-entropy random value, independent of GitHub credentials

For local direct testing only, copy `.dev.vars.example` to `.dev.vars` inside `workers/cms-auth/` and fill it locally. `.dev.vars` is ignored by Git.

## Verification

```bash
npm run check:worker
npm run test
npm run deploy:auth:dry
```

After deployment, verify `/health`, then perform the full popup login and CMS commit test from `CMS_SETUP.md`. A health response proves routing only; it does not prove GitHub OAuth or repository write permission.

## Secret rotation

Create a new GitHub secret, update the Worker secret, verify login, then revoke the old secret. Rotating `OAUTH_STATE_SECRET` invalidates outstanding login attempts but not completed GitHub sessions.
