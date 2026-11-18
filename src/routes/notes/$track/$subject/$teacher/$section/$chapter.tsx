import { createFileRoute } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { ResourceLibrary } from "@/components/ResourceLibrary";
import { meta, PageHero } from "@/components/SiteShell";
import { notesTracks, subjectTeachers } from "@/data/site";
import { BackLink, NotFoundSection } from "@/components/NotesNav";

export const Route = createFileRoute("/notes/$track/$subject/$teacher/$section/$chapter")({
  head: ({ params }) => {
    const subject = notesTracks
      .find((t) => t.slug === params.track)
      ?.structure.find((s) => s.slug === params.subject);
    return meta(
      subject?.sections.find((s) => s.slug === params.chapter)?.label ?? "الفصل غير موجود",
      "ملازم وواجبات الفصل.",
    );
  },
  component: ChapterPage,
});

function ChapterPage() {
  const {
    track: trackSlug,
    subject: subjectSlug,
    teacher: teacherSlug,
    section: kind,
    chapter: chapterSlug,
  } = Route.useParams();
  const track = notesTracks.find((t) => t.slug === trackSlug);
  const subject = track?.structure.find((s) => s.slug === subjectSlug);
  const teacher = subjectTeachers[subjectSlug]?.find((t) => t.slug === teacherSlug);
  const chapter = subject?.sections.find((s) => s.slug === chapterSlug);
  if (!track || !subject || !teacher || !chapter || (kind !== "chapters" && kind !== "homework"))
    return <NotFoundSection />;
  const isHomework = kind === "homework";
  const allNotes = isHomework ? track.homework : track.chapters;
  const notesForSubject = allNotes[subject.slug] ?? {};
  const teacherName = teacher.name;
  const notesForTeacher = Object.fromEntries(
    Object.entries(notesForSubject).map(([key, resources]) => [
      key,
      (resources ?? []).filter((r) => r.teacher === teacherName),
    ]),
  );
  const empty = isHomework
    ? "لا توجد واجبات مرفوعة لهذا الفصل حالياً."
    : "لا توجد ملازم مرفوعة لهذا الفصل حالياً.";
  return (
    <>
      <PageHero
        title={`${subject.subject} — ${chapter.label}`}
        subtitle={isHomework ? "الواجبات" : "الفصول"}
      />
      <div className="mx-auto max-w-5xl px-4 py-8">
        <BackLink
          to="/notes/$track/$subject/$teacher/$section"
          params={{
            track: track.slug,
            subject: subject.slug,
            teacher: teacher.slug,
            section: kind,
          }}
          label={`العودة إلى ${isHomework ? "الواجبات" : "الفصول"}`}
        />
        {chapter.children ? (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              {chapter.children.map((child, index) => (
                <a
                  key={child.slug}
                  href={`#${child.slug}`}
                  className="card-lift group flex min-h-32 items-center gap-4 rounded-2xl border bg-card p-6"
                  style={{
                    animation: "rise .5s cubic-bezier(.22,1,.36,1) both",
                    animationDelay: `${index * 60}ms`,
                  }}
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-secondary text-primary transition-transform duration-300 group-hover:scale-110">
                    <BookOpen className="h-6 w-6" />
                  </span>
                  <h2 className="text-lg font-bold">{child.label}</h2>
                </a>
              ))}
            </div>
            {chapter.children.map((child) => (
              <section key={child.slug} id={child.slug} className="mt-8 scroll-mt-24 border-t pt-6">
                <h2 className="text-xl font-bold">{child.label}</h2>
                <ResourceLibrary
                  resources={notesForTeacher[`${chapter.slug}/${child.slug}`] ?? []}
                  emptyText={empty}
                />
              </section>
            ))}
          </>
        ) : (
          <ResourceLibrary resources={notesForTeacher[chapter.slug] ?? []} emptyText={empty} />
        )}
      </div>
    </>
  );
}
