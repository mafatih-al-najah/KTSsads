import { describe, expect, it } from "vitest";
import { arabicBooks, excellenceBooks } from "@/data/site";

const excellenceOnlyLinks: Record<string, string> = {
  "كتاب الرياضيات 2026": "1EN0LIDZN_ymVHXiaQF4kncpE9aSXm9CO",
  "كتاب الكيمياء 2026": "1JEXSDXHSZCJXTqR4OtG22Rvl-z3KSgmv",
  "كتاب الفيزياء 2026": "1flw96J7Wl0pI3dEEX3_smVCGmAZfVr5G",
  "كتاب الأحياء 2026": "1OSvisgHSGhgk6AMlTY68Cn3bMAtgV-o0",
};

describe("Excellence-track books", () => {
  it("keeps the exact same books and order as the Arabic-curriculum list", () => {
    expect(excellenceBooks.map((book) => book.label)).toEqual(
      arabicBooks.map((book) => book.label),
    );
    expect(excellenceBooks.map((book) => book.parts.map((part) => part.label))).toEqual(
      arabicBooks.map((book) => book.parts.map((part) => part.label)),
    );
  });

  it("uses the excellence-track links for maths, chemistry, physics and biology", () => {
    for (const [label, fileId] of Object.entries(excellenceOnlyLinks)) {
      const book = excellenceBooks.find((item) => item.label === label);
      expect(book?.parts).toHaveLength(1);
      expect(book?.parts[0]?.url).toContain(fileId);
    }
  });

  it("keeps the shared links for the other books", () => {
    for (const book of arabicBooks) {
      if (excellenceOnlyLinks[book.label]) continue;
      const twin = excellenceBooks.find((item) => item.label === book.label);
      expect(twin?.parts.map((part) => part.url)).toEqual(book.parts.map((part) => part.url));
    }
  });

  it("spells the top-students label with تفوق", () => {
    const french = excellenceBooks.find((book) => book.label.includes("الفرنسي"));
    expect(french?.label).toBe("كتاب الفرنسي 2026 (للمتفوقين)");
    expect(excellenceBooks.some((book) => book.label.includes("المتوفقين"))).toBe(false);
    expect(arabicBooks.some((book) => book.label.includes("المتوفقين"))).toBe(false);
  });
});
