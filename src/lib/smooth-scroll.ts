import type { MouseEvent, MouseEventHandler } from "react";

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function getScrollBehavior(): ScrollBehavior {
  return prefersReducedMotion() ? "auto" : "smooth";
}

export function smoothScrollToId(targetId: string): boolean {
  if (typeof document === "undefined") {
    return false;
  }

  const target = document.getElementById(targetId);
  if (!target) {
    return false;
  }

  const behavior = getScrollBehavior();

  if (typeof target.scrollIntoView === "function") {
    target.scrollIntoView({ behavior, block: "start" });
  } else if (typeof window !== "undefined" && typeof window.scrollTo === "function") {
    const headerOffset = 104;
    const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - headerOffset);
    window.scrollTo({ top, behavior });
  }

  if (typeof window !== "undefined" && typeof window.history?.replaceState === "function") {
    window.history.replaceState(null, "", `#${targetId}`);
  }

  return true;
}

export function smoothScrollToTop(): void {
  if (typeof window === "undefined" || typeof window.scrollTo !== "function") {
    return;
  }

  window.scrollTo({ top: 0, behavior: getScrollBehavior() });
}

export function createAnchorClickHandler(targetId: string): MouseEventHandler<HTMLAnchorElement> {
  return (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    smoothScrollToId(targetId);
  };
}
