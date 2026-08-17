import { beginOAuth, completeOAuth } from "./oauth";
import { jsonResponse } from "./responses";

export default {
  async fetch(request: Request, env: OAuthEnv): Promise<Response> {
    const url = new URL(request.url);
    try {
      if (request.method !== "GET") return jsonResponse({ error: "Method not allowed" }, 405);
      if (url.pathname === "/health") return jsonResponse({ status: "ok" });
      if (url.pathname === "/auth") return await beginOAuth(request, env);
      if (url.pathname === "/callback") return await completeOAuth(request, env);
      return jsonResponse({ error: "Not found" }, 404);
    } catch (error) {
      console.error(
        JSON.stringify({
          message: "OAuth request failed",
          path: url.pathname,
          error: error instanceof Error ? error.message : "Unknown error",
        }),
      );
      return jsonResponse({ error: "Authentication service error" }, 500);
    }
  },
} satisfies ExportedHandler<OAuthEnv>;
