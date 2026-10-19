import { describe, it, expect } from "vitest";
import { canManageAdvertisements, telegramRegistrationUrl } from "@/lib/advertisements";
import { historyAvailability, nextHistoryBounds } from "@/lib/page-history";

describe("Teacher advertisement rules", () => {
  it("opens a teacher username on Telegram", () => { expect(telegramRegistrationUrl("@math_teacher")).toBe("https://t.me/math_teacher"); });
  it("preserves a Telegram channel registration link", () => { expect(telegramRegistrationUrl("https://t.me/+abc123")).toBe("https://t.me/+abc123"); });
  it("rejects registration outside Telegram", () => { expect(() => telegramRegistrationUrl("https://example.com/register")).toThrow(); });
  it("allows advertisement management only with a verified admin role", () => { expect(canManageAdvertisements(true)).toBe(true); expect(canManageAdvertisements(false)).toBe(false); expect(canManageAdvertisements("admin")).toBe(false); });
});
describe("Internal page navigation", () => {
  it("does not go back before the first site visit", () => { expect(historyAvailability({ first: 4, last: 4 }, 4)).toEqual({ back: false, forward: false }); });
  it("enables return to the page after going back", () => { expect(historyAvailability({ first: 4, last: 6 }, 5)).toEqual({ back: true, forward: true }); });
  it("discards forward entries after navigating to a new page", () => { const bounds = nextHistoryBounds({ first: 4, last: 8 }, 6, "PUSH"); expect(historyAvailability(bounds, 6)).toEqual({ back: true, forward: false }); });
});