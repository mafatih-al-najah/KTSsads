import { fireEvent, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@tanstack/react-router", () => ({
  Link: ({
    to,
    children,
    className,
    onClick,
  }: {
    to: string;
    children: ReactNode;
    className?: string;
    onClick?: () => void;
  }) => (
    <a href={to} className={className} onClick={onClick}>
      {children}
    </a>
  ),
}));

import { WelcomeHero } from "@/components/WelcomeHero";

describe("WelcomeHero", () => {
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

  it("renders welcome heading with مفاتيح النجاح and smooth-scroll links to curriculum sections", () => {
    render(<WelcomeHero />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("مرحباً بك في");
    expect(heading).toHaveTextContent("مفاتيح النجاح");

    expect(
      screen.getByText(/منصّتك الدراسية الشاملة لطلبة السادس الإعدادي ومدارس المتميزين/),
    ).toBeInTheDocument();

    const cta = screen.getByRole("link", { name: /الانتقال إلى أقسام المناهج/ });
    expect(cta).toHaveAttribute("href", "#curricula");

    const booksLink = screen.getByRole("link", { name: /مكتبة الكتب/ });
    expect(booksLink).toHaveAttribute("href", "/books");

    expect(screen.getByRole("link", { name: /منهج المتميزين/ })).toHaveAttribute(
      "href",
      "#excellence-curriculum",
    );
    expect(screen.getByRole("link", { name: /المنهج العربي/ })).toHaveAttribute(
      "href",
      "#arabic-curriculum",
    );
    expect(screen.getByRole("link", { name: /الكتب الرسمية/ })).toHaveAttribute(
      "href",
      "#books-curriculum",
    );
  });

  it("smoothly scrolls to target curriculum sections when hero section links are clicked", () => {
    const curriculaTarget = document.createElement("section");
    curriculaTarget.id = "curricula";
    const scrollIntoView = vi.fn();
    curriculaTarget.scrollIntoView = scrollIntoView;
    document.body.appendChild(curriculaTarget);

    const arabicTarget = document.createElement("article");
    arabicTarget.id = "arabic-curriculum";
    const arabicScrollIntoView = vi.fn();
    arabicTarget.scrollIntoView = arabicScrollIntoView;
    document.body.appendChild(arabicTarget);

    render(<WelcomeHero />);

    fireEvent.click(screen.getByRole("link", { name: /الانتقال إلى أقسام المناهج/ }));
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth", block: "start" });

    fireEvent.click(screen.getByRole("link", { name: /المنهج العربي/ }));
    expect(arabicScrollIntoView).toHaveBeenCalledWith({ behavior: "smooth", block: "start" });

    curriculaTarget.remove();
    arabicTarget.remove();
  });
});
