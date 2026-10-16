// ✏️ هذا الملف يحتوي على كل محتوى الموقع — عدّل الروابط والأسماء هنا فقط.

export const site = {
  name: "مفاتيح النجاح",
  tagline: "قناتك التعليمية الأولى لطلاب السادس الإعدادي في العراق",
  telegramChannel: "https://t.me/your_channel",
  contactUsername: "your_admin",
  email: "contact@example.com",
  donateLink: "https://t.me/your_admin",
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
  "بغداد", "البصرة", "نينوى", "أربيل", "النجف", "كربلاء", "بابل", "ذي قار", "ديالى",
  "الأنبار", "كركوك", "صلاح الدين", "واسط", "ميسان", "المثنى", "القادسية", "السليمانية", "دهوك",
] as const;

// المدرسون: أضف لكل محافظة ومادة اسم المدرس ويوزر التليكرام
// مثال: "بغداد": { "الرياضيات": { name: "أ. أحمد", username: "ahmed_math" } }
export const teachers: Partial<
  Record<string, Partial<Record<string, { name: string; username: string }>>>
> = {
  بغداد: { الرياضيات: { name: "أ. مثال", username: "example_teacher" } },
};

// الملازم: كل ملزمة رابطها يؤدي إلى قناة تليكرام
export const notes = [
  { subject: "الرياضيات", title: "ملزمة الرياضيات الشاملة", link: "https://t.me/your_channel" },
  { subject: "الفيزياء", title: "ملزمة الفيزياء — الفصول كاملة", link: "https://t.me/your_channel" },
  { subject: "الكيمياء", title: "ملزمة الكيمياء مع الأسئلة الوزارية", link: "https://t.me/your_channel" },
  { subject: "الأحياء", title: "ملزمة الأحياء المختصرة", link: "https://t.me/your_channel" },
  { subject: "الإنكليزي", title: "ملزمة الإنكليزي — قواعد ومفردات", link: "https://t.me/your_channel" },
  { subject: "العربي", title: "ملزمة العربي — نحو وأدب", link: "https://t.me/your_channel" },
  { subject: "الإسلامية", title: "ملزمة الإسلامية", link: "https://t.me/your_channel" },
  { subject: "الفرنسي", title: "ملزمة الفرنسي", link: "https://t.me/your_channel" },
];

// المصححون: غيّر اليوزر هنا متى شئت
export const correctors = [
  { name: "المصحح الأول", subject: "الرياضيات والفيزياء", username: "corrector_1" },
  { name: "المصحح الثاني", subject: "الكيمياء والأحياء", username: "corrector_2" },
  { name: "المصحح الثالث", subject: "العربي والإسلامية", username: "corrector_3" },
  { name: "المصحح الرابع", subject: "الإنكليزي والفرنسي", username: "corrector_4" },
];

export const announcements = [
  { date: "2026-10-15", title: "انطلاق العام الدراسي 2026", body: "تابعوا القناة للحصول على جدول الملازم والمراجعات الأسبوعية." },
  { date: "2026-10-10", title: "ملازم جديدة متوفرة", body: "تمت إضافة ملازم الفيزياء والكيمياء المحدثة في قسم الملازم." },
];

// امتياز المتميزين 2026
export const excellence = [
  { title: "شروط الانضمام", body: "معدل 95 فما فوق في نصف السنة، والالتزام بالاختبارات الأسبوعية." },
  { title: "المميزات", body: "ملازم حصرية، مراجعات مباشرة، ومتابعة شخصية من المصححين." },
  { title: "طريقة التسجيل", body: "راسل الإدارة عبر التليكرام مع صورة نتيجتك." },
];

// الحدود الدنيا دفعة 2026 (حدّثها عند صدور النتائج)
export const minimums = [
  { college: "الطب", score: "قريباً" },
  { college: "طب الأسنان", score: "قريباً" },
  { college: "الصيدلة", score: "قريباً" },
  { college: "الهندسة", score: "قريباً" },
  { college: "التمريض", score: "قريباً" },
  { college: "العلوم", score: "قريباً" },
  { college: "القانون", score: "قريباً" },
  { college: "التربية", score: "قريباً" },
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
