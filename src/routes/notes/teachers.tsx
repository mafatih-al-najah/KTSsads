import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { meta, PageHero } from "@/components/SiteShell";
import { teacherStudyStructure } from "@/data/site";

export const Route = createFileRoute("/notes/teachers")({
  head: () => meta("ملازم المدرسين", "ملازم يرفعها المدرسون لطلابهم."),
  component: TeachersNotesPage,
});

function TeachersNotesPage() {
  const { pathname } = useLocation();
  if (pathname !== "/notes/teachers" && pathname !== "/notes/teachers/") {
    return <Outlet />;
  }

  return (
    <>
      <PageHero title="ملازم المدرسين" subtitle="اختر المادة لعرض الفصول والواجبات" />
      <div className="mx-auto grid max-w-5xl gap-4 px-4 py-10 sm:grid-cols-2 lg:grid-cols-3">
        {teacherStudyStructure.map(({ slug, subject }, index) => (
          <Link
            key={slug}
            to="/notes/teachers/$subject"
            params={{ subject: slug }}
            className="card-lift group flex min-h-36 items-center gap-4 rounded-2xl border bg-card p-5 sm:p-6"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-secondary text-primary transition-transform group-hover:scale-110">
              <BookOpen className="h-6 w-6" />
            </span>
            <span className="text-lg font-bold">{subject}</span>
          </Link>
        ))}
      </div>
    </>
  );
}
