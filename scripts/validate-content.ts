import path from "node:path";
import { RESERVED_PROJECT_SLUGS } from "../src/lib/constants";
import { booleanField, failIfErrors, readMarkdownDirectory, stringField } from "./content-utils";

const root = process.cwd();
const projects = await readMarkdownDirectory(path.join(root, "src/content/projects"));
const pages = await readMarkdownDirectory(path.join(root, "src/content/project-pages"));
const datedDirectories = ["experience", "education", "research", "credentials"];
const errors: string[] = [];

const projectSlugs = new Set<string>();
const projectCodes = new Set<string>();
const projectPublished = new Map<string, boolean>();

for (const project of projects) {
  const slug = stringField(project, "slug");
  const code = stringField(project, "projectCode");
  const published = booleanField(project, "published");
  const featured = booleanField(project, "featured");
  const directory = path.basename(path.dirname(project.file));

  if (projectSlugs.has(slug)) errors.push(`Duplicate project slug: ${slug}`);
  if (projectCodes.has(code)) errors.push(`Duplicate project code: ${code}`);
  if (RESERVED_PROJECT_SLUGS.has(slug)) errors.push(`Reserved project slug: ${slug}`);
  if (directory !== slug)
    errors.push(`${project.file}: directory ${directory} differs from slug ${slug}`);
  if (featured && !published) errors.push(`${project.file}: a featured project must be published`);

  const links = project.data.links;
  if (published && typeof links === "object" && links !== null) {
    for (const value of Object.values(links)) {
      if (typeof value === "string" && !value.startsWith("https://")) {
        errors.push(`${project.file}: published external links must use HTTPS`);
      }
    }
  }

  projectSlugs.add(slug);
  projectCodes.add(code);
  projectPublished.set(slug, published);
}

const generatedPages = new Set<string>();
const pagesByProject = new Map<string, Set<string>>();
for (const page of pages) {
  const projectSlug = stringField(page, "projectSlug");
  const pageSlug = stringField(page, "pageSlug");
  const status = stringField(page, "status");
  const route = `/${projectSlug}/${pageSlug}/`;

  if (!projectSlugs.has(projectSlug))
    errors.push(`${page.file}: references missing project ${projectSlug}`);
  if (generatedPages.has(route)) errors.push(`Duplicate project-page route: ${route}`);
  if (status === "published" && !projectPublished.get(projectSlug)) {
    errors.push(`${page.file}: published child page has an unpublished parent`);
  }

  if (status === "published") {
    const requiredStrings = ["effectiveDate", "lastUpdated", "contactEmail"];
    for (const field of requiredStrings) {
      if (typeof page.data[field] !== "string" || page.data[field] === "") {
        errors.push(`${page.file}: published legal page requires ${field}`);
      }
    }
    const readiness = page.data.readiness;
    if (
      typeof readiness !== "object" ||
      readiness === null ||
      Object.values(readiness).some((value) => value !== true)
    ) {
      errors.push(`${page.file}: every readiness gate must be complete before publication`);
    }
    if (page.body.length < 300) errors.push(`${page.file}: published legal page body is too short`);
  }

  const kinds = pagesByProject.get(projectSlug) ?? new Set<string>();
  if (status === "published") kinds.add(stringField(page, "kind"));
  pagesByProject.set(projectSlug, kinds);
  generatedPages.add(route);
}

for (const project of projects) {
  const appStore = project.data.appStore;
  if (
    typeof appStore !== "object" ||
    appStore === null ||
    !("legalReady" in appStore) ||
    appStore.legalReady !== true
  )
    continue;
  const slug = stringField(project, "slug");
  const kinds = pagesByProject.get(slug) ?? new Set<string>();
  const required = new Set(["privacy", "support", "terms"]);
  if ("accountCreation" in appStore && appStore.accountCreation === true)
    required.add("delete-account");
  if ("userGeneratedContent" in appStore && appStore.userGeneratedContent === true)
    required.add("community-guidelines");
  if ("inPersonMeetups" in appStore && appStore.inPersonMeetups === true) required.add("safety");
  for (const kind of required) {
    if (!kinds.has(kind))
      errors.push(`${project.file}: legalReady requires a published ${kind} page`);
  }
}

for (const directory of datedDirectories) {
  const records = await readMarkdownDirectory(path.join(root, `src/content/${directory}`));
  for (const record of records) {
    const start = record.data.startDate;
    const end = record.data.endDate ?? record.data.expirationDate;
    if (typeof start === "string" && typeof end === "string" && end < start) {
      errors.push(`${record.file}: end date precedes start date`);
    }
  }
}

failIfErrors(errors);
console.log(
  `Validated ${projects.length} projects, ${pages.length} project pages, and cross-collection readiness rules.`,
);
