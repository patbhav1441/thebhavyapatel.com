import { afterEach, describe, expect, it, vi } from "vitest";
import { completeOAuth } from "../src/oauth";
import { createSignedState } from "../src/state";

afterEach(() => vi.unstubAllGlobals());

describe("OAuth callback", () => {
  it("uses Decap's exact GitHub postMessage handshake and exact target origin", async () => {
    const env = {
      ALLOWED_ORIGIN: "https://www.thebhavyapatel.com",
      GITHUB_CLIENT_ID: "client-id",
      GITHUB_CLIENT_SECRET: "client-secret",
      OAUTH_STATE_SECRET: "state-secret",
    } as OAuthEnv;
    const state = await createSignedState(env.ALLOWED_ORIGIN, env.OAUTH_STATE_SECRET);
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => Response.json({ access_token: "token-value" })),
    );
    const request = new Request(
      `https://auth.thebhavyapatel.com/callback?code=test-code&state=${encodeURIComponent(state)}`,
      {
        headers: { Cookie: `bp_oauth_state=${encodeURIComponent(state)}` },
      },
    );
    const response = await completeOAuth(request, env);
    const html = await response.text();

    expect(response.status).toBe(200);
    expect(html).toContain("authorizing:github");
    expect(html).toContain("authorization:github:success:");
    expect(html).toContain("https://www.thebhavyapatel.com");
    expect(html).not.toContain('postMessage(result, "*")');
  });
});
