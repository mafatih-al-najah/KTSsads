import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, ClipboardList } from "lucide-react";
import { ResourceLibrary } from "@/components/ResourceLibrary";
import { meta, PageHero } from "@/components/SiteShell";
import { chapterNotes, teacherHomework, teacherStudyStructure } from "@/data/site";

export const Route = createFileRoute("/notes/teachers/$subject/$section")({
  head: ({ params }) => {
    const subject = teacherStudyStructure.find((item) => item.slug === params.subject);
    const section = subject?.sections.find((item) => item.slug === params.section);
    return meta(
      params.section === "homework" ? "الواجبات" : (section?.label ?? "القسم غير موجود"),
      "ملازم وواجبات المادة.",
    );
  },
  component: TeacherSectionPage,
});

function TeacherSectionPage() {
  const { subject: subjectSlug, section: sectionSlug } = Route.useParams();
  const subject = teacherStudyStructure.find((item) => item.slug === subjectSlug);
  const section = subject?.sections.find((item) => item.slug === sectionSlug);
  const isHomework = sectionSlug === "homework";
  const homework =
    teacherHomework.find((item) => item.subject === subject?.subject)?.resources ?? [];
  const sectionNotes = chapterNotes[subjectSlug] ?? {};

  if (!subject || (!isHomework && !section)) {
    return (
      <>
        <PageHero title="القسم غير موجود" />
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

  const title = isHomework ? "الواجبات" : `${subject.subject} — ${section?.label}`;

  return (
    <>
      <PageHero
        title={title}
        subtitle={isHomework ? `واجبات مادة ${subject.subject}` : "اختر القسم المطلوب"}
      />
      <div className="mx-auto max-w-5xl px-4 py-8">
        <Link
          to="/notes/teachers/$subject"
          params={{ subject: subject.slug }}
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-primary"
        >
          <ArrowRight className="h-4 w-4" />
          العودة إلى {subject.subject}
        </Link>
        {!isHomework && section?.children ? (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              {section.children.map((child) => (
                <article
                  key={child.slug}
                  className="card-lift flex min-h-36 items-center gap-4 rounded-2xl border bg-card p-6"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
                    <BookOpen className="h-6 w-6" />
                  </span>
                  <h2 className="text-lg font-bold">{child.label}</h2>
                </article>
              ))}
              <Link
                to="/notes/teachers/$subject/$section"
                params={{ subject: subject.slug, section: "homework" }}
                className="card-lift group flex min-h-36 items-center gap-4 rounded-2xl border border-primary/30 bg-primary/5 p-6"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground transition-transform group-hover:scale-110">
                  <ClipboardList className="h-6 w-6" />
                </span>
                <h2 className="font-bold">الواجبات</h2>
              </Link>
            </div>
            {section.children.map((child) => {
              const notes = sectionNotes[`${section.slug}/${child.slug}`] ?? [];
              return notes.length > 0 ? (
                <section key={child.slug} className="mt-8 border-t pt-6">
                  <h2 className="text-xl font-bold">ملازم {child.label}</h2>
                  <ResourceLibrary resources={notes} emptyText="" />
                </section>
              ) : null;
            })}
          </>
        ) : isHomework ? (
          <ResourceLibrary resources={homework} emptyText="لا توجد واجبات مرفوعة حالياً." />
        ) : (
          <ResourceLibrary
            resources={sectionNotes[sectionSlug] ?? []}
            emptyText="لا توجد ملازم مرفوعة لهذا الفصل حالياً."
          />
        )}
      </div>
    </>
  );
}
