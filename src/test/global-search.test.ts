import { describe, expect, it } from "vitest";
import { buildSearchIndex, normalizeSearchText, searchContent } from "@/lib/global-search";

describe("global-search", () => {
  it("normalizes Arabic alef variants, taa marbuta, yaa, and diacritics", () => {
    expect(normalizeSearchText("الإِسْلامِيَّة")).toBe("الاسلاميه");
    expect(normalizeSearchText("أحمد النعيمي")).toBe("احمد النعيمي");
    expect(normalizeSearchText("الأحياء")).toBe("الاحياء");
  });

  it("finds notes by title and resolves direct chapter route", () => {
    const index = buildSearchIndex();
    const results = searchContent("كلاميات الفصل الاول", "notes", index);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0]?.title).toBe("كلاميات الفصل الأول");
    expect(results[0]?.to).toBe("/notes/teachers/physics/issam-alshamri/chapters/chapter-1");
  });

  it("resolves nested Arabic section hashes for grammar notes", () => {
    const index = buildSearchIndex();
    const results = searchContent("اسلوب الاستفهام", "notes", index);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0]?.to).toBe("/notes/teachers/arabic/aqil-alzubaidi/chapters/part-one");
    expect(results[0]?.hash).toBe("grammar");
  });

  it("finds books by Arabic title regardless of hamza spelling", () => {
    const index = buildSearchIndex();
    const results = searchContent("اسلاميه", "books", index);
    expect(results.some((r) => r.title.includes("الإسلامية") && r.to === "/books/arabic/0")).toBe(
      true,
    );
  });

  it("finds teachers and links to their subject page", () => {
    const index = buildSearchIndex();
    const results = searchContent("حيدر وليد", "teachers", index);
    expect(results[0]?.title).toBe("حيدر وليد");
    expect(results[0]?.to).toBe("/notes/teachers/math/hayder-walid");
  });

  it("finds guides, minimums, and study tips by topic", () => {
    const index = buildSearchIndex();
    expect(searchContent("الطب", "guides", index).some((r) => r.to === "/minimums")).toBe(true);
    expect(searchContent("امتيازات", "guides", index).some((r) => r.to === "/excellence")).toBe(
      true,
    );
    expect(searchContent("الوزارية", "guides", index).some((r) => r.to === "/tips")).toBe(true);
  });

  it("supports multi-word queries across title and topic", () => {
    const index = buildSearchIndex();
    const results = searchContent("واجبات الفيزياء", "notes", index);
    expect(results.length).toBeGreaterThanOrEqual(3);
    expect(results.every((r) => r.topic === "الفيزياء")).toBe(true);
  });

  it("returns empty array when no items match", () => {
    const index = buildSearchIndex();
    expect(searchContent("كلمة_غير_موجودة_12345", "all", index)).toEqual([]);
  });
});
