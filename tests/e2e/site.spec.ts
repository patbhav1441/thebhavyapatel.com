import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const publicRoutes = [
  "/",
  "/work/",
  "/about/",
  "/resume/",
  "/contact/",
  "/studdybuddy/",
  "/zargon/",
  "/stock-predictor/",
  "/ai-therapist/",
  "/fhs-checklist/",
  "/vlogz/",
];

for (const route of publicRoutes) {
  test(`${route} renders a canonical, accessible page shell`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    const response = await page.goto(route);
    expect(response?.ok()).toBe(true);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://www.thebhavyapatel.com${route}`,
    );
    expect(errors).toEqual([]);
  });
}

test("admin is isolated and excluded from indexing", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const response = await page.goto("/admin/");
  expect(response?.ok()).toBe(true);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    "noindex,nofollow,noarchive",
  );
  await expect(page.locator("#nc-root")).toBeVisible();
  await expect(page.getByRole("button", { name: "Login with GitHub" })).toBeVisible();
  const unexpectedErrors = errors.filter((message) => !message.includes("localhost:8081/api/v1"));
  expect(unexpectedErrors).toEqual([]);
});

test("resume page exposes the current one-page PDF", async ({ page }) => {
  await page.goto("/resume/");
  await expect(page.getByRole("link", { name: "Download one-page PDF" })).toHaveAttribute(
    "href",
    "/resume/bhavya-patel-resume.pdf",
  );
  const response = await page.request.get("/resume/bhavya-patel-resume.pdf");
  expect(response.ok()).toBe(true);
  expect(response.headers()["content-type"]).toContain("application/pdf");
});

test("draft StuddyBuddy policy routes are not published", async ({ page }) => {
  for (const route of [
    "privacy",
    "support",
    "terms",
    "delete-account",
    "community-guidelines",
    "safety",
  ]) {
    const response = await page.goto(`/studdybuddy/${route}/`);
    expect(response?.status()).toBe(404);
  }
});

test("keyboard focus activates the same project preview as hover", async ({ page }) => {
  await page.goto("/");
  const secondLink = page.locator("[data-project-link='1']");
  await secondLink.focus();
  await expect(page.locator("[data-project-preview='1']")).toHaveClass(/is-active/);
});

test("mobile menu opens, closes with Escape, and returns focus", async ({ page }) => {
  test.skip(test.info().project.name !== "mobile", "Mobile-only behavior");
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Open menu" });
  await trigger.click();
  await expect(page.locator("[data-menu-dialog]")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("[data-menu-dialog]")).not.toBeVisible();
  await expect(trigger).toBeFocused();
});

test("representative pages have no serious axe violations", async ({ page }) => {
  for (const route of ["/", "/studdybuddy/", "/contact/"]) {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).analyze();
    expect(
      results.violations.filter((violation) =>
        ["serious", "critical"].includes(violation.impact ?? ""),
      ),
    ).toEqual([]);
  }
});

test("layout does not overflow horizontally", async ({ page }) => {
  for (const route of ["/", "/work/", "/studdybuddy/"]) {
    await page.goto(route);
    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1);
  }
});

test("reduced motion resolves handwriting immediately", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const duration = await page
    .locator(".handwritten path")
    .first()
    .evaluate((element) => getComputedStyle(element).animationDuration);
  expect(Number.parseFloat(duration)).toBeLessThanOrEqual(0.01);
});

test("unknown routes use the custom 404", async ({ page }) => {
  const response = await page.goto("/a-route-that-does-not-exist/");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("no record");
});
