import { RESERVED_PROJECT_SLUGS } from "./constants";

export const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function isValidProjectSlug(slug: string): boolean {
  return slugPattern.test(slug) && !RESERVED_PROJECT_SLUGS.has(slug);
}

export function projectPath(slug: string): string {
  return `/${slug}/`;
}

export function projectPagePath(projectSlug: string, pageSlug: string): string {
  return `/${projectSlug}/${pageSlug}/`;
}

export function formatStatus(status: string): string {
  return status.replaceAll("-", " ");
}
