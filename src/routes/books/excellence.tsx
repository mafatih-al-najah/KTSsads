import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { meta, PageHero } from "@/components/SiteShell";
import { BookLinkContent, BookShelf } from "@/components/BookShelf";
import { excellenceBooks } from "@/data/site";

export const Route = createFileRoute("/books/excellence")({
  head: () => meta("كتب منهج المتميزين", "كتب منهج مدارس المتميزين لجميع المواد."),
  component: ExcellenceBooksPage,
});

function ExcellenceBooksPage() {
  const { pathname } = useLocation();
  if (pathname !== "/books/excellence" && pathname !== "/books/excellence/") return <Outlet />;
  return (
    <>
      <PageHero
        title="كتب منهج المتميزين"
        subtitle="كتب منهج مدارس المتميزين لجميع مواد السادس الإعدادي — اضغط على الكتاب للتصفح والتحميل"
      />
      <BookShelf
        books={excellenceBooks}
        renderLink={(book, index) => (
          <Link
            to="/books/excellence/$index"
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
