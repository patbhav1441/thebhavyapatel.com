# App Store data inventory

Complete this with the current application and backend before publishing legal language or answering store privacy questionnaires. Unknown is not equivalent to none.

## Per-product summary

| Product                  | Candidate             | Inventory status                   | Public claim allowed                   |
| ------------------------ | --------------------- | ---------------------------------- | -------------------------------------- |
| StuddyBuddy              | yes                   | incomplete                         | No; legal/readiness flags remain false |
| Vlogz                    | possible              | not started                        | No verified store or privacy claim     |
| Other portfolio projects | no current indication | not applicable until scope changes | No store claim                         |

## SDK and service register

Create one row for every first-party service, third-party SDK, API, analytics tool, crash reporter, ad network, authentication provider, AI model/provider, payment service, push provider, storage system, and support tool.

| Product     | SDK/service | Version | Purpose | Data collected | Linked to identity? | Tracking? | Processor/controller | Retention | Deletion path | Encryption | Region | Policy URL | Verified by/date |
| ----------- | ----------- | ------- | ------- | -------------- | ------------------- | --------- | -------------------- | --------- | ------------- | ---------- | ------ | ---------- | ---------------- |
| StuddyBuddy | _TBD_       | _TBD_   | _TBD_   | _TBD_          | _TBD_               | _TBD_     | _TBD_                | _TBD_     | _TBD_         | _TBD_      | _TBD_  | _TBD_      | _TBD_            |
| Vlogz       | _TBD_       | _TBD_   | _TBD_   | _TBD_          | _TBD_               | _TBD_     | _TBD_                | _TBD_     | _TBD_         | _TBD_      | _TBD_  | _TBD_      | _TBD_            |

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
