import { describe, expect, it } from "vitest";
import {
  formatStatus,
  isValidProjectSlug,
  projectPagePath,
  projectPath,
} from "../../src/lib/routes";

describe("route helpers", () => {
  it("accepts safe project slugs", () => expect(isValidProjectSlug("robot-dog")).toBe(true));
  it.each(["admin", "About", "two--hyphens", " leading", "trailing-"])("rejects %s", (slug) => {
    expect(isValidProjectSlug(slug)).toBe(false);
  });
  it("builds canonical trailing-slash paths", () => {
    expect(projectPath("zargon")).toBe("/zargon/");
    expect(projectPagePath("studdybuddy", "privacy")).toBe("/studdybuddy/privacy/");
  });
  it("formats machine statuses", () => expect(formatStatus("private-beta")).toBe("private beta"));
});
