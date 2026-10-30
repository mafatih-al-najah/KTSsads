import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { BookOpen, NotebookPen, Sparkles } from "lucide-react";
import { meta, PageHero } from "@/components/SiteShell";

export const Route = createFileRoute("/notes")({
  head: () => meta("الملازم", "ملازم المدرسين والكتب المؤشرة لطلاب المنهج العراقي."),
  component: NotesPage,
});

function NotesPage() {
  const { pathname } = useLocation();
  if (pathname !== "/notes") return <Outlet />;
  return (
    <>
      <PageHero title="الملازم" subtitle="اختر القسم لعرض المحتوى" />
      <div className="mx-auto grid max-w-5xl gap-6 px-4 py-14 sm:grid-cols-2">
        <Link
          to="/notes/teachers"
          className="card-lift flex flex-col items-center rounded-2xl border bg-card p-10 text-center"
        >
          <span className="grid h-16 w-16 place-items-center rounded-2xl bg-brand text-primary-foreground">
            <NotebookPen className="h-7 w-7" />
          </span>
          <h3 className="mt-5 text-2xl font-bold">ملازم المدرسين</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            ملازم يرفعها المدرسون مباشرة لطلابهم
          </p>
        </Link>
        <Link
          to="/notes/indicated"
          className="card-lift flex flex-col items-center rounded-2xl border bg-card p-10 text-center"
        >
          <span className="grid h-16 w-16 place-items-center rounded-2xl bg-brand text-primary-foreground">
            <BookOpen className="h-7 w-7" />
          </span>
          <h3 className="mt-5 text-2xl font-bold">الكتب المؤشرة</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            ملازم ومنهجيات الكتب المؤشرة من قبل الوزارة
          </p>
        </Link>
      </div>
    </>
  );
}
