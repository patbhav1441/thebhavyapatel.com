import { resolveInitiatingOrigin } from "./origins";
import { htmlResponse, oauthCallbackHtml } from "./responses";
import { createSignedState, verifySignedState } from "./state";

const STATE_COOKIE = "bp_oauth_state";

function readCookie(request: Request, name: string): string | null {
  const cookie = request.headers.get("Cookie");
  if (!cookie) return null;
  for (const item of cookie.split(";")) {
    const [key, ...value] = item.trim().split("=");
    if (key === name) return decodeURIComponent(value.join("="));
  }
  return null;
}

function expiredCookie(): string {
  return `${STATE_COOKIE}=; Path=/callback; HttpOnly; Secure; SameSite=Lax; Max-Age=0`;
}

export async function beginOAuth(request: Request, env: OAuthEnv): Promise<Response> {
  const url = new URL(request.url);
  if (url.searchParams.get("provider") !== "github")
    return new Response("Unsupported provider", { status: 400 });

  const origin = resolveInitiatingOrigin(request, env);
  if (!origin) return new Response("Invalid initiating site", { status: 403 });

  const requestedScope = url.searchParams.get("scope") || "public_repo";
  if (requestedScope !== "public_repo")
    return new Response("Unsupported OAuth scope", { status: 400 });

  const state = await createSignedState(origin, env.OAUTH_STATE_SECRET);
  const authorize = new URL("https://github.com/login/oauth/authorize");
  authorize.searchParams.set("client_id", env.GITHUB_CLIENT_ID);
  authorize.searchParams.set("redirect_uri", `${url.origin}/callback`);
  authorize.searchParams.set("scope", requestedScope);
  authorize.searchParams.set("state", state);

  return new Response(null, {
    status: 302,
    headers: {
      "Cache-Control": "no-store, max-age=0",
      Location: authorize.toString(),
      "Referrer-Policy": "no-referrer",
      "Set-Cookie": `${STATE_COOKIE}=${encodeURIComponent(state)}; Path=/callback; HttpOnly; Secure; SameSite=Lax; Max-Age=600`,
    },
  });
}

interface GitHubTokenResponse {
  access_token?: unknown;
  error?: unknown;
}

async function exchangeCode(code: string, env: OAuthEnv): Promise<string | null> {
  const response = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": "thebhavyapatel-cms-auth",
    },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });
  if (!response.ok) return null;
  const body: GitHubTokenResponse = await response.json();
  return typeof body.access_token === "string" && body.access_token.length > 0
    ? body.access_token
    : null;
}

export async function completeOAuth(request: Request, env: OAuthEnv): Promise<Response> {
  const url = new URL(request.url);
  const stateValue = url.searchParams.get("state");
  const code = url.searchParams.get("code");
  const cookieValue = readCookie(request, STATE_COOKIE);

  if (!stateValue || !code || !cookieValue || cookieValue !== stateValue) {
    return htmlResponse(
      oauthCallbackHtml(env.ALLOWED_ORIGIN, undefined, "Authentication could not be verified"),
      400,
    );
  }

  const state = await verifySignedState(stateValue, env.OAUTH_STATE_SECRET);
  if (!state || !allowedOriginForCallback(state.origin, env)) {
    return htmlResponse(
      oauthCallbackHtml(env.ALLOWED_ORIGIN, undefined, "Authentication expired or was invalid"),
      400,
    );
  }

  const token = await exchangeCode(code, env);
  const response = htmlResponse(
    oauthCallbackHtml(
      state.origin,
      token ?? undefined,
      token ? undefined : "GitHub did not issue an access token",
    ),
    token ? 200 : 502,
  );
  response.headers.append("Set-Cookie", expiredCookie());
  return response;
}

function allowedOriginForCallback(origin: string, env: OAuthEnv): boolean {
  return origin === env.ALLOWED_ORIGIN || origin === env.DEV_ALLOWED_ORIGIN;
}
