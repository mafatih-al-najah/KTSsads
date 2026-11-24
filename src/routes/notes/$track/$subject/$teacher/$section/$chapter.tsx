import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, BookOpen } from "lucide-react";
import { ResourceLibrary } from "@/components/ResourceLibrary";
import { meta, PageHero } from "@/components/SiteShell";
import { notesTracks, subjectTeachers } from "@/data/site";
import { BackLink, NotFoundSection } from "@/components/NotesNav";
import { createAnchorClickHandler } from "@/lib/smooth-scroll";

export const Route = createFileRoute("/notes/$track/$subject/$teacher/$section/$chapter")({
  head: ({ params }) => {
    const subject = notesTracks
      .find((t) => t.slug === params.track)
      ?.structure.find((s) => s.slug === params.subject);
    if (params.subject === "french") {
      const curriculum = subject?.sections.find((s) => s.slug === params.section);
      const item = curriculum?.children?.find((c) => c.slug === params.chapter);
      return meta(item?.label ?? "القسم غير موجود", "ملازم الفرنسي.");
    }
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
  if (!track || !subject || !teacher) return <NotFoundSection />;

  if (subject.slug === "french") {
    const curriculum = subject.sections.find((s) => s.slug === kind);
    const item = curriculum?.children?.find((c) => c.slug === chapterSlug);
    const allowedMinisterial =
      chapterSlug !== "old-ministerial" || teacher.slug === "othman-alnaimi";
    if (!curriculum || !item || !allowedMinisterial) return <NotFoundSection />;

    const key = `${curriculum.slug}/${item.slug}`;
    const resources = (track.chapters["french"]?.[key] ?? []).filter(
      (r) => r.teacher === teacher.name,
    );
    return (
      <>
        <PageHero
          title={`${subject.subject} — ${item.label}`}
          subtitle={`${curriculum.label} — ${teacher.name}`}
        />
        <div className="mx-auto max-w-5xl px-4 py-8">
          <BackLink
            to="/notes/$track/$subject/$teacher/$section"
            params={{
              track: track.slug,
              subject: subject.slug,
              teacher: teacher.slug,
              section: curriculum.slug,
            }}
            label={`العودة إلى ${curriculum.label}`}
          />
          <ResourceLibrary resources={resources} emptyText="لا توجد ملازم مرفوعة حالياً." />
        </div>
      </>
    );
  }

  const chapter = subject.sections.find((s) => s.slug === chapterSlug);
  if (!chapter || (kind !== "chapters" && kind !== "homework")) return <NotFoundSection />;
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
                  data-tactile="true"
                  onClick={createAnchorClickHandler(child.slug)}
                  className="card-lift card-glow rise group flex min-h-32 items-center gap-4 rounded-3xl border border-border/80 bg-card/90 p-6 shadow-sm backdrop-blur-sm"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-secondary text-primary transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                    <BookOpen className="h-6 w-6" />
                  </span>
                  <h2 className="flex-1 font-display text-lg font-extrabold transition-colors group-hover:text-primary">
                    {child.label}
                  </h2>
                  <ArrowDown className="h-4 w-4 shrink-0 text-muted-foreground opacity-60 transition duration-200 group-hover:translate-y-0.5 group-hover:text-primary" />
                </a>
              ))}
            </div>
            {chapter.children.map((child) => (
              <section key={child.slug} id={child.slug} className="mt-8 scroll-mt-24 border-t pt-6">
                <h2 className="font-display text-xl font-extrabold">{child.label}</h2>
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
