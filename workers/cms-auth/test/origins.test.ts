import { describe, expect, it } from "vitest";
import { resolveInitiatingOrigin } from "../src/origins";

const env = {
  ALLOWED_ORIGIN: "https://www.thebhavyapatel.com",
  DEV_ALLOWED_ORIGIN: "http://localhost:4321",
} as OAuthEnv;

describe("origin validation", () => {
  it("accepts the exact production origin and site id", () => {
    const request = new Request(
      "https://auth.thebhavyapatel.com/auth?site_id=www.thebhavyapatel.com",
      {
        headers: { Referer: "https://www.thebhavyapatel.com/admin/" },
      },
    );
    expect(resolveInitiatingOrigin(request, env)).toBe("https://www.thebhavyapatel.com");
  });

  it("rejects unrelated origins", () => {
    const request = new Request(
      "https://auth.thebhavyapatel.com/auth?site_id=www.thebhavyapatel.com",
      {
        headers: { Referer: "https://attacker.invalid/" },
      },
    );
    expect(resolveInitiatingOrigin(request, env)).toBeNull();
  });
});
