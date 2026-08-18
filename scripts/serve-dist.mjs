import { createReadStream } from "node:fs";
import { access, stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize, resolve, sep } from "node:path";
import process from "node:process";
import { URL } from "node:url";

const distRoot = resolve("dist");
const port = Number.parseInt(process.env.PLAYWRIGHT_PORT ?? "4321", 10);

const contentTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".ico", "image/x-icon"],
  [".jpeg", "image/jpeg"],
  [".jpg", "image/jpeg"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".pdf", "application/pdf"],
  [".png", "image/png"],
  [".svg", "image/svg+xml; charset=utf-8"],
  [".webp", "image/webp"],
  [".woff2", "font/woff2"],
  [".xml", "application/xml; charset=utf-8"],
]);

function candidateFor(pathname) {
  const decodedPath = decodeURIComponent(pathname);
  const normalizedPath = normalize(decodedPath).replace(/^([/\\])+/, "");
  const relativePath =
    normalizedPath === "" || normalizedPath === "."
      ? "index.html"
      : normalizedPath.endsWith(sep)
        ? `${normalizedPath}index.html`
        : normalizedPath;
  const candidate = join(distRoot, relativePath);
  return candidate.startsWith(`${distRoot}${sep}`) ? candidate : null;
}

async function readableFile(filePath) {
  if (!filePath) return false;
  try {
    await access(filePath);
    return (await stat(filePath)).isFile();
  } catch {
    return false;
  }
}

const server = createServer(async (request, response) => {
  const pathname = new URL(request.url ?? "/", "http://127.0.0.1").pathname;
  let filePath = candidateFor(pathname);
  let statusCode = 200;

  if (!(await readableFile(filePath))) {
    filePath = join(distRoot, "404.html");
    statusCode = 404;
  }

  response.writeHead(statusCode, {
    "Cache-Control": "no-store",
    "Content-Type": contentTypes.get(extname(filePath)) ?? "application/octet-stream",
  });

  if (request.method === "HEAD") {
    response.end();
    return;
  }

  createReadStream(filePath).pipe(response);
});

server.listen(port, "127.0.0.1");

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => server.close(() => process.exit(0)));
}
