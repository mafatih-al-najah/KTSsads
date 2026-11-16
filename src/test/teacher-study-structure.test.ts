import { describe, expect, it } from "vitest";
import { teacherHomework, teacherStudyStructure } from "@/data/site";

describe("teacher study structure", () => {
  const sectionsFor = (slug: string) =>
    teacherStudyStructure.find((item) => item.slug === slug)?.sections ?? [];

  it("shows all eight subjects and an assignments list for each", () => {
    expect(teacherStudyStructure).toHaveLength(8);
    expect(teacherHomework.map((item) => item.subject)).toEqual(
      teacherStudyStructure.map((item) => item.subject),
    );
  });

  it("includes the requested chapter and unit counts", () => {
    expect(sectionsFor("math")).toHaveLength(5);
    expect(sectionsFor("math").map((item) => item.label)).toEqual([
      "الفصل الأول | CHAPTER 1",
      "الفصل الثاني | CHAPTER 2",
      "الفصل الثالث | CHAPTER 3",
      "الفصل الرابع | CHAPTER 4",
      "الفصل الخامس | CHAPTER 5",
    ]);
    expect(sectionsFor("english")).toHaveLength(8);
    expect(sectionsFor("english")[0]?.label).toBe("يونت 1 | UNIT 1");
    expect(sectionsFor("english")[7]?.label).toBe("يونت 8 | UNIT 8");
    expect(sectionsFor("chemistry")).toHaveLength(8);
    expect(sectionsFor("physics")).toHaveLength(9);
    expect(sectionsFor("biology")).toHaveLength(5);
    expect(sectionsFor("islamic")).toHaveLength(5);
    expect(sectionsFor("french").map((item) => item.label)).toEqual([
      "المنهج الجديد",
      "المنهج القديم",
    ]);
  });

  it("lists grammar and literature under both Arabic book parts", () => {
    const arabicParts = sectionsFor("arabic");
    expect(arabicParts).toHaveLength(2);
    expect(arabicParts.map((part) => part.children?.map((item) => item.label))).toEqual([
      ["القواعد", "الأدب"],
      ["القواعد", "الأدب"],
    ]);
  });
});
