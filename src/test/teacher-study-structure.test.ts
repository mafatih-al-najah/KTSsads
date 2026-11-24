import { describe, expect, it } from "vitest";
import {
  arabicCurriculumChapterNotes,
  chapterNotes,
  homeworkNotes,
  notesTracks,
  subjectTeachers,
  teacherStudyStructure,
} from "@/data/site";

describe("teacher study structure", () => {
  const sectionsFor = (slug: string) =>
    teacherStudyStructure.find((item) => item.slug === slug)?.sections ?? [];

  it("offers excellence and Arabic-curriculum tracks with all eight subjects", () => {
    expect(notesTracks.map((t) => t.title)).toEqual(["ملازم المتميزين", "ملازم المنهج العربي"]);
    for (const t of notesTracks) expect(t.structure).toHaveLength(8);
  });

  it("Arabic curriculum French is for outstanding students and includes old and new curricula", () => {
    const french = notesTracks[1]?.structure.find((s) => s.slug === "french");
    expect(french?.note).toBe("لطلاب المتفوقين فقط");
    expect(french?.sections.map((s) => s.slug)).toEqual(["old-curriculum", "new-curriculum"]);
  });

  it("lists the three French teachers and Othman-only old-curriculum ministerial booklet in both tracks", () => {
    expect(subjectTeachers["french"]?.map((t) => t.name)).toEqual([
      "محمد علي الكناني",
      "رنا زهير",
      "عثمان النعيمي",
    ]);
    for (const notesBySubject of [chapterNotes, arabicCurriculumChapterNotes]) {
      const basic = notesBySubject["french"]?.["old-curriculum/basic-booklet"] ?? [];
      const ministerial = notesBySubject["french"]?.["old-curriculum/old-ministerial"] ?? [];
      expect(basic.map((r) => r.teacher)).toEqual([
        "محمد علي الكناني",
        "رنا زهير",
        "عثمان النعيمي",
      ]);
      expect(ministerial.map((r) => r.teacher)).toEqual(["عثمان النعيمي"]);
    }
  });

  it("has physics notes and homework for chapters 1-3 by عصام الشمري 2027", () => {
    expect(chapterNotes["physics"]?.["chapter-1"]?.[0]?.label).toBe("كلاميات الفصل الأول");
    expect(homeworkNotes["physics"]?.["chapter-2"]?.[0]?.parts[0]?.telegramUrl).toBe(
      "https://telegram.me/mafatee7_test_bot?start=6631657380",
    );
    expect(homeworkNotes["physics"]?.["chapter-3"]?.[0]?.teacher).toBe("عصام الشمري");
    expect(chapterNotes["arabic"]?.["part-one/grammar"]).toHaveLength(5);
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
      "المنهج القديم",
      "المنهج الجديد",
    ]);
    expect(sectionsFor("french")[0]?.children?.map((c) => c.label)).toEqual([
      "الملزمة الأساسية",
      "وزاريات المنهج القديم",
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
