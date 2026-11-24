import { useState, type ReactNode } from "react";
import { BookMarked, BookOpen, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/SiteShell";
import { PdfViewer } from "@/components/PdfViewer";
import type { StudyResource } from "@/lib/download-options";

// صفحة الكتاب: بطاقة الأجزاء + عرض الملف داخل الموقع. تُستخدم للمنهج العربي وللمتميزين.
export function BookDetail({
  book,
  index,
  backLink,
}: {
  book?: StudyResource | undefined;
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

        <div className="mb-8 flex items-center gap-3.5 rounded-2xl border border-border/80 bg-card/90 p-4 shadow-sm backdrop-blur-sm">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand text-primary-foreground shadow-sm">
            <BookOpen className="h-5 w-5" />
          </span>
          <h2 className="font-display text-lg font-extrabold">{book.label}</h2>
        </div>

        {isMultiPart ? (
          <>
            <div className="relative mb-8 grid gap-5 sm:grid-cols-2">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-l from-transparent via-border to-transparent sm:block"
              />

              {book.parts.map((part, i) => {
                const isActive = i === selectedPart;
                return (
                  <button
                    key={part.label}
                    type="button"
                    onClick={() => setSelection({ index, part: i })}
                    aria-pressed={isActive}
                    className="part-card rise group relative flex flex-col items-center gap-4 overflow-hidden rounded-3xl border p-8 text-center"
                    style={{ animationDelay: `${i * 90}ms` }}
                  >
                    <div className="part-card-glow" />

                    <span
                      className={`relative grid h-16 w-16 place-items-center rounded-2xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 ${
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
                      <span className="block text-xs font-bold text-muted-foreground">الجزء</span>
                      <span className="mt-1 block font-display text-2xl font-black leading-tight">
                        {part.label.replace("الجزء ", "").trim() || part.label}
                      </span>
                    </div>

                    <span
                      className={`relative inline-flex items-center gap-1.5 text-xs font-bold transition ${
                        isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                      }`}
                    >
                      {isActive && <CheckCircle2 className="h-4 w-4" aria-hidden="true" />}
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
