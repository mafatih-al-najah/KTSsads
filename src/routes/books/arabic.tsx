import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  BookOpen,
  ChevronLeft,
  FileText,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { meta, PageHero } from "@/components/SiteShell";
import { arabicBooks } from "@/data/site";

export const Route = createFileRoute("/books/arabic")({
  head: () =>
    meta("كتب المنهج العربي", "كتب المناهج العربية لجميع المواد للسادس الإعدادي."),
  component: ArabicBooksPage,
});

function BookCard({
  label,
  url,
  index,
}: {
  label: string;
  url: string;
  index: number;
}) {
  const hasFile = url.trim().length > 0;
  return (
    <Link
      to="/books/arabic/$index"
      params={{ index: String(index) }}
      className="card-lift group relative flex items-center justify-between gap-4 overflow-hidden rounded-2xl border bg-card p-5 sm:p-6"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="pointer-events-none absolute -left-8 -top-8 h-28 w-28 rounded-full bg-primary/10 blur-2xl transition-opacity duration-300 group-hover:opacity-80" />
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-secondary text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
          <BookOpen className="h-6 w-6" />
        </span>
        <div className="min-w-0">
          <h3 className="truncate text-lg font-bold leading-tight">{label}</h3>
          <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
            {hasFile ? (
              <>
                <FileText className="h-3.5 w-3.5 text-emerald-500" />
                <span>متوفر للتصفح والتحميل</span>
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
      <ChevronLeft className="h-6 w-6 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-x-1 group-hover:text-primary" />
    </Link>
  );
}

function ArabicBooksPage() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return arabicBooks;
    return arabicBooks.filter((b) => b.label.toLowerCase().includes(q));
  }, [query]);
  return (
    <>
      <PageHero
        title="كتب المنهج العربي"
        subtitle="كتب المناهج العربية لجميع مواد السادس الإعدادي — اضغط على الكتاب للتصفح والتحميل"
      />
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="relative mb-8">
          <Search className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث عن كتاب..."
            aria-label="بحث عن كتاب"
            className="w-full rounded-2xl border bg-card py-3.5 pr-12 pl-12 text-base shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="مسح البحث"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
        {filtered.length > 0 ? (
          <div className="grid gap-4 sm:gap-5">
            {filtered.map((book, i) => (
              <BookCard
                key={book.label}
                label={book.label}
                url={book.url}
                index={i}
              />
            ))}
          </div>
        ) : (
          <p className="py-16 text-center text-muted-foreground">
            لا توجد نتائج مطابقة لبحثك
          </p>
        )}
        <p className="mt-10 text-center text-sm text-muted-foreground">
          سيتم رفع بقية الكتب بالتدريج — تابعوا القناة لمعرفة الجديد
        </p>
      </div>
    </>
  );
}
