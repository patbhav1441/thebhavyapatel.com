# CMS setup and use

The editor is available at `/admin/`. It edits Git-backed Markdown and JSON; it does not bypass validation.

## Local use

Run in separate terminals:

```bash
npm run dev
npm run dev:cms
```

Open `http://localhost:4321/admin/`. The local proxy is for development only and must not be deployed.

## Production use

1. Complete `CMS_AUTH_SETUP.md` and the matching entries in `MANUAL_ACTIONS.md`.
2. Open `https://www.thebhavyapatel.com/admin/` only after preview acceptance.
3. Log in with the GitHub account that can write `patbhav1441/thebhavyapatel.com`.
4. Edit an existing record or create a project.
5. Leave `published` false until facts, media, links, and readiness fields have been reviewed.
6. Publish. Decap commits to `main`; the Cloudflare build is the validation boundary.

## Add a project

Use Projects → New Project. Supply a unique kebab-case slug and `BP-##` code, honest status, summary, SEO description, and review flags. Images are stored beside `index.md`; keep each upload under 5 MB and write meaningful alt text. Set `published: true` only when the route is ready.

## Add a legal or support page

Use Project pages → New Project page and select its parent project. Keep legal pages draft until counsel/owner review is complete, use an exact effective date, complete the App Store/data decisions, and set the readiness fields truthfully. A drafted file alone does not satisfy an account-deletion operational requirement.

## Controlled acceptance test

After preview deployment and real OAuth setup:

1. Log in and edit a harmless homepage phrase.
2. Publish and confirm a commit from Decap appears on `main`.
3. Confirm the Cloudflare build runs and preview changes.
4. Revert the edit through CMS or Git; confirm the revert deploys.
5. Create a temporary `cms-route-test` project with `published: true`; confirm `/cms-route-test/` appears.
6. Set it to false; confirm the route returns 404 after the next successful build.
7. Delete the temporary record.

Do not run the route test on the production domain until preview acceptance. Do not require pull requests on `main` while Decap simple publishing is in use.

## Restore content

Revert the relevant CMS-created commit in Git, then let Cloudflare rebuild. Never edit generated `dist/` files as a source of truth.
