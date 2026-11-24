import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, GraduationCap } from "lucide-react";
import { meta, PageHero } from "@/components/SiteShell";
import { smoothScrollToTop } from "@/lib/smooth-scroll";

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
          data-tactile="true"
          onClick={smoothScrollToTop}
          className="card-lift card-glow rise group flex flex-col items-center rounded-3xl border border-border/80 bg-card/90 p-10 text-center shadow-sm backdrop-blur-sm"
        >
          <span className="grid h-16 w-16 place-items-center rounded-2xl bg-brand text-primary-foreground shadow-glow transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
            <BookOpen className="h-7 w-7" />
          </span>
          <h3 className="mt-5 font-display text-2xl font-extrabold transition-colors group-hover:text-primary">
            كتب المنهج العربي
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">كتب المناهج العربية لجميع المواد</p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-primary">
            عرض الكتب
            <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
          </span>
        </Link>
        <Link
          to="/books/excellence"
          data-tactile="true"
          onClick={smoothScrollToTop}
          className="card-lift card-glow rise group flex flex-col items-center rounded-3xl border border-border/80 bg-card/90 p-10 text-center shadow-sm backdrop-blur-sm"
          style={{ animationDelay: "80ms" }}
        >
          <span className="grid h-16 w-16 place-items-center rounded-2xl bg-brand text-primary-foreground shadow-glow transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
            <GraduationCap className="h-7 w-7" />
          </span>
          <h3 className="mt-5 font-display text-2xl font-extrabold transition-colors group-hover:text-primary">
            كتب منهج المتميزين
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            كتب منهج مدارس المتميزين لجميع المواد
          </p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-primary">
            عرض الكتب
            <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
          </span>
        </Link>
      </div>
    </>
  );
}
