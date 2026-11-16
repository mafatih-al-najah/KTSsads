import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { ArrowRight, BookOpen, ClipboardList } from "lucide-react";
import { ResourceLibrary } from "@/components/ResourceLibrary";
import { meta, PageHero } from "@/components/SiteShell";
import { teacherNotes, teacherStudyStructure } from "@/data/site";

export const Route = createFileRoute("/notes/teachers/$subject")({
  head: ({ params }) => {
    const subject = teacherStudyStructure.find((item) => item.slug === params.subject);
    return meta(subject?.subject ?? "المادة غير موجودة", "فصول وواجبات المادة.");
  },
  component: TeacherSubjectPage,
});

function TeacherSubjectPage() {
  const { pathname } = useLocation();
  const { subject: subjectSlug } = Route.useParams();
  if (
    pathname !== `/notes/teachers/${subjectSlug}` &&
    pathname !== `/notes/teachers/${subjectSlug}/`
  ) {
    return <Outlet />;
  }

  const subject = teacherStudyStructure.find((item) => item.slug === subjectSlug);
  const resources = teacherNotes.find((item) => item.subject === subject?.subject)?.notes ?? [];

  if (!subject) {
    return (
      <>
        <PageHero title="المادة غير موجودة" />
        <div className="mx-auto max-w-5xl px-4 py-10">
          <Link
            to="/notes/teachers"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            <ArrowRight className="h-4 w-4" />
            العودة إلى المواد
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHero title={subject.subject} subtitle="اختر الفصل أو تصفح الواجبات" />
      <div className="mx-auto max-w-5xl px-4 py-8">
        <Link
          to="/notes/teachers"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-primary"
        >
          <ArrowRight className="h-4 w-4" />
          العودة إلى المواد
        </Link>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {subject.sections.map((section, index) => (
            <Link
              key={section.slug}
              to="/notes/teachers/$subject/$section"
              params={{ subject: subject.slug, section: section.slug }}
              className="card-lift group flex min-h-32 items-center gap-4 rounded-2xl border bg-card p-5"
              style={{ animationDelay: `${index * 40}ms` }}
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-secondary text-primary transition-transform group-hover:scale-110">
                <BookOpen className="h-5 w-5" />
              </span>
              <span className="font-bold leading-relaxed">{section.label}</span>
            </Link>
          ))}
          <Link
            to="/notes/teachers/$subject/$section"
            params={{ subject: subject.slug, section: "homework" }}
            className="card-lift group flex min-h-32 items-center gap-4 rounded-2xl border border-primary/30 bg-primary/5 p-5"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground transition-transform group-hover:scale-110">
              <ClipboardList className="h-5 w-5" />
            </span>
            <span className="font-bold">الواجبات</span>
          </Link>
        </div>
      </div>
      {resources.length > 0 && (
        <section className="border-t">
          <h2 className="mx-auto max-w-5xl px-4 pt-8 text-xl font-bold">ملازم مضافة للمادة</h2>
          <ResourceLibrary resources={resources} emptyText="" />
        </section>
      )}
    </>
  );
}
