function stripControlChars(value: string): string {
  let result = "";
  for (let i = 0; i < value.length; i += 1) {
    const code = value.charCodeAt(i);
    if ((code >= 0 && code <= 31) || code === 127) continue;
    result += value[i];
  }
  return result;
}

const BLOCKED_PROBE_PATTERNS = [
  /^\/\.env(?:\.|$)/i,
  /^\/\.git(?:\/|$)/i,
  /^\/\.htaccess$/i,
  /^\/\.htpasswd$/i,
  /^\/\.ds_store$/i,
  /^\/wp-admin(?:\/|$)/i,
  /^\/wp-login\.php$/i,
  /^\/wp-content(?:\/|$)/i,
  /^\/phpmyadmin(?:\/|$)/i,
  /^\/phpinfo(?:\.php)?$/i,
  /^\/cgi-bin(?:\/|$)/i,
  /^\/etc\/passwd$/i,
  /^\/server-status$/i,
];

const ALLOWED_METHODS = new Set(["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]);

const STATIC_ASSET_EXTENSIONS =
  /\.(?:css|js|mjs|map|png|jpg|jpeg|webp|svg|ico|woff|woff2|ttf|pdf|txt|json)$/i;

export interface SafeUrlOptions {
  allowMailto?: boolean;
  allowLocalHttp?: boolean;
  allowRelative?: boolean;
}

export function sanitizeTextInput(value: string, maxLength = 120): string {
  return stripControlChars(value).trim().slice(0, maxLength);
}

export function sanitizeSafeUrl(rawUrl: string, options: SafeUrlOptions = {}): string {
  const { allowMailto = false, allowLocalHttp = false, allowRelative = true } = options;
  const trimmed = stripControlChars(rawUrl).trim();
  if (!trimmed) return "";

  if (trimmed.startsWith("//") || trimmed.includes("\\")) {
    return "";
  }

  if (trimmed.startsWith("/")) {
    if (!allowRelative) return "";
    const decoded = safeDecodeURIComponent(trimmed);
    if (!decoded || decoded.includes("..")) return "";
    return trimmed;
  }

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === "https:") {
      return parsed.href;
    }
    if (allowMailto && parsed.protocol === "mailto:") {
      return trimmed;
    }
    if (
      allowLocalHttp &&
      parsed.protocol === "http:" &&
      (parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1")
    ) {
      return parsed.href;
    }
    return "";
  } catch {
    return "";
  }
}

function safeDecodeURIComponent(value: string): string | null {
  try {
    return decodeURIComponent(value);
  } catch {
    return null;
  }
}

export interface RequestInspectionResult {
  allowed: boolean;
  status: number;
  reason?: string;
}

export function inspectIncomingRequest(
  request: Pick<Request, "method" | "url">,
): RequestInspectionResult {
  const method = request.method.toUpperCase();
  if (!ALLOWED_METHODS.has(method)) {
    return { allowed: false, status: 405, reason: "method_not_allowed" };
  }

  if (request.url.length > 2048) {
    return { allowed: false, status: 414, reason: "uri_too_long" };
  }

  if (
    request.url.includes("\0") ||
    request.url.includes("\\") ||
    /%2e%2e/i.test(request.url) ||
    /%252e/i.test(request.url) ||
    /(?:^|\/)\.\.(?:\/|$|\?|#)/.test(request.url)
  ) {
    return { allowed: false, status: 400, reason: "invalid_path" };
  }

  let url: URL;
  try {
    url = new URL(request.url);
  } catch {
    return { allowed: false, status: 400, reason: "malformed_url" };
  }

  const decodedPath = safeDecodeURIComponent(url.pathname);
  if (
    decodedPath === null ||
    decodedPath.includes("\0") ||
    decodedPath.includes("\\") ||
    /(?:^|\/)\.\.(?:\/|$)/.test(decodedPath) ||
    /%2e%2e/i.test(url.pathname)
  ) {
    return { allowed: false, status: 400, reason: "invalid_path" };
  }

  if (BLOCKED_PROBE_PATTERNS.some((pattern) => pattern.test(decodedPath))) {
    return { allowed: false, status: 403, reason: "blocked_probe" };
  }

  return { allowed: true, status: 200 };
}

export function extractClientIp(request: Request): string {
  const cfIp = request.headers.get("cf-connecting-ip")?.trim();
  if (cfIp) return cfIp;

  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const first = forwardedFor.split(",")[0]?.trim();
    if (first) return first;
  }

  return "local";
}

export function isStaticAssetPath(pathname: string): boolean {
  return STATIC_ASSET_EXTENSIONS.test(pathname);
}

interface RateBucket {
  count: number;
  resetAt: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetSeconds: number;
}

export class EdgeRateLimiter {
  private readonly buckets = new Map<string, RateBucket>();
  private readonly maxRequests: number;
  private readonly windowMs: number;
  private readonly maxEntries: number;

  constructor(maxRequests = 180, windowMs = 60_000, maxEntries = 2000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.maxEntries = maxEntries;
  }

  check(key: string, now = Date.now()): RateLimitResult {
    if (this.buckets.size > this.maxEntries) {
      this.prune(now);
    }

    const existing = this.buckets.get(key);
    if (!existing || existing.resetAt <= now) {
      const resetAt = now + this.windowMs;
      this.buckets.set(key, { count: 1, resetAt });
      return {
        allowed: true,
        remaining: Math.max(0, this.maxRequests - 1),
        resetSeconds: Math.ceil(this.windowMs / 1000),
      };
    }

    existing.count += 1;
    const resetSeconds = Math.max(1, Math.ceil((existing.resetAt - now) / 1000));
    if (existing.count > this.maxRequests) {
      return { allowed: false, remaining: 0, resetSeconds };
    }

    return {
      allowed: true,
      remaining: Math.max(0, this.maxRequests - existing.count),
      resetSeconds,
    };
  }

  private prune(now: number): void {
    for (const [key, bucket] of this.buckets.entries()) {
      if (bucket.resetAt <= now) {
        this.buckets.delete(key);
      }
    }
    if (this.buckets.size > this.maxEntries) {
      const excess = this.buckets.size - Math.floor(this.maxEntries / 2);
      let removed = 0;
      for (const key of this.buckets.keys()) {
        this.buckets.delete(key);
        removed += 1;
        if (removed >= excess) break;
      }
    }
  }
}

export function buildSecurityHeaders(options?: {
  isDev?: boolean;
  isHttps?: boolean;
}): Record<string, string> {
  const isDev = options?.isDev ?? false;
  const isHttps = options?.isHttps ?? false;

  const cspDirectives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: blob: https:",
    "frame-src 'self' https://drive.google.com https://docs.google.com",
    "connect-src 'self' ws: wss: https://*.supabase.co",
    "media-src 'self' https:",
    "object-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
  ];

  if (isHttps && !isDev) {
    cspDirectives.push("upgrade-insecure-requests");
  }

  return {
    "Content-Security-Policy": cspDirectives.join("; "),
    "X-Content-Type-Options": "nosniff",
    "X-DNS-Prefetch-Control": "off",
    "X-Permitted-Cross-Domain-Policies": "none",
    "Origin-Agent-Cluster": "?1",
    "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
    "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy":
      "accelerometer=(), camera=(), display-capture=(), encrypted-media=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), midi=(), payment=(), usb=()",
  };
}
