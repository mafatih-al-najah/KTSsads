import { useState, type ReactNode } from "react";
import { BookMarked, BookOpen } from "lucide-react";
import { PageHero } from "@/components/SiteShell";
import { PdfViewer } from "@/components/PdfViewer";
import type { StudyResource } from "@/lib/download-options";

// صفحة الكتاب: بطاقة الأجزاء + عرض الملف داخل الموقع. تُستخدم للمنهج العربي وللمتميزين.
export function BookDetail({
  book,
  index,
  backLink,
}: {
  book?: StudyResource;
  index: string;
  backLink: ReactNode;
}) {
  const [selection, setSelection] = useState({ index, part: 0 });
  const selectedPart = selection.index === index ? selection.part : 0;

  if (!book) {
    return (
      <>
        <PageHero title="الكتاب غير موجود" />
        <div className="mx-auto max-w-3xl px-4 py-20 text-center">
          <p className="text-muted-foreground">لم يتم العثور على هذا الكتاب.</p>
          <div className="mt-6">{backLink}</div>
        </div>
      </>
    );
  }

  const isMultiPart = book.parts.length > 1;

  return (
    <>
      <PageHero title={book.label} subtitle="تصفّح الكتاب داخل الموقع أو حمّله مباشرة" />
      <div className="mx-auto max-w-5xl px-4 py-10">
        {backLink}
        <div className="mb-8 flex items-center gap-3 rounded-2xl border bg-card p-4">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-secondary text-primary">
            <BookOpen className="h-5 w-5" />
          </span>
          <h2 className="text-lg font-bold">{book.label}</h2>
        </div>

        {isMultiPart ? (
          <>
            <div className="relative grid gap-5 sm:grid-cols-2">
              <div className="pointer-events-none absolute inset-x-0 top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-l from-transparent via-border to-transparent sm:block" />
              {book.parts.map((part, i) => {
                const isActive = i === selectedPart;
                return (
                  <button
                    key={part.label}
                    type="button"
                    onClick={() => setSelection({ index, part: i })}
                    aria-pressed={isActive}
                    className="part-card group relative flex flex-col items-center gap-4 overflow-hidden rounded-3xl border p-8 text-center transition-all duration-400"
                    style={{
                      animation: "rise .6s cubic-bezier(.22,1,.36,1) both",
                      animationDelay: `${i * 100}ms`,
                    }}
                  >
                    <div className="part-card-glow" />
                    <span
                      className={`relative grid h-16 w-16 place-items-center rounded-2xl transition-transform duration-400 group-hover:scale-110 group-hover:-rotate-3 ${
                        isActive
                          ? "bg-brand text-primary-foreground shadow-glow"
                          : "bg-secondary text-primary"
                      }`}
                    >
                      {i === 0 ? (
                        <BookOpen className="h-7 w-7" />
                      ) : (
                        <BookMarked className="h-7 w-7" />
                      )}
                    </span>
                    <div className="relative">
                      <span className="block text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                        الجزء
                      </span>
                      <span className="mt-1 block text-2xl font-bold leading-tight">
                        {part.label.replace("الجزء ", "").trim() || part.label}
                      </span>
                    </div>
                    <span
                      className={`relative inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold transition ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "border border-border bg-background text-muted-foreground"
                      }`}
                    >
                      {isActive ? "قيد العرض" : "اضغط للعرض"}
                    </span>
                  </button>
                );
              })}
            </div>

            <PdfViewer
              url={book.parts[selectedPart]?.url ?? ""}
              telegramUrl={book.parts[selectedPart]?.telegramUrl ?? ""}
              title={`${book.label} - ${book.parts[selectedPart]?.label ?? ""}`}
            />
          </>
        ) : (
          <PdfViewer
            url={book.parts[0]?.url ?? ""}
            telegramUrl={book.parts[0]?.telegramUrl ?? ""}
            title={book.label}
          />
        )}
      </div>
    </>
  );
}
