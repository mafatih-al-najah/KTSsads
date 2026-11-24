import { describe, expect, it, vi, beforeEach } from "vitest";
import {
  createAnchorClickHandler,
  getScrollBehavior,
  smoothScrollToId,
  smoothScrollToTop,
} from "@/lib/smooth-scroll";

describe("smooth-scroll utilities", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    window.matchMedia = vi.fn().mockReturnValue({
      matches: false,
      media: "(prefers-reduced-motion: reduce)",
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    });
  });

  it("uses smooth behavior by default and auto when prefers-reduced-motion is enabled", () => {
    expect(getScrollBehavior()).toBe("smooth");

    window.matchMedia = vi.fn().mockReturnValue({
      matches: true,
      media: "(prefers-reduced-motion: reduce)",
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    });

    expect(getScrollBehavior()).toBe("auto");
  });

  it("scrolls smoothly to an existing section id and returns false when missing", () => {
    const section = document.createElement("div");
    section.id = "excellence-curriculum";
    const scrollIntoView = vi.fn();
    section.scrollIntoView = scrollIntoView;
    document.body.appendChild(section);

    expect(smoothScrollToId("missing-section")).toBe(false);
    expect(smoothScrollToId("excellence-curriculum")).toBe(true);
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth", block: "start" });
    expect(window.location.hash).toBe("#excellence-curriculum");

    section.remove();
  });

  it("scrolls smoothly to top on smoothScrollToTop", () => {
    const scrollTo = vi.fn();
    window.scrollTo = scrollTo;

    smoothScrollToTop();
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });

  it("handles primary anchor clicks and ignores modified clicks", () => {
    const section = document.createElement("div");
    section.id = "books-curriculum";
    const scrollIntoView = vi.fn();
    section.scrollIntoView = scrollIntoView;
    document.body.appendChild(section);

    const handler = createAnchorClickHandler("books-curriculum");

    const preventDefaultModified = vi.fn();
    handler({
      defaultPrevented: false,
      button: 0,
      metaKey: true,
      ctrlKey: false,
      shiftKey: false,
      altKey: false,
      preventDefault: preventDefaultModified,
    } as unknown as React.MouseEvent<HTMLAnchorElement>);
    expect(preventDefaultModified).not.toHaveBeenCalled();
    expect(scrollIntoView).not.toHaveBeenCalled();

    const preventDefaultPrimary = vi.fn();
    handler({
      defaultPrevented: false,
      button: 0,
      metaKey: false,
      ctrlKey: false,
      shiftKey: false,
      altKey: false,
      preventDefault: preventDefaultPrimary,
    } as unknown as React.MouseEvent<HTMLAnchorElement>);
    expect(preventDefaultPrimary).toHaveBeenCalledOnce();
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth", block: "start" });

    section.remove();
  });
});
