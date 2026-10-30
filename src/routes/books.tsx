import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { BookOpen, GraduationCap } from "lucide-react";
import { meta, PageHero } from "@/components/SiteShell";

export const Route = createFileRoute("/books")({
  head: () => meta("الكتب", "كتب المنهج العربي ومنهج المتميزين."),
  component: BooksPage,
});

function BooksPage() {
  const { pathname } = useLocation();
  if (pathname !== "/books") return <Outlet />;
  return (
    <>
      <PageHero title="الكتب" subtitle="اختر المنهج لعرض الكتب المتوفرة" />
      <div className="mx-auto grid max-w-5xl gap-6 px-4 py-14 sm:grid-cols-2">
        <Link
          to="/books/arabic"
          className="card-lift flex flex-col items-center rounded-2xl border bg-card p-10 text-center"
        >
          <span className="grid h-16 w-16 place-items-center rounded-2xl bg-brand text-primary-foreground">
            <BookOpen className="h-7 w-7" />
          </span>
          <h3 className="mt-5 text-2xl font-bold">كتب المنهج العربي</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            كتب المناهج العربية لجميع المواد
          </p>
        </Link>
        <Link
          to="/books/excellence"
          className="card-lift flex flex-col items-center rounded-2xl border bg-card p-10 text-center"
        >
          <span className="grid h-16 w-16 place-items-center rounded-2xl bg-brand text-primary-foreground">
            <GraduationCap className="h-7 w-7" />
          </span>
          <h3 className="mt-5 text-2xl font-bold">كتب منهج المتميزين</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            كتب منهج مدارس المتميزين لجميع المواد
          </p>
        </Link>
      </div>
    </>
  );
}
