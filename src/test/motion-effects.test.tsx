import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MotionEffects } from "@/components/MotionEffects";

describe("MotionEffects", () => {
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

  it("applies tactile press state and spawns tap ripple on button pointerdown", () => {
    render(
      <div>
        <MotionEffects />
        <button type="button" style={{ overflow: "hidden" }}>
          زر تفاعلي
        </button>
      </div>,
    );

    const btn = screen.getByRole("button", { name: "زر تفاعلي" });
    vi.spyOn(btn, "getBoundingClientRect").mockReturnValue({
      left: 0,
      top: 0,
      width: 120,
      height: 44,
      right: 120,
      bottom: 44,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    });

    fireEvent.pointerDown(btn, { clientX: 60, clientY: 22, button: 0, pointerType: "touch" });

    expect(btn.dataset["tapping"]).toBe("true");
    expect(btn.querySelector(".tap-ripple")).not.toBeNull();
  });

  it("skips ripple and tapping state when prefers-reduced-motion is enabled", () => {
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

    render(
      <div>
        <MotionEffects />
        <button type="button" style={{ overflow: "hidden" }}>
          زر هادئ
        </button>
      </div>,
    );

    const btn = screen.getByRole("button", { name: "زر هادئ" });
    fireEvent.pointerDown(btn, { clientX: 20, clientY: 20, button: 0, pointerType: "mouse" });

    expect(btn.dataset["tapping"]).toBeUndefined();
    expect(btn.querySelector(".tap-ripple")).toBeNull();
  });
});
