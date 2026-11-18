// ✏️ هذا الملف يحتوي على كل محتوى الموقع — عدّل الروابط والأسماء هنا فقط.
import type { StudyResource } from "@/lib/download-options";

export const site = {
  name: "مفاتيح النجاح",
  tagline: "قناة خاصة بتوفير جميع ما يحتاجه الطلاب في مدارس المتميزين",
  telegramChannel: "https://t.me/sad6ths",
  sanaatChannel: "https://t.me/ii999uu",
  whatsappGroup: "https://wa.me/qr/PUOF24PJJNW6A1?s=r",
  contactUsername: "accKTS",
  email: "Sad6kts@gmail.com",
  donateUsername: "i1_h0",

  // 🖼️ شعار الموقع: الصق هنا رابط الصورة المباشر (ينتهي بـ .png أو .jpg).
  // إذا تركته فارغاً "" يظهر الشعار الحالي الموجود بملفات الموقع.
  // ملاحظة: روابط معاينة imghippo (https://www.imghippo.com/i/...) ليست روابط صور مباشرة
  // ويحظر خادمها التضمين الخارجي. استخدم رابطاً مباشراً ينتهي بصورة فعلية أو اتركه فارغاً.
  logoUrl: "",

  // 🖼️ صورة صفحة «امتياز المتميزين 2026»: الصق هنا رابط الصورة المباشر.
  // إذا تركته فارغاً "" تظهر جملة «سيتم نشر الصورة قريباً» بدل الصورة.
  // ملاحظة: روابط معاينة imghippo ليست روابط صور مباشرة ويحظر خادمها التضمين الخارجي،
  // لذا الصورة محفوظة محلياً في public/excellence-2026.jpg.
  excellenceImageUrl: "/excellence-2026.jpg",
};

export const subjects = [
  "العربي",
  "الإنكليزي",
  "الرياضيات",
  "الإسلامية",
  "الأحياء",
  "الفرنسي",
  "الكيمياء",
  "الفيزياء",
] as const;

export const governorates = [
  "بغداد",
  "البصرة",
  "نينوى",
  "أربيل",
  "النجف",
  "كربلاء",
  "بابل",
  "ذي قار",
  "ديالى",
  "الأنبار",
  "كركوك",
  "صلاح الدين",
  "واسط",
  "ميسان",
  "المثنى",
  "القادسية",
  "السليمانية",
  "دهوك",
] as const;

// المدرسون: أضف لكل محافظة ومادة اسم المدرس ويوزر التليكرام
// مثال: "بغداد": { "الرياضيات": { name: "أ. أحمد", username: "ahmed_math" } }
export const teachers: Partial<
  Record<string, Partial<Record<string, { name: string; username: string }>>>
> = {
  بغداد: { الرياضيات: { name: "أ. مثال", username: "example_teacher" } },
};

// المصححون: غيّر اليوزر هنا متى شئت
export const correctors = [
  { name: "المصحح الأول", subject: "الرياضيات والفيزياء", username: "corrector_1" },
  { name: "المصحح الثاني", subject: "الكيمياء والأحياء", username: "corrector_2" },
  { name: "المصحح الثالث", subject: "العربي والإسلامية", username: "corrector_3" },
  { name: "المصحح الرابع", subject: "الإنكليزي والفرنسي", username: "corrector_4" },
];

export const announcements = [
  {
    date: "2026-10-15",
    title: "انطلاق العام الدراسي 2026",
    body: "تابعوا القناة للحصول على جدول الملازم والمراجعات الأسبوعية.",
  },
  {
    date: "2026-10-10",
    title: "ملازم جديدة متوفرة",
    body: "تمت إضافة ملازم الفيزياء والكيمياء المحدثة في قسم الملازم.",
  },
];

// امتياز المتميزين 2026
export const excellence = [
  {
    title: "شروط الانضمام",
    body: "معدل 95 فما فوق في نصف السنة، والالتزام بالاختبارات الأسبوعية.",
  },
  { title: "المميزات", body: "ملازم حصرية، مراجعات مباشرة، ومتابعة شخصية من المصححين." },
  { title: "طريقة التسجيل", body: "راسل الإدارة عبر التليكرام مع صورة نتيجتك." },
];

// الحدود الدنيا دفعة 2026 (حدّثها عند صدور النتائج)
export const minimums = [
  { college: "الطب", score: "98.53" },
  { college: "طب الأسنان", score: "96.99" },
  { college: "الصيدلة", score: "95.73" },
  { college: "الهندسة", score: "75.37" },
  { college: "التمريض", score: "90.8" },
  { college: "العلوم", score: "70.43" },
  { college: "القانون", score: "79.54" },
  { college: "التربية", score: "70.41" },
];

export const tips = [
  { title: "نظّم وقتك", body: "قسّم يومك إلى جلسات دراسة قصيرة (45 دقيقة) مع راحة 10 دقائق." },
  { title: "حل الأسئلة الوزارية", body: "الأسئلة الوزارية للسنوات السابقة هي أفضل مقياس لمستواك." },
  { title: "النوم الكافي", body: "7 إلى 8 ساعات نوم تثبّت المعلومات وتحسّن التركيز." },
  { title: "راجع باستمرار", body: "المراجعة الأسبوعية تمنع تراكم المادة قبل الامتحان." },
  { title: "ابتعد عن المشتتات", body: "ضع الهاتف بعيداً أثناء الدراسة واستخدمه فقط للمصادر." },
  { title: "ثق بنفسك", body: "النجاح يبدأ بالإيمان بقدرتك، ومفاتيح النجاح معك خطوة بخطوة." },
];

export const tg = (u: string) => `https://t.me/${u.replace(/^@/, "")}`;

// 📄 ملفات PDF: ضع رابط الملف بين علامتي التنصيص.
// الطريقة: ارفع الملف على Google Drive ← مشاركة ← "أي شخص لديه الرابط" ← انسخ الرابط والصقه هنا.
// أو ضع الملف داخل مجلد public/files باسم مثل excellence.pdf واكتب هنا "/files/excellence.pdf"
export const pdfFiles = {
  excellence: "/امتيازات_المتميزين-25-26.pdf",
  // الصق هنا رابط Google Drive بعد رفع ملف الامتيازات ومشاركته مع الجميع.
  excellenceGoogleDrive:
    "https://drive.google.com/file/d/1Neao1olLsCg3c3kX9jN-eHcZQ28rqbA6/view?usp=sharing",
  minimums: "/الحدود الدنيا للقبول المركزي دفعة 2026 (متميزين).pdf",
};

// 📚 كتب المنهج العربي: الصق رابط Google Drive بين علامتي التنصيص لكل جزء من الكتاب.
// الطريقة: ارفع الملف على Google Drive ← مشاركة ← "أي شخص لديه الرابط" ← انسخ الرابط والصقه هنا.
// الكتاب الذي له جزء واحد يكفيه عنصر واحد في parts. الكتاب الذي له أجزاء متعددة يعرض زر لكل جزء.
// اترك القائمة parts فارغة [] حتى يتوفر الكتاب.
// لكل جزء: url = رابط Google Drive للعرض والتحميل، telegramUrl = رابط قناة أو منشور تليكرام.
// اترك الرابط "" إن لم يتوفر؛ يظهر الخيار غير متوفر بدلاً من فتح رابط غير صحيح.
export const arabicBooks: StudyResource[] = [
  {
    label: "كتاب الإسلامية 2026",
    parts: [
      {
        label: "الكتاب كاملاً",
        url: "https://drive.google.com/file/d/1sSfkJBYy3hjBD0-nNr5TxvP_EgrZW_kI/view?usp=sharing",
        telegramUrl: "",
      },
    ],
  },
  {
    label: "كتاب اللغة العربية 2026",
    parts: [
      {
        label: "الجزء الأول",
        url: "https://drive.google.com/file/d/1gnacaVOCO7CqgJH74j7monJij_LFewmD/view?usp=sharing",
        telegramUrl: "",
      },
      {
        label: "الجزء الثاني",
        url: "https://drive.google.com/file/d/1TztHvEUgty3NS5yJ-SiGLQffsxyQCS2r/view?usp=sharing",
        telegramUrl: "",
      },
    ],
  },
  {
    label: "كتاب الإنكليزي 2026",
    parts: [
      {
        label: "كتاب الطالب كامل",
        url: "https://drive.google.com/file/d/15gKj-TmjEaFbP2QStaYwRiAAWoqbDbT2/view?usp=sharing",
        telegramUrl: "",
      },
      {
        label: "كتاب النشاط كامل",
        url: "https://drive.google.com/file/d/1pBMjqDQRehUGGSyzdGpoQjuNRC-H7TfP/view?usp=sharing",
        telegramUrl: "",
      },
      {
        label: "دليل المدرس كامل",
        url: "https://drive.google.com/file/d/1VNnYnyxt6c_0UL3JyuF0b0tteV9tKlhf/view?usp=sharing",
        telegramUrl: "",
      },
    ],
  },
  {
    label: "كتاب الفيزياء 2026",
    parts: [
      {
        label: "الكتاب كاملاً",
        url: "https://drive.google.com/file/d/1unJocoJQzo2EcxTOkVlbcRo3qkAHcP4e/view?usp=sharing",
        telegramUrl: "",
      },
    ],
  },
  {
    label: "كتاب الكيمياء 2026",
    parts: [
      {
        label: "الكتاب كاملاً",
        url: "https://drive.google.com/file/d/1zFxxy7RMsSZruIHLgb9Jrki-rQZoLZar/view?usp=sharing",
        telegramUrl: "",
      },
    ],
  },
  {
    label: "كتاب الأحياء 2026",
    parts: [
      {
        label: "الكتاب كاملاً",
        url: "https://drive.google.com/file/d/1YpJioFfjYdmdBOLK3ZpRXss1O3PsjerA/view?usp=sharing",
        telegramUrl: "",
      },
    ],
  },
  {
    label: "كتاب الرياضيات 2026",
    parts: [
      {
        label: "الكتاب كاملاً",
        url: "https://drive.google.com/file/d/1wScXZdhnGKpjs4QkXSR2pivmTVNo-Ee7/view?usp=sharing",
        telegramUrl: "",
      },
    ],
  },
  {
    label: "كتاب الفرنسي 2026 (للمتوفقين)",
    parts: [
      {
        label: "المنهج القديم",
        url: "https://drive.google.com/file/d/13KfpYFxM_cT0RC_pxzXG3xlN1t9JXHlF/view?usp=sharing",
        telegramUrl: "",
      },
      {
        label: "المنهج الجديد",
        url: "https://drive.google.com/file/d/1R__XGYtLXIh3hJg7gP5CET939ZVVT3o2/view?usp=sharing",
        telegramUrl: "",
      },
    ],
  },
];

// 📚 كتب المتميزين والكتب المؤشرة وملازم المدرسين: أضف العناصر بنفس النموذج.
// انسخ المثال إلى القائمة المطلوبة واحذف // من بدايته، ثم غيّر الاسم والروابط.
// { label: "اسم الكتاب أو الملزمة", parts: [{ label: "الكتاب كاملاً", url: "", telegramUrl: "" }] },
// للكتاب ذي الجزأين، أضف عنصرين داخل parts: "الجزء الأول" و"الجزء الثاني"، لكل منهما روابطه.
export const excellenceBooks: StudyResource[] = [];
export const indicatedBooks: StudyResource[] = [];
// 📝 ملازم المدرسين حسب المادة: لإضافة ملزمة، ضعها داخل notes للمادة المطلوبة بهذا الشكل:
// { label: "عنوان الملزمة", parts: [{ label: "الملزمة كاملة", url: "رابط Google Drive", telegramUrl: "رابط تليكرام" }] },
export const teacherNotes: { subject: string; notes: StudyResource[] }[] = [
  { subject: "العربي", notes: [] },
  { subject: "الرياضيات", notes: [] },
  { subject: "الانكليزي", notes: [] },
  { subject: "الكيمياء", notes: [] },
  { subject: "الفيزياء", notes: [] },
  { subject: "الاحياء", notes: [] },
  { subject: "الاسلامية", notes: [] },
  { subject: "الفرنسي", notes: [] },
];

export type Teacher = {
  slug: string;
  name: string;
  photo: string;
};

export type SubjectTeachers = Record<string, Teacher[]>;

export const subjectTeachers: SubjectTeachers = {
  physics: [
    { slug: "motaz-alwadi", name: "معتز الوادي", photo: "" },
    { slug: "dalir-alkhalidi", name: "دلير الخالدي", photo: "" },
    { slug: "hussein-mohammed", name: "حسين محمد", photo: "" },
    { slug: "issam-alshamri", name: "عصام الشمري", photo: "" },
    { slug: "hayder-diwan", name: "حيدر ديوان", photo: "" },
  ],
  biology: [
    { slug: "nora", name: "نورا", photo: "" },
    { slug: "qusay-alnadawi", name: "قصي النداوي", photo: "" },
    { slug: "nadia-alnaimi", name: "نادية النعيمي", photo: "" },
  ],
  chemistry: [
    { slug: "hussein-alhashimi", name: "حسين الهاشمي", photo: "" },
    { slug: "ahmed-alnadawi", name: "احمد النداوي", photo: "" },
    { slug: "ahmed-alhashimi", name: "احمد الهاشمي", photo: "" },
  ],
  math: [
    { slug: "hayder-abdulaimma", name: "حيدر عبد الائمة", photo: "" },
    { slug: "hayder-walid", name: "حيدر وليد", photo: "" },
    { slug: "qusay-amairi", name: "قصي عميري", photo: "" },
    { slug: "yousif-aljafari", name: "يوسف الجعفري", photo: "" },
  ],
  arabic: [
    { slug: "aqil-alzubaidi", name: "عقيل الزبيدي", photo: "" },
    { slug: "ahmed-alnaimi", name: "احمد النعيمي", photo: "" },
    { slug: "hisham-almaamouri", name: "هشام المعموري", photo: "" },
    { slug: "imad-hameed", name: "عماد حميد", photo: "" },
    { slug: "hussein-ubaida", name: "حسين عبيدة", photo: "" },
    { slug: "rafl-alzubaidi", name: "رفل الزبيدي", photo: "" },
  ],
  english: [
    { slug: "mohammed-alobaidi", name: "محمد العبيدي", photo: "" },
    { slug: "mohammed-hussein", name: "محمد حسين", photo: "" },
    { slug: "ali-alhashimi", name: "علي الهاشمي", photo: "" },
  ],
  french: [{ slug: "mohammed-ali-alkinani", name: "محمد علي الكناني", photo: "" }],
  islamic: [
    { slug: "ammar-fadhil", name: "عمار فاضل", photo: "" },
    { slug: "sajid-alakili", name: "ساجد العكيلي", photo: "" },
  ],
};

type TeacherStudySection = {
  slug: string;
  label: string;
  children?: { slug: string; label: string }[];
};

const chapterNumbers = [
  "الأول",
  "الثاني",
  "الثالث",
  "الرابع",
  "الخامس",
  "السادس",
  "السابع",
  "الثامن",
  "التاسع",
];

const chapters = (count: number): TeacherStudySection[] =>
  chapterNumbers.slice(0, count).map((number, index) => ({
    slug: `chapter-${index + 1}`,
    label: `الفصل ${number} | CHAPTER ${index + 1}`,
  }));

export const teacherStudyStructure: {
  slug: string;
  subject: string;
  note?: string;
  sections: TeacherStudySection[];
}[] = [
  {
    slug: "arabic",
    subject: "العربي",
    sections: [
      {
        slug: "part-one",
        label: "الجزء الأول",
        children: [
          { slug: "grammar", label: "القواعد" },
          { slug: "literature", label: "الأدب" },
        ],
      },
      {
        slug: "part-two",
        label: "الجزء الثاني",
        children: [
          { slug: "grammar", label: "القواعد" },
          { slug: "literature", label: "الأدب" },
        ],
      },
    ],
  },
  {
    slug: "math",
    subject: "الرياضيات",
    sections: chapters(5),
  },
  {
    slug: "english",
    subject: "الانكليزي",
    sections: Array.from({ length: 8 }, (_, index) => ({
      slug: `unit-${index + 1}`,
      label: `يونت ${index + 1} | UNIT ${index + 1}`,
    })),
  },
  {
    slug: "chemistry",
    subject: "الكيمياء",
    sections: chapters(8),
  },
  {
    slug: "physics",
    subject: "الفيزياء",
    sections: chapters(9),
  },
  {
    slug: "biology",
    subject: "الاحياء",
    sections: chapters(5),
  },
  {
    slug: "islamic",
    subject: "الاسلامية",
    sections: ["الأولى", "الثانية", "الثالثة", "الرابعة", "الخامسة"].map((number, index) => ({
      slug: `unit-${index + 1}`,
      label: `الوحدة ${number}`,
    })),
  },
  {
    slug: "french",
    subject: "الفرنسي",
    sections: [
      { slug: "new-curriculum", label: "المنهج الجديد" },
      { slug: "old-curriculum", label: "المنهج القديم" },
    ],
  },
];

// 📝 الملازم والواجبات: كل ملزمة تُكتب بهذا الشكل (الاسم، المدرس، السنة، ثم الروابط):
// { label: "اسم الملزمة", teacher: "اسم المدرس", year: "2027", parts: [{ label: "الملزمة كاملة", url: "رابط Google Drive", telegramUrl: "رابط تليكرام" }] },
// المفتاح الأول = المادة: arabic, math, english, chemistry, physics, biology, islamic, french
// المفتاح الثاني = الفصل: chapter-1 ... (للإنكليزي والإسلامية: unit-1 ...)، للفرنسي: new-curriculum أو old-curriculum
// للعربي: part-one/grammar أو part-one/literature أو part-two/grammar أو part-two/literature
type NotesBySection = Partial<Record<string, Partial<Record<string, StudyResource[]>>>>;

// ⭐ ملازم المتميزين — خانة «الفصول»
export const chapterNotes: NotesBySection = {
  arabic: {
    "part-one/grammar": [
      {
        label: "ملزمة أستاذنا — أسلوب الاستفهام",
        teacher: "عقيل الزبيدي",
        year: "2027",
        parts: [
          {
            label: "الملزمة كاملة",
            url: "",
            telegramUrl: "https://telegram.me/mafatee7_test_bot?start=7259897256",
          },
        ],
      },
      {
        label: "ملزمة أستاذنا — أسلوب النفي",
        teacher: "عقيل الزبيدي",
        year: "2027",
        parts: [
          {
            label: "الملزمة كاملة",
            url: "",
            telegramUrl: "https://telegram.me/mafatee7_test_bot?start=3323249882",
          },
        ],
      },
      {
        label: "ملزمة أستاذنا — أسلوب التوكيد",
        teacher: "عقيل الزبيدي",
        year: "2027",
        parts: [
          {
            label: "الملزمة كاملة",
            url: "",
            telegramUrl: "https://telegram.me/mafatee7_test_bot?start=1975932053",
          },
        ],
      },
      {
        label: "ملزمة أستاذنا — أسلوب التقديم والتأخير",
        teacher: "عقيل الزبيدي",
        year: "2027",
        parts: [
          {
            label: "الملزمة كاملة",
            url: "",
            telegramUrl: "https://telegram.me/mafatee7_test_bot?start=8308226031",
          },
        ],
      },
      {
        label: "ملزمة أستاذنا — أسلوب النداء",
        teacher: "عقيل الزبيدي",
        year: "2027",
        parts: [
          {
            label: "الملزمة كاملة",
            url: "",
            telegramUrl: "https://telegram.me/mafatee7_test_bot?start=2711266843",
          },
        ],
      },
    ],
  },
  math: {},
  english: {},
  chemistry: {},
  physics: {
    "chapter-1": [
      {
        label: "كلاميات الفصل الأول",
        teacher: "عصام الشمري",
        year: "2027",
        parts: [
          {
            label: "الملزمة كاملة",
            url: "https://drive.google.com/file/d/1C-9UwpO32xmqPWZRhTFkO6l-_JHMWh94/view?usp=sharing",
            telegramUrl: "https://telegram.me/mafatee7_test_bot?start=5316089838",
          },
        ],
      },
    ],
    "chapter-2": [
      {
        label: "كلاميات الفصل الثاني",
        teacher: "عصام الشمري",
        year: "2027",
        parts: [
          {
            label: "الملزمة كاملة",
            url: "https://drive.google.com/file/d/1IBPTkGrfqslUpaV1cGIq9b7addEo-mqm/view?usp=sharing",
            telegramUrl: "https://telegram.me/mafatee7_test_bot?start=3171811744",
          },
        ],
      },
    ],
    "chapter-3": [
      {
        label: "كلاميات الفصل الثالث",
        teacher: "عصام الشمري",
        year: "2027",
        parts: [
          {
            label: "الملزمة كاملة",
            url: "https://drive.google.com/file/d/1acOybx4djVjfoARrSSaEroFE31K10Pox/view?usp=sharing",
            telegramUrl: "https://telegram.me/mafatee7_test_bot?start=9242938591",
          },
        ],
      },
    ],
  },
  biology: {},
  islamic: {},
  french: {},
};

// ⭐ ملازم المتميزين — خانة «الواجبات» (نفس مفاتيح الفصول)
export const homeworkNotes: NotesBySection = {
  physics: {
    "chapter-1": [
      {
        label: "واجبات الفصل الأول",
        teacher: "عصام الشمري",
        year: "2027",
        parts: [
          {
            label: "الملزمة كاملة",
            url: "",
            telegramUrl: "https://telegram.me/mafatee7_test_bot?start=3438340348",
          },
        ],
      },
    ],
    "chapter-2": [
      {
        label: "واجبات الفصل الثاني",
        teacher: "عصام الشمري",
        year: "2027",
        parts: [
          {
            label: "الملزمة كاملة",
            url: "",
            telegramUrl: "https://telegram.me/mafatee7_test_bot?start=6631657380",
          },
        ],
      },
    ],
    "chapter-3": [
      {
        label: "واجبات الفصل الثالث",
        teacher: "عصام الشمري",
        year: "2027",
        parts: [
          {
            label: "الملزمة كاملة",
            url: "",
            telegramUrl: "https://telegram.me/mafatee7_test_bot?start=9242938591",
          },
        ],
      },
    ],
  },
};

// 📘 ملازم المنهج العربي — خانة «الفصول» (نفس الشكل والمفاتيح، والفرنسي: old-curriculum فقط)
export const arabicCurriculumChapterNotes: NotesBySection = {};

// 📘 ملازم المنهج العربي — خانة «الواجبات»
export const arabicCurriculumHomeworkNotes: NotesBySection = {};

export type NotesTrack = {
  slug: string;
  title: string;
  structure: typeof teacherStudyStructure;
  chapters: NotesBySection;
  homework: NotesBySection;
};

export const notesTracks: NotesTrack[] = [
  {
    slug: "teachers",
    title: "ملازم المتميزين",
    structure: teacherStudyStructure,
    chapters: chapterNotes,
    homework: homeworkNotes,
  },
  {
    slug: "arabic",
    title: "ملازم المنهج العربي",
    structure: teacherStudyStructure.map((item) =>
      item.slug === "french"
        ? {
            ...item,
            note: "لطلاب المتفوقين فقط",
            sections: item.sections.filter((s) => s.slug !== "new-curriculum"),
          }
        : item,
    ),
    chapters: arabicCurriculumChapterNotes,
    homework: arabicCurriculumHomeworkNotes,
  },
];

// 📢 إعلانات المدرسين: انسخ سطراً وعدّله لإضافة إعلان جديد، واحذفه لإزالة الإعلان.
export const teacherAds: {
  title: string;
  teacher: string;
  subject: string;
  body: string;
  telegram: string;
}[] = [
  // { title: "دورة الرياضيات المكثفة", teacher: "أ. أحمد", subject: "الرياضيات", body: "تفاصيل الإعلان هنا", telegram: "https://t.me/username" },
];
