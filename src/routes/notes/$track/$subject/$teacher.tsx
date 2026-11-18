import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { BookOpen, ClipboardList, User } from "lucide-react";
import { meta, PageHero } from "@/components/SiteShell";
import { notesTracks, subjectTeachers } from "@/data/site";
import { BackLink, NotFoundSection } from "@/components/NotesNav";

export const Route = createFileRoute("/notes/$track/$subject/$teacher")({
  head: ({ params }) => {
    const subject = notesTracks
      .find((t) => t.slug === params.track)
      ?.structure.find((s) => s.slug === params.subject);
    const teacher = subjectTeachers[params.subject]?.find((t) => t.slug === params.teacher);
    return meta(
      teacher ? `${teacher.name} — ${subject?.subject ?? ""}` : "المدرس غير موجود",
      "الفصول والواجبات.",
    );
  },
  component: TeacherPage,
});

function TeacherPage() {
  const { pathname } = useLocation();
  const { track: trackSlug, subject: subjectSlug, teacher: teacherSlug } = Route.useParams();
  if (pathname.replace(/\/$/, "") !== `/notes/${trackSlug}/${subjectSlug}/${teacherSlug}`)
    return <Outlet />;
  const track = notesTracks.find((t) => t.slug === trackSlug);
  const subject = track?.structure.find((s) => s.slug === subjectSlug);
  const teacher = subjectTeachers[subjectSlug]?.find((t) => t.slug === teacherSlug);
  if (!track || !subject || !teacher) return <NotFoundSection />;
  const cards = [
    { slug: "chapters", label: "الفصول", Icon: BookOpen },
    { slug: "homework", label: "الواجبات", Icon: ClipboardList },
  ];
  return (
    <>
      <PageHero title={teacher.name} subtitle={subject.subject} />
      <div className="mx-auto max-w-5xl px-4 py-8">
        <BackLink
          to="/notes/$track/$subject"
          params={{ track: track.slug, subject: subject.slug }}
          label={`العودة إلى ${subject.subject}`}
        />
        <div className="mb-8 flex flex-col items-center">
          <div className="teacher-avatar group">
            {teacher.photo ? (
              <img
                src={teacher.photo}
                alt={teacher.name}
                className="h-full w-full rounded-2xl object-cover"
              />
            ) : (
              <User className="h-12 w-12 text-muted-foreground transition-transform duration-300 group-hover:scale-110" />
            )}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {cards.map(({ slug, label, Icon }, index) => (
            <Link
              key={slug}
              to="/notes/$track/$subject/$teacher/$section"
              params={{
                track: track.slug,
                subject: subject.slug,
                teacher: teacher.slug,
                section: slug,
              }}
              className="card-lift card-glow group flex min-h-40 items-center gap-4 rounded-2xl border bg-card p-6"
              style={{
                animation: "rise .6s cubic-bezier(.22,1,.36,1) both",
                animationDelay: `${index * 100}ms`,
              }}
            >
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-brand text-primary-foreground transition-transform duration-300 group-hover:scale-110">
                <Icon className="h-7 w-7" />
              </span>
              <span className="text-2xl font-bold">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
