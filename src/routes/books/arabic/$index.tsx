import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, BookOpen } from "lucide-react";
import { meta, PageHero } from "@/components/SiteShell";
import { PdfViewer } from "@/components/PdfViewer";
import { arabicBooks } from "@/data/site";

export const Route = createFileRoute("/books/arabic/$index")({
  head: () => meta("كتاب", "عرض وتحميل الكتاب داخل الموقع."),
  component: BookDetailPage,
});

function BookDetailPage() {
  const { index } = Route.useParams();
  const book = arabicBooks[Number(index)];
  const [selectedPart, setSelectedPart] = useState(0);

  if (!book) {
    return (
      <>
        <PageHero title="الكتاب غير موجود" />
        <div className="mx-auto max-w-3xl px-4 py-20 text-center">
          <p className="text-muted-foreground">لم يتم العثور على هذا الكتاب.</p>
          <Link to="/books/arabic" className="btn-brand mt-6 text-sm">
            <ArrowRight className="h-4 w-4" />
            العودة إلى قائمة الكتب
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHero title={book.label} subtitle="تصفّح الكتاب داخل الموقع أو حمّله مباشرة" />
      <div className="mx-auto max-w-5xl px-4 py-10">
        <Link
          to="/books/arabic"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
        >
          <ArrowRight className="h-4 w-4" />
          العودة إلى قائمة الكتب
        </Link>
        <div className="mb-6 flex items-center gap-3 rounded-2xl border bg-card p-4">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-secondary text-primary">
            <BookOpen className="h-5 w-5" />
          </span>
          <h2 className="text-lg font-bold">{book.label}</h2>
        </div>
        {book.parts.length > 1 && (
          <div role="tablist" aria-label="أجزاء الكتاب" className="mb-6 flex flex-wrap gap-3">
            {book.parts.map((part, i) => (
              <button
                key={part.label}
                type="button"
                role="tab"
                aria-selected={i === selectedPart}
                onClick={() => setSelectedPart(i)}
                className={
                  i === selectedPart
                    ? "rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-glow transition"
                    : "rounded-full border bg-card px-5 py-2.5 text-sm font-bold text-foreground transition hover:border-primary hover:text-primary"
                }
              >
                {part.label}
              </button>
            ))}
          </div>
        )}
        <PdfViewer
          url={book.parts[selectedPart]?.url ?? ""}
          title={
            book.parts.length > 1
              ? `${book.label} - ${book.parts[selectedPart]?.label ?? ""}`
              : book.label
          }
        />
      </div>
    </>
  );
}
