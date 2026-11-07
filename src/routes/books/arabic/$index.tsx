import { createFileRoute, Link } from "@tanstack/react-router";
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
  const idx = Number(index);
  const book = arabicBooks[idx];

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
        <PdfViewer url={book.url} title={book.label} />
      </div>
    </>
  );
}
