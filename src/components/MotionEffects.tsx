import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/lib/smooth-scroll";

const TACTILE_SELECTOR =
  "button, [role='button'], [role='tab'], .btn-brand, .btn-lime, .btn-surface, .card-lift, .part-card, .tactile-card, a[data-tactile='true']";

export function MotionEffects() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId = 0;

    const updateProgress = () => {
      rafId = 0;
      const doc = document.documentElement;
      const maxScroll = Math.max(0, doc.scrollHeight - window.innerHeight);
      if (maxScroll <= 0) {
        setProgress(0);
        return;
      }
      setProgress(Math.min(1, Math.max(0, window.scrollY / maxScroll)));
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const clearTapTimers = new WeakMap<HTMLElement, number>();

    const triggerTactile = (target: HTMLElement, clientX?: number, clientY?: number) => {
      if (prefersReducedMotion()) return;
      if (
        (target as HTMLButtonElement).disabled ||
        target.getAttribute("aria-disabled") === "true"
      ) {
        return;
      }

      const prevTimer = clearTapTimers.get(target);
      if (prevTimer) window.clearTimeout(prevTimer);

      target.dataset["tapping"] = "true";
      const timer = window.setTimeout(() => {
        delete target.dataset["tapping"];
        clearTapTimers.delete(target);
      }, 190);
      clearTapTimers.set(target, timer);

      const computed = window.getComputedStyle(target);
      if (computed.overflow !== "hidden" && !target.classList.contains("ripple-surface")) {
        return;
      }

      const rect = target.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const diameter = Math.max(rect.width, rect.height) * 1.45;
      const x = typeof clientX === "number" && clientX > 0 ? clientX - rect.left : rect.width / 2;
      const y = typeof clientY === "number" && clientY > 0 ? clientY - rect.top : rect.height / 2;

      const ripple = document.createElement("span");
      ripple.className = "tap-ripple";
      ripple.setAttribute("aria-hidden", "true");
      ripple.style.width = `${diameter}px`;
      ripple.style.height = `${diameter}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      target.appendChild(ripple);
      window.setTimeout(() => {
        ripple.remove();
      }, 560);
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0 && event.pointerType === "mouse") return;
      const el = (event.target as Element | null)?.closest<HTMLElement>(TACTILE_SELECTOR);
      if (!el) return;
      triggerTactile(el, event.clientX, event.clientY);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      const el = (event.target as Element | null)?.closest<HTMLElement>(TACTILE_SELECTOR);
      if (!el) return;
      triggerTactile(el);
    };

    document.addEventListener("pointerdown", onPointerDown, { capture: true, passive: true });
    document.addEventListener("keydown", onKeyDown, { capture: true, passive: true });

    return () => {
      document.removeEventListener("pointerdown", onPointerDown, { capture: true });
      document.removeEventListener("keydown", onKeyDown, { capture: true });
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[2.5px] overflow-hidden bg-transparent"
    >
      <div
        className="h-full w-full origin-right bg-gradient-to-l from-primary via-accent to-primary transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
