import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AlertTriangle, ArrowRight, BookOpen, Loader2 } from "lucide-react";
import { meta, PageHero } from "@/components/SiteShell";
import { PdfViewer } from "@/components/PdfViewer";
import { arabicBooksQueryKey, fetchArabicBooks } from "@/lib/books";

export const Route = createFileRoute("/books/arabic/$bookId")({
  head: () => meta("كتاب", "عرض وتحميل الكتاب داخل الموقع."),
  component: BookDetailPage,
});

function BookDetailPage() {
  const { bookId } = Route.useParams();
  const {
    data: books,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: arabicBooksQueryKey,
    queryFn: fetchArabicBooks,
  });

  if (isPending) {
    return (
      <div className="flex justify-center py-32 text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-4 py-32 text-center">
        <AlertTriangle className="h-8 w-8 text-destructive" />
        <p className="text-muted-foreground">تعذّر تحميل الكتاب</p>
        <button onClick={() => void refetch()} className="btn-brand text-sm">
          إعادة المحاولة
        </button>
      </div>
    );
  }

  const book = books.find((b) => b.id === bookId);

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
      <PageHero title={book.title} subtitle="تصفّح الكتاب داخل الموقع أو حمّله مباشرة" />
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
          <h2 className="text-lg font-bold">{book.title}</h2>
        </div>
        <PdfViewer url={book.file_url ?? ""} title={book.title} />
      </div>
    </>
  );
}
