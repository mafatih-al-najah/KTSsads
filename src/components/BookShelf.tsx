import { useMemo, useState, type ReactNode } from "react";
import { BookOpen, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DownloadChoices } from "@/components/DownloadChoices";
import type { StudyResource } from "@/lib/download-options";

// الأيقونة والاسم داخل بطاقة الكتاب — تُستخدم في صفحة كتب المنهج العربي وكتب المتميزين معاً.
export function BookLinkContent({ book }: { book: StudyResource }) {
  return (
    <>
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-secondary text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
        <BookOpen className="h-6 w-6" />
      </span>
      <div className="min-w-0">
        <h3 className="text-lg font-bold leading-tight">{book.label}</h3>
      </div>
    </>
  );
}

// شكل قائمة الكتب: بحث + بطاقات + زر تحميل. الصفحتان تمرران كتبها ورابطها فقط.
export function BookShelf({
  books,
  renderLink,
}: {
  books: StudyResource[];
  renderLink: (book: StudyResource, index: number) => ReactNode;
}) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return books;
    return books.filter((b) => b.label.toLowerCase().includes(q));
  }, [books, query]);

  return (
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
          {filtered.map((book) => {
            const index = books.indexOf(book);
            return (
              <div
                key={book.label}
                className="card-lift group relative flex items-center justify-between gap-4 overflow-hidden rounded-2xl border bg-card p-5 sm:p-6"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <div className="pointer-events-none absolute -left-8 -top-8 h-28 w-28 rounded-full bg-primary/10 blur-2xl transition-opacity duration-300 group-hover:opacity-80" />
                {renderLink(book, index)}
                <DownloadChoices title={book.label} parts={book.parts} className="shrink-0" />
              </div>
            );
          })}
        </div>
      ) : (
        <p className="py-16 text-center text-muted-foreground">لا توجد نتائج مطابقة لبحثك</p>
      )}
    </div>
  );
}
