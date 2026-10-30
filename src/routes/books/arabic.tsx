import { createFileRoute } from "@tanstack/react-router";
import {
  BookOpen,
  Download,
  FileText,
  Sparkles,
} from "lucide-react";
import { meta, PageHero } from "@/components/SiteShell";
import { arabicBooks } from "@/data/site";

export const Route = createFileRoute("/books/arabic")({
  head: () =>
    meta("كتب المنهج العربي", "كتب المناهج العربية لجميع المواد للسادس الإعدادي."),
  component: ArabicBooksPage,
});

function BookCard({ label, url, index }: { label: string; url: string; index: number }) {
  const hasFile = url.trim().length > 0;
  return (
    <div
      className="card-lift group relative flex items-center justify-between gap-4 overflow-hidden rounded-2xl border bg-card p-5 sm:p-6"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="pointer-events-none absolute -left-8 -top-8 h-28 w-28 rounded-full bg-primary/10 blur-2xl transition-opacity duration-300 group-hover:opacity-80" />
      <div className="flex min-w-0 items-center gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-secondary text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
          <BookOpen className="h-6 w-6" />
        </span>
        <div className="min-w-0">
          <h3 className="truncate text-lg font-bold leading-tight">{label}</h3>
          <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
            {hasFile ? (
              <>
                <FileText className="h-3.5 w-3.5 text-emerald-500" />
                <span>متوفر للتحميل</span>
              </>
            ) : (
              <>
                <Sparkles className="h-3.5 w-3.5" />
                <span>سيتم رفعه قريباً</span>
              </>
            )}
          </p>
        </div>
      </div>
      {hasFile ? (
        <a
          href={url}
          download
          className="btn-lime shrink-0 text-xs sm:text-sm"
          aria-label={`تحميل ${label}`}
        >
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">تحميل</span>
        </a>
      ) : (
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-dashed border-muted-foreground/30 text-muted-foreground/40">
          <Download className="h-4 w-4" />
        </span>
      )}
    </div>
  );
}

function ArabicBooksPage() {
  return (
    <>
      <PageHero
        title="كتب المنهج العربي"
        subtitle="كتب المناهج العربية لجميع مواد السادس الإعدادي — اضغط زر التحميل بجانب كل كتاب لتنزيله"
      />
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="grid gap-4 sm:gap-5">
          {arabicBooks.map((book, i) => (
            <BookCard key={book.label} label={book.label} url={book.url} index={i} />
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-muted-foreground">
          سيتم رفع بقية الكتب بالتدريج — تابعوا القناة لمعرفة الجديد
        </p>
      </div>
    </>
  );
}
