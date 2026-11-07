import { describe, expect, it } from "vitest";
import { pdfLinks } from "@/lib/pdf-links";
import { arabicBooks } from "@/data/site";

describe("Book PDF links", () => {
  it("uses Drive preview inside the site and a download URL for the same book", () => {
    expect(pdfLinks("https://drive.google.com/file/d/book_123/view?usp=sharing")).toEqual({
      preview: "https://drive.google.com/file/d/book_123/preview",
      download: "https://drive.google.com/uc?export=download&id=book_123",
      isDrive: true,
    });
  });
  it("supports Drive open links regardless of query parameter order", () => {
    expect(pdfLinks("https://drive.google.com/open?usp=sharing&id=book_456").download)
      .toBe("https://drive.google.com/uc?export=download&id=book_456");
  });
  it("keeps local PDFs available", () => {
    expect(pdfLinks(" /files/book.pdf ").preview).toBe("/files/book.pdf");
  });
  it("provides separate files for the two Arabic book parts", () => {
    const book = arabicBooks.find((item) => item.label === "كتاب اللغة العربية 2026");
    expect(book?.parts).toHaveLength(2);
    expect(book?.parts[0]?.url).toContain("1gnacaVOCO7CqgJH74j7monJij_LFewmD");
    expect(book?.parts[1]?.url).toContain("1TztHvEUgty3NS5yJ-SiGLQffsxyQCS2r");
  });
});