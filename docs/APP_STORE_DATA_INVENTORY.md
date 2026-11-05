# App Store data inventory

Complete this with the current application and backend before publishing legal language or answering store privacy questionnaires. Unknown is not equivalent to none.

## Per-product summary

| Product                  | Candidate             | Inventory status                   | Public claim allowed                   |
| ------------------------ | --------------------- | ---------------------------------- | -------------------------------------- |
| FHS Checklist            | yes                   | verified for version 1.0           | Privacy and support claims only        |
| StuddyBuddy              | yes                   | incomplete                         | No; legal/readiness flags remain false |
| Vlogz                    | possible              | not started                        | No verified store or privacy claim     |
| Other portfolio projects | no current indication | not applicable until scope changes | No store claim                         |

## SDK and service register

Create one row for every first-party service, third-party SDK, API, analytics tool, crash reporter, ad network, authentication provider, AI model/provider, payment service, push provider, storage system, and support tool.

| Product       | SDK/service                    | Version | Purpose                                                                     | Data collected                                                                                                                  | Linked to identity?         | Tracking? | Processor/controller                                    | Retention                                                                                  | Deletion path                                                           | Encryption                                  | Region         | Policy URL                | Verified by/date                                  |
| ------------- | ------------------------------ | ------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | --------------------------- | --------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------- | ------------------------------------------- | -------------- | ------------------------- | ------------------------------------------------- |
| FHS Checklist | Supabase                       | Hosted  | Authentication, database, private task-photo storage, and server functions  | Name, username, role/business-location access, checklist interaction, task photos, device tokens, service security records      | Yes                         | No        | Processor                                               | Identifying task details and photos: 7 days; active account data while access is needed    | Scheduled hosted retention worker and authorized account administration | HTTPS in transit; hosted encryption at rest | Hosted service | `/fhs-checklist/privacy/` | Repository and hosted project audit, 2026-08-18   |
| FHS Checklist | Apple iOS, APNs, and App Store | iOS 17+ | App distribution, optional notifications, and progress-only Live Activities | Device push and Live Activity tokens plus delivery metadata; Apple separately processes App Store account and distribution data | Yes for app delivery tokens | No        | Independent platform provider / processor as applicable | According to Apple platform operation; app-side tokens revoked when invalid or access ends | Device settings, app token revocation, and provider controls            | Apple platform transport security           | Apple platform | `/fhs-checklist/privacy/` | iOS source and Apple capability audit, 2026-08-18 |
| StuddyBuddy   | _TBD_                          | _TBD_   | _TBD_                                                                       | _TBD_                                                                                                                           | _TBD_                       | _TBD_     | _TBD_                                                   | _TBD_                                                                                      | _TBD_                                                                   | _TBD_                                       | _TBD_          | _TBD_                     | _TBD_                                             |
| Vlogz         | _TBD_                          | _TBD_   | _TBD_                                                                       | _TBD_                                                                                                                           | _TBD_                       | _TBD_     | _TBD_                                                   | _TBD_                                                                                      | _TBD_                                                                   | _TBD_                                       | _TBD_          | _TBD_                     | _TBD_                                             |

## Reelo — version 1.0 build 3, 2026-11-05

- **Local app data:** selected video files with original audio, video names, Instagram post URLs, playlist names/order, and remembered Saved-page URL. Kept in app storage until removed; may be included in Apple device backups. The app has no backend, analytics SDK, advertising SDK, push service, account-registration system, or cloud-sync service. Source: `App/LibraryStore.swift`, `Sources/LoopCore/Library.swift`, and the shipping target configuration in the Reelo workspace.
- **Instagram/Meta website:** optional user-initiated WKWebView navigation communicates directly with Meta. Persistent WebKit website storage maintains its session. Instagram receives its own login credentials and web requests under Meta's policy. The app's isolated automation reads rendered anchors/text and controls rendered HTML video; it does not read password values, cookies, tokens, private API responses, or download media. Source: `App/Instagram/InstagramSession.swift` and `InstagramAutomation.js`. This website can include Meta analytics or tracking and must not be represented as an app-wide guarantee of no third-party collection.
- **Deletion:** removing a reel removes its imported file and playlist references; removing a playlist keeps media. Sign-out removes this app's relevant Meta/Instagram WebKit records. Uninstall removes app storage; Apple backups and Meta account data are managed through their respective services.
- **Support:** user-initiated emails to the developer's iCloud support address contain the sender's address, message, and optional attachments, used to respond; deletion can be requested subject to retention obligations. No credentials or private media are requested.
- **Website:** Cloudflare serves public project/support/privacy pages and may process request/security metadata. No Reelo app library is uploaded to the website.

The privacy and support documents describe this implementation. Public-review authorization, age rating, and App Privacy disclosure assessment remain separate from publishing these factual pages.

## Data-flow questions

For each product answer and retain evidence for:

- Account identifiers, profile fields, authentication tokens, contacts, course/school data, precise/coarse location, device IDs, IP/log data, user content, messages, photos/video/audio, search history, diagnostics, purchase data, and AI prompts/outputs.
- Source, purpose, consent/legal basis, destination, access roles, encryption, retention period, backups, exports, correction, deletion, legal holds, and incident response.
- Whether data is used for tracking, advertising, profiling, model training, personalization, or eligibility decisions.
- Whether users can interact publicly, privately, anonymously, or in person; how reports, blocks, moderation, and emergencies work.
- Whether minors may use the product and how age, guardian consent, and child-safety requirements are handled.
- Whether deletion is self-service, authenticated web-assisted, or support-assisted; which data remains and why.
- Whether App Store privacy answers and website policies match the exact shipping binary and backend configuration.

## Change control

Re-run this inventory before every store submission and whenever an SDK, permission, endpoint, data field, AI provider, analytics destination, retention rule, or account-deletion behavior changes.
