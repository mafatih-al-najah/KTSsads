import {
  announcements,
  arabicBooks,
  excellence,
  excellenceBooks,
  indicatedBooks,
  minimums,
  notesTracks,
  subjectTeachers,
  teacherAds,
  teacherNotes,
  tips,
} from "@/data/site";
import type { StudyResource } from "@/lib/download-options";

export type SearchCategory = "all" | "notes" | "books" | "teachers" | "guides";
export type SearchItemCategory = Exclude<SearchCategory, "all">;

export type SearchItem = {
  id: string;
  title: string;
  subtitle: string;
  category: SearchItemCategory;
  topic: string;
  keywords: string[];
  to: string;
  hash?: string;
};

export const searchCategoryLabels: Record<SearchCategory, string> = {
  all: "الكل",
  notes: "الملازم",
  books: "الكتب",
  teachers: "المدرسون",
  guides: "الأدلة والنصائح",
};

export const quickSearchTopics = [
  "الفيزياء",
  "العربي",
  "الرياضيات",
  "الكيمياء",
  "الأحياء",
  "الإنكليزي",
  "الإسلامية",
  "الفرنسي",
];

const ARABIC_DIACRITICS_RE = /[\u064B-\u065F\u0670\u0640]/g;

export function normalizeSearchText(value: string): string {
  return value
    .replace(ARABIC_DIACRITICS_RE, "")
    .replace(/[أإآ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function subjectTopicKeywords(subjectName: string, slug: string): string[] {
  const keywords = [subjectName, slug];
  if (slug === "english") keywords.push("انكليزي", "انجليزي", "English");
  if (slug === "arabic") keywords.push("اللغة العربية", "قواعد", "ادب", "Arabic");
  if (slug === "physics") keywords.push("فيزياء", "كلاميات", "Physics");
  if (slug === "chemistry") keywords.push("كيمياء", "Chemistry");
  if (slug === "biology") keywords.push("احياء", "أحياء", "Biology");
  if (slug === "math") keywords.push("رياضيات", "Math");
  if (slug === "islamic") keywords.push("اسلامية", "إسلامية", "Islamic");
  if (slug === "french") keywords.push("فرنسي", "French");
  return keywords;
}

function findSectionLabel(
  sections: { slug: string; label: string; children?: { slug: string; label: string }[] }[],
  sectionKey: string,
): { chapterSlug: string; childSlug?: string; sectionLabel: string } {
  const [chapterSlug = sectionKey, childSlug] = sectionKey.split("/");
  const section = sections.find((s) => s.slug === chapterSlug);
  const child = childSlug ? section?.children?.find((c) => c.slug === childSlug) : undefined;
  const sectionLabel = [section?.label, child?.label].filter(Boolean).join(" · ") || sectionKey;
  return childSlug ? { chapterSlug, childSlug, sectionLabel } : { chapterSlug, sectionLabel };
}

function pushResourceNotes(
  items: SearchItem[],
  resourcesByKey: Partial<Record<string, Partial<Record<string, StudyResource[]>>>>,
  track: (typeof notesTracks)[number],
  kind: "chapters" | "homework",
) {
  const kindLabel = kind === "homework" ? "الواجبات" : "الفصول";
  for (const subject of track.structure) {
    const subjectEntries = resourcesByKey[subject.slug];
    if (!subjectEntries) continue;
    const teachers = subjectTeachers[subject.slug] ?? [];

    for (const [sectionKey, resources] of Object.entries(subjectEntries)) {
      if (!resources?.length) continue;
      const { chapterSlug, childSlug, sectionLabel } = findSectionLabel(
        subject.sections,
        sectionKey,
      );

      resources.forEach((resource, idx) => {
        const matchedTeacher = teachers.find(
          (t) => normalizeSearchText(t.name) === normalizeSearchText(resource.teacher ?? ""),
        );
        const to = !matchedTeacher
          ? `/notes/${track.slug}/${subject.slug}`
          : subject.slug === "french"
            ? childSlug
              ? `/notes/${track.slug}/${subject.slug}/${matchedTeacher.slug}/${chapterSlug}/${childSlug}`
              : `/notes/${track.slug}/${subject.slug}/${matchedTeacher.slug}/${chapterSlug}`
            : `/notes/${track.slug}/${subject.slug}/${matchedTeacher.slug}/${kind}/${chapterSlug}`;
        const metaParts = [
          track.title,
          subject.subject,
          resource.teacher,
          sectionLabel,
          subject.slug === "french" ? undefined : kindLabel,
          resource.year,
        ].filter(Boolean);

        const item: SearchItem = {
          id: `note-${track.slug}-${subject.slug}-${kind}-${sectionKey}-${idx}-${resource.label}`,
          title: resource.label,
          subtitle: metaParts.join(" · "),
          category: "notes",
          topic: subject.subject,
          keywords: [
            ...subjectTopicKeywords(subject.subject, subject.slug),
            track.title,
            kindLabel,
            sectionLabel,
            resource.teacher ?? "",
            resource.year ?? "",
            ...resource.parts.map((p) => p.label),
          ].filter(Boolean),
          to,
        };
        if (matchedTeacher && childSlug && subject.slug !== "french") {
          item.hash = childSlug;
        }
        items.push(item);
      });
    }
  }
}

export function buildSearchIndex(): SearchItem[] {
  const items: SearchItem[] = [];

  for (const track of notesTracks) {
    pushResourceNotes(items, track.chapters, track, "chapters");
    pushResourceNotes(items, track.homework, track, "homework");

    for (const subject of track.structure) {
      items.push({
        id: `subject-${track.slug}-${subject.slug}`,
        title: `${track.title} — ${subject.subject}`,
        subtitle: [track.title, subject.note ?? "تصفح المدرسين والفصول والواجبات"].join(" · "),
        category: "notes",
        topic: subject.subject,
        keywords: [...subjectTopicKeywords(subject.subject, subject.slug), track.title, "ملازم"],
        to: `/notes/${track.slug}/${subject.slug}`,
      });
    }
  }

  for (const entry of teacherNotes) {
    const structureMatch = notesTracks[0]?.structure.find((s) => s.subject === entry.subject);
    if (!structureMatch) continue;
    entry.notes.forEach((resource, idx) => {
      items.push({
        id: `extra-note-${structureMatch.slug}-${idx}`,
        title: resource.label,
        subtitle: ["ملازم المتميزين", entry.subject, resource.teacher, resource.year]
          .filter(Boolean)
          .join(" · "),
        category: "notes",
        topic: entry.subject,
        keywords: [
          ...subjectTopicKeywords(entry.subject, structureMatch.slug),
          resource.teacher ?? "",
          resource.year ?? "",
        ].filter(Boolean),
        to: `/notes/teachers/${structureMatch.slug}`,
      });
    });
  }

  for (const subject of notesTracks[0]?.structure ?? []) {
    const teachers = subjectTeachers[subject.slug] ?? [];
    for (const teacher of teachers) {
      items.push({
        id: `teacher-${subject.slug}-${teacher.slug}`,
        title: teacher.name,
        subtitle: `مدرس مادة ${subject.subject} · ملازم المتميزين`,
        category: "teachers",
        topic: subject.subject,
        keywords: [
          teacher.name,
          ...subjectTopicKeywords(subject.subject, subject.slug),
          "مدرس",
          "استاذ",
          "ملازم",
        ],
        to: `/notes/teachers/${subject.slug}/${teacher.slug}`,
      });
    }
  }

  arabicBooks.forEach((book, index) => {
    items.push({
      id: `arabic-book-${index}`,
      title: book.label,
      subtitle: ["كتب المنهج العربي", book.parts.length ? `${book.parts.length} جزء` : "قريباً"]
        .filter(Boolean)
        .join(" · "),
      category: "books",
      topic: "كتب المنهج العربي",
      keywords: [book.label, "كتاب", "كتب", "المنهج العربي", ...book.parts.map((p) => p.label)],
      to: `/books/arabic/${index}`,
    });
  });

  excellenceBooks.forEach((book, index) => {
    items.push({
      id: `excellence-book-${index}`,
      title: book.label,
      subtitle: ["كتب منهج المتميزين", book.parts.length ? `${book.parts.length} جزء` : "قريباً"]
        .filter(Boolean)
        .join(" · "),
      category: "books",
      topic: "كتب منهج المتميزين",
      keywords: [book.label, "كتاب", "كتب", "المتميزين", ...book.parts.map((p) => p.label)],
      to: `/books/excellence/${index}`,
    });
  });

  indicatedBooks.forEach((book, index) => {
    items.push({
      id: `indicated-book-${index}`,
      title: book.label,
      subtitle: "الكتب المؤشرة",
      category: "books",
      topic: "الكتب المؤشرة",
      keywords: [book.label, "كتاب", "مؤشر", "الكتب المؤشرة"],
      to: "/notes/indicated",
    });
  });

  items.push(
    {
      id: "section-arabic-books",
      title: "كتب المنهج العربي",
      subtitle: "جميع كتب المناهج العربية للسادس الإعدادي",
      category: "books",
      topic: "الكتب",
      keywords: ["كتب", "المنهج العربي", "سادس اعدادي"],
      to: "/books/arabic",
    },
    {
      id: "section-excellence-books",
      title: "كتب منهج المتميزين",
      subtitle: "كتب مدارس المتميزين لجميع المواد",
      category: "books",
      topic: "الكتب",
      keywords: ["كتب", "المتميزين", "منهج المتميزين"],
      to: "/books/excellence",
    },
    {
      id: "section-indicated-books",
      title: "الكتب المؤشرة",
      subtitle: "ملازم ومنهجيات الكتب المؤشرة",
      category: "books",
      topic: "الكتب",
      keywords: ["الكتب المؤشرة", "مؤشرة", "وزارة"],
      to: "/notes/indicated",
    },
  );

  items.push({
    id: "guide-excellence",
    title: "امتيازات المتميزين 2026",
    subtitle: "ملف امتيازات طلاب المتميزين وشروط القبول والمميزات",
    category: "guides",
    topic: "امتيازات المتميزين",
    keywords: [
      "امتيازات المتميزين",
      "2026",
      "pdf",
      ...excellence.flatMap((e) => [e.title, e.body]),
    ],
    to: "/excellence",
  });

  items.push({
    id: "guide-minimums",
    title: "الحدود الدنيا دفعة 2026 (متميزين)",
    subtitle: "ملف الحدود الدنيا للقبول المركزي ومعدلات الكليات",
    category: "guides",
    topic: "الحدود الدنيا",
    keywords: [
      "الحدود الدنيا",
      "القبول المركزي",
      "2026",
      "معدلات",
      ...minimums.flatMap((m) => [m.college, m.score]),
    ],
    to: "/minimums",
  });

  tips.forEach((tip, index) => {
    items.push({
      id: `tip-${index}`,
      title: tip.title,
      subtitle: `نصائح الطلاب · ${tip.body}`,
      category: "guides",
      topic: "نصائح الطلاب",
      keywords: [tip.title, tip.body, "نصائح", "دراسة", "تنظيم الوقت", "وزاريات"],
      to: "/tips",
    });
  });

  announcements.forEach((item, index) => {
    items.push({
      id: `announcement-${index}`,
      title: item.title,
      subtitle: `أخبار القناة · ${item.date} · ${item.body}`,
      category: "guides",
      topic: "الإعلانات",
      keywords: [item.title, item.body, item.date, "اعلانات", "اخبار"],
      to: "/announcements",
    });
  });

  teacherAds.forEach((ad, index) => {
    items.push({
      id: `teacher-ad-${index}`,
      title: ad.title,
      subtitle: `إعلانات المدرسين · ${ad.subject} · ${ad.teacher}`,
      category: "guides",
      topic: ad.subject,
      keywords: [ad.title, ad.teacher, ad.subject, ad.body, "اعلانات", "تسجيل"],
      to: "/announcements",
    });
  });

  items.push({
    id: "guide-correctors",
    title: "التواصل مع مصحح خاص",
    subtitle: "مصححون لجميع المواد عبر التليكرام",
    category: "guides",
    topic: "المصححون",
    keywords: ["مصححون", "مصحح خاص", "تصحيح", "تليكرام"],
    to: "/correctors",
  });

  return items;
}

let cachedIndex: SearchItem[] | undefined;

export function getSearchIndex(): SearchItem[] {
  if (!cachedIndex) {
    cachedIndex = buildSearchIndex();
  }
  return cachedIndex;
}

function scoreItem(item: SearchItem, tokens: string[]): number {
  const titleNorm = normalizeSearchText(item.title);
  const topicNorm = normalizeSearchText(item.topic);
  const subtitleNorm = normalizeSearchText(item.subtitle);
  const keywordsNorm = item.keywords.map(normalizeSearchText);

  let totalScore = 0;

  for (const token of tokens) {
    let tokenScore = 0;

    if (titleNorm === token) {
      tokenScore = 100;
    } else if (titleNorm.startsWith(token)) {
      tokenScore = 80;
    } else if (titleNorm.includes(token)) {
      tokenScore = 60;
    } else if (topicNorm === token || topicNorm.includes(token)) {
      tokenScore = 45;
    } else if (keywordsNorm.some((kw) => kw.includes(token))) {
      tokenScore = 30;
    } else if (subtitleNorm.includes(token)) {
      tokenScore = 20;
    }

    if (tokenScore === 0) return 0;
    totalScore += tokenScore;
  }

  return totalScore;
}

export function searchContent(
  query: string,
  category: SearchCategory = "all",
  items: SearchItem[] = getSearchIndex(),
): SearchItem[] {
  const normalized = normalizeSearchText(query);
  const scoped = category === "all" ? items : items.filter((item) => item.category === category);

  if (!normalized) {
    return scoped;
  }

  const tokens = normalized.split(" ").filter(Boolean);
  const scored: { item: SearchItem; score: number }[] = [];

  for (const item of scoped) {
    const score = scoreItem(item, tokens);
    if (score > 0) {
      scored.push({ item, score });
    }
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.map((entry) => entry.item);
}

export function getFeaturedSuggestions(items: SearchItem[] = getSearchIndex()): SearchItem[] {
  const featuredIds = [
    "note-teachers-physics-chapters-chapter-1-0-كلاميات الفصل الأول",
    "note-teachers-arabic-chapters-part-one/grammar-0-ملزمة أستاذنا — أسلوب الاستفهام",
    "arabic-book-0",
    "arabic-book-1",
    "guide-excellence",
    "guide-minimums",
  ];
  const byId = new Map(items.map((item) => [item.id, item]));
  const picked: SearchItem[] = [];
  for (const id of featuredIds) {
    const match = byId.get(id);
    if (match) picked.push(match);
  }
  return picked.length > 0 ? picked : items.slice(0, 6);
}
