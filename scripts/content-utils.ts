import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export interface MarkdownRecord {
  body: string;
  data: Record<string, unknown>;
  file: string;
}

export async function markdownFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const file = path.join(directory, entry.name);
      if (entry.isDirectory()) return markdownFiles(file);
      return entry.isFile() && entry.name.endsWith(".md") ? [file] : [];
    }),
  );
  return nested.flat();
}

export async function readMarkdownDirectory(directory: string): Promise<MarkdownRecord[]> {
  const files = await markdownFiles(directory);
  return Promise.all(
    files.map(async (file) => {
      const parsed = matter(await readFile(file, "utf8"));
      return { file, data: parsed.data as Record<string, unknown>, body: parsed.content.trim() };
    }),
  );
}

export function stringField(record: MarkdownRecord, field: string): string {
  const value = record.data[field];
  if (typeof value !== "string") throw new Error(`${record.file}: ${field} must be a string`);
  return value;
}

export function booleanField(record: MarkdownRecord, field: string): boolean {
  const value = record.data[field];
  if (typeof value !== "boolean") throw new Error(`${record.file}: ${field} must be a boolean`);
  return value;
}

export function failIfErrors(errors: string[]): void {
  if (errors.length === 0) return;
  throw new Error(`Validation failed:\n${errors.map((error) => `- ${error}`).join("\n")}`);
}
