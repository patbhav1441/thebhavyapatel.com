# App Store website checklist

This is a readiness record, not legal advice. Creating a URL does not by itself satisfy privacy, deletion, moderation, support, safety, or store-policy obligations.

## FHS: To do list

Current state: the sanitized marketing page and public privacy policy are published in the site source. The existing contact page is the support URL. The App Store release remains gated on the final binary, production APNs/Live Activity verification, a sanitized review account, and App Store Connect review fields.

- [x] Marketing route: `/fhs-checklist/` with `/fhschecklist` compatibility redirect.
- [x] Privacy route: `/fhs-checklist/privacy/` with `/fhs-privacy` compatibility redirect.
- [x] Support route: `/contact/` and verified support email.
- [x] Data and processor inventory aligned with the shipping iOS source and Supabase deployment.
- [x] Seven-day identifying task-detail and photo deletion documented and backed by the hosted retention worker.
- [ ] Verify production APNs notifications and remote Live Activity updates on physical devices.
- [ ] Create a sanitized App Review account and keep its credentials only in App Store Connect.
- [ ] Recheck the published URLs after every deployment and before every App Store submission.

## StuddyBuddy

Current state: technical route architecture exists; all six nested documents are drafts, excluded from search, and absent from the public build. `legalReady`, `accountDeletionReady`, `moderationReady`, and `supportReady` remain false.

- [ ] Confirm legal owner/entity and authoritative contact address.
- [ ] Complete data-flow and SDK inventory.
- [ ] Obtain review of privacy policy and terms.
- [ ] Confirm age gating, child/minor handling, and jurisdiction scope.
- [ ] Define user-generated-content moderation, blocking, reporting, escalation, and response targets.
- [ ] Define in-person meeting safety guidance and incident response.
- [ ] Provide a staffed support channel and response expectations.
- [ ] Implement account deletion in the product/backend, including authentication and retention exceptions.
- [ ] Verify the public deletion URL explains the real working process.
- [ ] Publish community guidelines and safety material only after operational controls exist.
- [ ] Confirm store listing URLs exactly match the canonical published pages.
- [ ] Test all public pages without login on desktop and mobile.

Planned routes, still draft: `/studdybuddy/privacy/`, `/studdybuddy/terms/`, `/studdybuddy/support/`, `/studdybuddy/delete-account/`, `/studdybuddy/community-guidelines/`, and `/studdybuddy/safety/`.

## Vlogz

Current state: public portfolio case-study route only; no verified store availability or legal/support readiness is claimed.

- [ ] Decide whether Vlogz is an App Store candidate.
- [ ] Confirm account creation, UGC, social features, messaging, AI, media capture, and third-party SDKs.
- [ ] Complete the data inventory.
- [ ] Add reviewed privacy, terms, support, deletion, community, and safety pages as actually required.
- [ ] Confirm the product and backend implement every described user control.
- [ ] Supply and verify store listing URLs only after publication.

## Other projects

Re-evaluate this record before changing any other project's App Store availability or readiness flags.

## Release evidence

For each candidate retain: reviewer/owner approval date, policy effective date, public URL screenshots, unauthenticated link test, deletion-flow test, support inbox test, moderation test, SDK inventory revision, and the Git commit deployed to the store-facing domain.
