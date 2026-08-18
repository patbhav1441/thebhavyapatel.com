import { access, readFile } from "node:fs/promises";
import path from "node:path";

const dist = path.join(process.cwd(), "dist");
const required = [
  "index.html",
  "work/index.html",
  "about/index.html",
  "resume/index.html",
  "resume/bhavya-patel-resume.pdf",
  "contact/index.html",
  "admin/index.html",
  "studdybuddy/index.html",
  "zargon/index.html",
  "stock-predictor/index.html",
  "ai-therapist/index.html",
  "fhs-checklist/index.html",
  "fhs-checklist/privacy/index.html",
  "vlogz/index.html",
  "404.html",
  "admin/config.yml",
  "_headers",
  "_redirects",
];

for (const file of required) await access(path.join(dist, file));

for (const draft of [
  "privacy",
  "terms",
  "support",
  "delete-account",
  "community-guidelines",
  "safety",
]) {
  try {
    await access(path.join(dist, `studdybuddy/${draft}/index.html`));
    throw new Error(`Draft legal route was emitted: /studdybuddy/${draft}/`);
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("Draft legal route")) throw error;
  }
}

const homepage = await readFile(path.join(dist, "index.html"), "utf8");
if (homepage.includes("decap-cms") || homepage.includes("react-dom")) {
  throw new Error("The public homepage includes an admin framework bundle.");
}

console.log(`Smoke-tested ${required.length} build artifacts and draft-route exclusion.`);
