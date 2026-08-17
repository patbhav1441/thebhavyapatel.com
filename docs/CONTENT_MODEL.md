# Content model

`src/content.config.ts` is the build-time source of truth. `public/admin/config.yml` mirrors it for editors; when adding a field, update both and add a validator when the rule crosses records.

## Global JSON

- `site.json`: identity, canonical URL, public contact links, optional resume/social image.
- `home.json`: hero, calls to action, selected-work count, current focus, summaries.
- `navigation.json`: primary and footer link lists.

## Projects

Projects live at `src/content/projects/<slug>/index.md`. Required metadata includes title, canonical slug, unique `BP-##` code, summary, real status, kind, visibility, review flags, order, accent, SEO description, and App Store readiness object. Body Markdown holds the narrative.

Rules enforced before build include:

- Slugs are lowercase kebab-case and may not collide with reserved static routes.
- Codes and public routes are unique.
- `published: true` is required for routing.
- Public content may not contain sample names, placeholder URLs, dummy metrics, or broken video IDs.
- App Store/legal readiness cannot be asserted when the supporting URLs or data decisions are absent.
- `case-study-only` projects are `noindex` and cannot advertise public availability.

Project media is colocated with the record. Every meaningful image needs alt text; decorative imagery should use an empty alt value in the component that renders it. Uploads are capped at 5 MB in the CMS.

## Nested project pages

Child records use `src/content/project-pages/<project>--<slug>.md` and produce `/<project>/<slug>/` only when published. Legal pages require an exact `YYYY-MM-DD` effective date and explicit review/readiness fields. Draft legal records remain editable but do not exist as public routes.

## Experience, education, credentials, and research

These collections hold migrated source material. Every current migrated record is `published: false` and `needsReview: true`; the public resume summarizes the review state rather than republishing potentially stale claims.

## Adding a field

1. Add the schema and useful error message in `src/content.config.ts`.
2. Add the corresponding Decap field in `public/admin/config.yml`.
3. Update renderers only when the field should be public.
4. Extend `scripts/validate-content.ts` for cross-record or conditional rules.
5. Run `npm run check`, `npm run build`, and `npm run test:e2e`.
