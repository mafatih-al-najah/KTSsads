import { describe, expect, it } from "vitest";
import {
  buildSecurityHeaders,
  EdgeRateLimiter,
  inspectIncomingRequest,
  isStaticAssetPath,
  sanitizeSafeUrl,
  sanitizeTextInput,
} from "@/lib/security";

describe("Security hardening utilities", () => {
  it("sanitizes unsafe URL schemes while keeping safe https, mailto, and relative paths", () => {
    expect(sanitizeSafeUrl("javascript:alert(1)")).toBe("");
    expect(sanitizeSafeUrl("data:text/html,<script>alert(1)</script>")).toBe("");
    expect(sanitizeSafeUrl("vbscript:msgbox(1)")).toBe("");
    expect(sanitizeSafeUrl("//evil.example/payload")).toBe("");
    expect(sanitizeSafeUrl("/../../etc/passwd")).toBe("");

    expect(sanitizeSafeUrl("https://drive.google.com/file/d/abc/view")).toBe(
      "https://drive.google.com/file/d/abc/view",
    );
    expect(sanitizeSafeUrl("/files/book.pdf")).toBe("/files/book.pdf");
    expect(sanitizeSafeUrl("mailto:test@example.com", { allowMailto: true })).toBe(
      "mailto:test@example.com",
    );
    expect(sanitizeSafeUrl("mailto:test@example.com")).toBe("");
  });

  it("strips control characters and caps text length", () => {
    expect(sanitizeTextInput("  مرحباً\u0000\u0007 بالعالم  ", 10)).toBe("مرحباً بال");
  });

  it("blocks disallowed HTTP methods, traversal paths, and probe routes", () => {
    expect(inspectIncomingRequest({ method: "TRACE", url: "https://example.com/" })).toEqual({
      allowed: false,
      status: 405,
      reason: "method_not_allowed",
    });

    expect(
      inspectIncomingRequest({ method: "GET", url: "https://example.com/%2e%2e/etc/passwd" }),
    ).toEqual({
      allowed: false,
      status: 400,
      reason: "invalid_path",
    });

    expect(inspectIncomingRequest(new Request("https://example.com/.env"))).toEqual({
      allowed: false,
      status: 403,
      reason: "blocked_probe",
    });

    expect(inspectIncomingRequest(new Request("https://example.com/wp-login.php"))).toEqual({
      allowed: false,
      status: 403,
      reason: "blocked_probe",
    });

    expect(inspectIncomingRequest(new Request("https://example.com/notes/teachers"))).toEqual({
      allowed: true,
      status: 200,
    });
  });

  it("enforces sliding-window rate limits per client", () => {
    const limiter = new EdgeRateLimiter(3, 60_000, 100);
    const now = 1_000_000;

    expect(limiter.check("1.2.3.4", now).allowed).toBe(true);
    expect(limiter.check("1.2.3.4", now + 100).allowed).toBe(true);
    expect(limiter.check("1.2.3.4", now + 200).allowed).toBe(true);
    expect(limiter.check("1.2.3.4", now + 300)).toEqual({
      allowed: false,
      remaining: 0,
      resetSeconds: 60,
    });

    expect(limiter.check("5.6.7.8", now + 300).allowed).toBe(true);
    expect(limiter.check("1.2.3.4", now + 61_000).allowed).toBe(true);
  });

  it("distinguishes static asset paths and builds complete security headers", () => {
    expect(isStaticAssetPath("/assets/app.js")).toBe(true);
    expect(isStaticAssetPath("/notes/teachers")).toBe(false);

    const headers = buildSecurityHeaders({ isDev: false, isHttps: true });
    expect(headers["X-Content-Type-Options"]).toBe("nosniff");
    expect(headers["Referrer-Policy"]).toBe("strict-origin-when-cross-origin");
    expect(headers["Cross-Origin-Opener-Policy"]).toBe("same-origin-allow-popups");
    expect(headers["Content-Security-Policy"]).toContain("upgrade-insecure-requests");
    expect(headers["Content-Security-Policy"]).toContain("https://drive.google.com");
  });
});
