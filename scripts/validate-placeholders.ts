import { readFile } from "node:fs/promises";
import path from "node:path";
import { PUBLIC_PLACEHOLDER_PATTERNS } from "../src/lib/constants";
import { failIfErrors, readMarkdownDirectory } from "./content-utils";

const root = process.cwd();
const errors: string[] = [];
const publicFiles: Array<{ file: string; text: string }> = [];

for (const directory of [
  "projects",
  "project-pages",
  "experience",
  "education",
  "research",
  "credentials",
]) {
  const records = await readMarkdownDirectory(path.join(root, `src/content/${directory}`));
  for (const record of records) {
    const published = record.data.published === true || record.data.status === "published";
    if (published)
      publicFiles.push({
        file: record.file,
        text: `${JSON.stringify(record.data)}\n${record.body}`,
      });
  }
}

for (const relative of ["src/data/site.json", "src/data/home.json", "src/data/navigation.json"]) {
  publicFiles.push({ file: relative, text: await readFile(path.join(root, relative), "utf8") });
}

for (const item of publicFiles) {
  for (const pattern of PUBLIC_PLACEHOLDER_PATTERNS) {
    if (pattern.test(item.text))
      errors.push(`${item.file}: contains banned public placeholder ${pattern}`);
  }
}

failIfErrors(errors);
console.log(
  `Scanned ${publicFiles.length} public content records for placeholders and sample data.`,
);
