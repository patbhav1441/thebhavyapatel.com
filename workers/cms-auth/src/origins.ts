export function allowedOrigins(env: OAuthEnv): Set<string> {
  const origins = new Set<string>([env.ALLOWED_ORIGIN]);
  if (env.DEV_ALLOWED_ORIGIN?.startsWith("http://localhost:")) origins.add(env.DEV_ALLOWED_ORIGIN);
  return origins;
}

export function resolveInitiatingOrigin(request: Request, env: OAuthEnv): string | null {
  const requestUrl = new URL(request.url);
  const siteId = requestUrl.searchParams.get("site_id");
  const referer = request.headers.get("Referer");
  const headerOrigin = request.headers.get("Origin");
  const candidates = [headerOrigin, referer].flatMap((value) => {
    if (!value) return [];
    try {
      return [new URL(value).origin];
    } catch {
      return [];
    }
  });
  const allowed = allowedOrigins(env);
  const origin = candidates.find((candidate) => allowed.has(candidate));
  if (!origin) return null;

  if (origin === env.ALLOWED_ORIGIN && siteId !== new URL(env.ALLOWED_ORIGIN).hostname) return null;
  if (origin === env.DEV_ALLOWED_ORIGIN && siteId !== "demo.decapcms.org") return null;
  return origin;
}
