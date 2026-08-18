import path from "node:path";
import { RESERVED_PROJECT_SLUGS } from "../src/lib/constants";
import { failIfErrors, readMarkdownDirectory, stringField } from "./content-utils";

const staticRoutes = new Set([
  "/",
  "/work/",
  "/about/",
  "/resume/",
  "/contact/",
  "/admin/",
  "/404/",
]);
const projects = await readMarkdownDirectory(path.join(process.cwd(), "src/content/projects"));
const pages = await readMarkdownDirectory(path.join(process.cwd(), "src/content/project-pages"));
const routes = new Set(staticRoutes);
const errors: string[] = [];

for (const project of projects) {
  const slug = stringField(project, "slug");
  const route = `/${slug}/`;
  if (RESERVED_PROJECT_SLUGS.has(slug)) errors.push(`${project.file}: ${slug} is reserved`);
  if (routes.has(route)) errors.push(`${project.file}: duplicate generated route ${route}`);
  routes.add(route);
}

for (const page of pages) {
  const route = `/${stringField(page, "projectSlug")}/${stringField(page, "pageSlug")}/`;
  if (routes.has(route)) errors.push(`${page.file}: duplicate generated route ${route}`);
  routes.add(route);
}

failIfErrors(errors);
console.log(`Validated ${routes.size} unique static and content routes.`);
