const SECURITY_HEADERS = {
  "Cache-Control": "no-store, max-age=0",
  "Content-Security-Policy":
    "default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; base-uri 'none'; frame-ancestors 'none'",
  "Referrer-Policy": "no-referrer",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
};

export function jsonResponse(body: unknown, status = 200): Response {
  return Response.json(body, {
    status,
    headers: SECURITY_HEADERS,
  });
}

export function htmlResponse(html: string, status = 200): Response {
  return new Response(html, {
    status,
    headers: {
      ...SECURITY_HEADERS,
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}

export function oauthCallbackHtml(origin: string, token?: string, errorMessage?: string): string {
  const authorizing = JSON.stringify("authorizing:github");
  const safeOrigin = JSON.stringify(origin);
  const payload = token
    ? `"authorization:github:success:" + ${JSON.stringify(JSON.stringify({ token, provider: "github" })).replaceAll("<", "\\u003c")}`
    : `"authorization:github:error:" + ${JSON.stringify(JSON.stringify({ message: errorMessage || "Authentication failed" })).replaceAll("<", "\\u003c")}`;

  return `<!doctype html>
<html lang="en">
  <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>GitHub authorization</title></head>
  <body>
    <main><h1>GitHub authorization</h1><p id="status">Completing secure sign-in…</p></main>
    <script>
      (() => {
        const origin = ${safeOrigin};
        const authorizing = ${authorizing};
        const result = ${payload};
        const status = document.getElementById("status");
        if (!window.opener) {
          status.textContent = "The CMS window is unavailable. Close this window and try again.";
          return;
        }
        window.addEventListener("message", (event) => {
          if (event.origin !== origin || event.data !== authorizing) return;
          window.opener.postMessage(result, origin);
          status.textContent = "Sign-in complete. This window can close.";
          window.close();
        }, { once: true });
        window.opener.postMessage(authorizing, origin);
      })();
    </script>
  </body>
</html>`;
}
