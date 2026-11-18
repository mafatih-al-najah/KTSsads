import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { User } from "lucide-react";
import { ResourceLibrary } from "@/components/ResourceLibrary";
import { meta, PageHero } from "@/components/SiteShell";
import { notesTracks, teacherNotes, subjectTeachers } from "@/data/site";
import { BackLink, NotFoundSection } from "@/components/NotesNav";

export const Route = createFileRoute("/notes/$track/$subject")({
  head: ({ params }) => {
    const subject = notesTracks
      .find((t) => t.slug === params.track)
      ?.structure.find((s) => s.slug === params.subject);
    return meta(subject?.subject ?? "المادة غير موجودة", "الفصول والواجبات.");
  },
  component: SubjectPage,
});

function SubjectPage() {
  const { pathname } = useLocation();
  const { track: trackSlug, subject: subjectSlug } = Route.useParams();
  if (pathname.replace(/\/$/, "") !== `/notes/${trackSlug}/${subjectSlug}`) return <Outlet />;
  const track = notesTracks.find((t) => t.slug === trackSlug);
  const subject = track?.structure.find((s) => s.slug === subjectSlug);
  if (!track || !subject) return <NotFoundSection />;
  const extra =
    track.slug === "teachers"
      ? (teacherNotes.find((n) => n.subject === subject.subject)?.notes ?? [])
      : [];
  const teachers = subjectTeachers[subject.slug] ?? [];
  return (
    <>
      <PageHero
        title={subject.subject}
        subtitle={subject.note ? `(${subject.note})` : "اختر المدرس لعرض الفصول والواجبات"}
      />
      <div className="mx-auto max-w-5xl px-4 py-8">
        <BackLink
          to="/notes/$track"
          params={{ track: track.slug }}
          label={`العودة إلى ${track.title}`}
        />
        {teachers.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {teachers.map((teacher, index) => (
              <Link
                key={teacher.slug}
                to="/notes/$track/$subject/$teacher"
                params={{ track: track.slug, subject: subject.slug, teacher: teacher.slug }}
                className="card-lift card-glow group flex flex-col items-center rounded-2xl border bg-card p-6 text-center"
                style={{
                  animation: "rise .6s cubic-bezier(.22,1,.36,1) both",
                  animationDelay: `${index * 60}ms`,
                }}
              >
                <div className="teacher-avatar mb-4 group/av">
                  {teacher.photo ? (
                    <img
                      src={teacher.photo}
                      alt={teacher.name}
                      className="h-full w-full rounded-2xl object-cover"
                    />
                  ) : (
                    <User className="h-10 w-10 text-muted-foreground transition-transform duration-300 group-hover/av:scale-110" />
                  )}
                </div>
                <h3 className="text-lg font-bold transition-colors group-hover:text-primary">
                  {teacher.name}
                </h3>
              </Link>
            ))}
          </div>
        ) : (
          <p className="py-10 text-center text-muted-foreground">
            لا يوجد مدرسين مضافين لهذه المادة حالياً.
          </p>
        )}
      </div>
      {extra.length > 0 && (
        <section className="border-t">
          <h2 className="mx-auto max-w-5xl px-4 pt-8 text-xl font-bold">ملازم مضافة للمادة</h2>
          <ResourceLibrary resources={extra} emptyText="" />
        </section>
      )}
    </>
  );
}
