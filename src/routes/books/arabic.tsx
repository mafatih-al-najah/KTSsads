import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { BookOpen, Search, X } from "lucide-react";
import { DownloadChoices } from "@/components/DownloadChoices";
import type { StudyResource } from "@/lib/download-options";
import { Button } from "@/components/ui/button";
import { meta, PageHero } from "@/components/SiteShell";
import { arabicBooks } from "@/data/site";

export const Route = createFileRoute("/books/arabic")({
  head: () => meta("كتب المنهج العربي", "كتب المناهج العربية لجميع المواد للسادس الإعدادي."),
  component: ArabicBooksPage,
});

function BookCard({ book, index }: { book: StudyResource; index: number }) {
  return (
    <div
      className="card-lift group relative flex items-center justify-between gap-4 overflow-hidden rounded-2xl border bg-card p-5 sm:p-6"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="pointer-events-none absolute -left-8 -top-8 h-28 w-28 rounded-full bg-primary/10 blur-2xl transition-opacity duration-300 group-hover:opacity-80" />
      <Link to="/books/arabic/$index" params={{ index: String(index) }} className="flex min-w-0 flex-1 items-center gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-secondary text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
          <BookOpen className="h-6 w-6" />
        </span>
        <div className="min-w-0">
          <h3 className="text-lg font-bold leading-tight">{book.label}</h3>
        </div>
      </Link>
      <DownloadChoices title={book.label} parts={book.parts} className="shrink-0" />
    </div>
  );
}

function ArabicBooksPage() {
  const { pathname } = useLocation();
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return arabicBooks;
    return arabicBooks.filter((b) => b.label.toLowerCase().includes(q));
  }, [query]);
  if (pathname !== "/books/arabic" && pathname !== "/books/arabic/") return <Outlet />;
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
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setQuery("")}
              aria-label="مسح البحث"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
        {filtered.length > 0 ? (
          <div className="grid gap-4 sm:gap-5">
            {filtered.map((book) => (
              <BookCard
                key={book.label}
                book={book}
                index={arabicBooks.indexOf(book)}
              />
            ))}
          </div>
        ) : (
          <p className="py-16 text-center text-muted-foreground">لا توجد نتائج مطابقة لبحثك</p>
        )}
      </div>
    </>
  );
}
