export const CANONICAL_ORIGIN = "https://www.thebhavyapatel.com";

export const RESERVED_PROJECT_SLUGS = new Set([
  "admin",
  "api",
  "assets",
  "about",
  "work",
  "resume",
  "contact",
  "404",
  "favicon",
  "robots",
  "sitemap",
  "sitemap-index",
  "_astro",
]);

export const PROJECT_STATUSES = [
  "concept",
  "research",
  "building",
  "private-beta",
  "public-beta",
  "shipped",
  "paused",
  "archived",
] as const;

export const PROJECT_PAGE_KINDS = [
  "privacy",
  "terms",
  "support",
  "delete-account",
  "community-guidelines",
  "safety",
  "accessibility",
  "custom",
] as const;

export const PUBLIC_PLACEHOLDER_PATTERNS = [
  /\bTODO\b/i,
  /\bTBD\b/i,
  /\bFIXME\b/i,
  /lorem ipsum/i,
  /\bJohn Doe\b/i,
  /\bJane Doe\b/i,
  /example\.com/i,
  /VIDEO_ID/i,
  /YOUR_EMAIL/i,
  /YOUR_NAME/i,
  /INSERT_/i,
  /REPLACE_ME/i,
];
