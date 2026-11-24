import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import {
  buildSecurityHeaders,
  EdgeRateLimiter,
  extractClientIp,
  inspectIncomingRequest,
  isStaticAssetPath,
} from "./lib/security";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;
const edgeRateLimiter = new EdgeRateLimiter(180, 60_000, 2000);

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

function withSecurityHeaders(request: Request, response: Response): Response {
  const headers = new Headers(response.headers);
  headers.delete("x-powered-by");
  headers.delete("server");

  const parsedUrl = safeUrl(request.url);
  const isHttps =
    parsedUrl?.protocol === "https:" ||
    request.headers.get("x-forwarded-proto")?.toLowerCase() === "https";
  const isDev = process.env["NODE_ENV"] !== "production";

  const securityHeaders = buildSecurityHeaders({ isDev, isHttps });
  for (const [name, value] of Object.entries(securityHeaders)) {
    headers.set(name, value);
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function safeUrl(raw: string): URL | null {
  try {
    return new URL(raw);
  } catch {
    return null;
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    const inspection = inspectIncomingRequest(request);
    if (!inspection.allowed) {
      return withSecurityHeaders(
        request,
        new Response("Request rejected", {
          status: inspection.status,
          headers: {
            "content-type": "text/plain; charset=utf-8",
            "cache-control": "no-store",
          },
        }),
      );
    }

    const parsedUrl = safeUrl(request.url);
    if (parsedUrl && !isStaticAssetPath(parsedUrl.pathname)) {
      const rateLimit = edgeRateLimiter.check(extractClientIp(request));
      if (!rateLimit.allowed) {
        return withSecurityHeaders(
          request,
          new Response("Too many requests", {
            status: 429,
            headers: {
              "content-type": "text/plain; charset=utf-8",
              "retry-after": String(rateLimit.resetSeconds),
              "cache-control": "no-store",
            },
          }),
        );
      }
    }

    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return withSecurityHeaders(request, await normalizeCatastrophicSsrResponse(response));
    } catch (error) {
      console.error(error);
      return withSecurityHeaders(
        request,
        new Response(renderErrorPage(), {
          status: 500,
          headers: { "content-type": "text/html; charset=utf-8" },
        }),
      );
    }
  },
};
