import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { meta, PageHero } from "@/components/SiteShell";
import { BookLinkContent, BookShelf } from "@/components/BookShelf";
import { arabicBooks } from "@/data/site";

export const Route = createFileRoute("/books/arabic")({
  head: () => meta("كتب المنهج العربي", "كتب المناهج العربية لجميع المواد للسادس الإعدادي."),
  component: ArabicBooksPage,
});

function ArabicBooksPage() {
  const { pathname } = useLocation();
  if (pathname !== "/books/arabic" && pathname !== "/books/arabic/") return <Outlet />;
  return (
    <>
      <PageHero
        title="كتب المنهج العربي"
        subtitle="كتب المناهج العربية لجميع مواد السادس الإعدادي — اضغط على الكتاب للتصفح والتحميل"
      />
      <BookShelf
        books={arabicBooks}
        renderLink={(book, index) => (
          <Link
            to="/books/arabic/$index"
            params={{ index: String(index) }}
            className="flex min-w-0 flex-1 items-center gap-4"
          >
            <BookLinkContent book={book} />
          </Link>
        )}
      />
    </>
  );
}
