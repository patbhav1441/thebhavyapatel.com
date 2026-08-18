import { describe, expect, it } from "vitest";
import { createSignedState, verifySignedState } from "../src/state";

describe("OAuth state", () => {
  it("round-trips a signed origin-bound state", async () => {
    const state = await createSignedState("https://www.thebhavyapatel.com", "test-secret", 1000);
    const parsed = await verifySignedState(state, "test-secret", 2000);
    expect(parsed?.origin).toBe("https://www.thebhavyapatel.com");
  });

  it("rejects tampering", async () => {
    const state = await createSignedState("https://www.thebhavyapatel.com", "test-secret", 1000);
    expect(await verifySignedState(`${state}x`, "test-secret", 2000)).toBeNull();
  });

  it("rejects expired state", async () => {
    const state = await createSignedState("https://www.thebhavyapatel.com", "test-secret", 1000);
    expect(await verifySignedState(state, "test-secret", 1_000_000)).toBeNull();
  });
});
