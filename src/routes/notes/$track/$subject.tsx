import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { BookOpen, ClipboardList } from "lucide-react";
import { ResourceLibrary } from "@/components/ResourceLibrary";
import { meta, PageHero } from "@/components/SiteShell";
import { notesTracks, teacherNotes } from "@/data/site";
import { BackLink, NotFoundSection } from "@/components/NotesNav";

export const Route = createFileRoute("/notes/$track/$subject")({
  head: ({ params }) => {
    const subject = notesTracks.find((t) => t.slug === params.track)?.structure.find((s) => s.slug === params.subject);
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
  const extra = track.slug === "teachers" ? (teacherNotes.find((n) => n.subject === subject.subject)?.notes ?? []) : [];
  const cards = [
    { slug: "chapters", label: "الفصول", Icon: BookOpen },
    { slug: "homework", label: "الواجبات", Icon: ClipboardList },
  ];
  return (
    <>
      <PageHero title={subject.subject} subtitle={subject.note ? `(${subject.note})` : "اختر الفصول أو الواجبات"} />
      <div className="mx-auto max-w-5xl px-4 py-8">
        <BackLink to="/notes/$track" params={{ track: track.slug }} label={`العودة إلى ${track.title}`} />
        <div className="grid gap-4 sm:grid-cols-2">
          {cards.map(({ slug, label, Icon }) => (
            <Link
              key={slug}
              to="/notes/$track/$subject/$section"
              params={{ track: track.slug, subject: subject.slug, section: slug }}
              className="card-lift group flex min-h-40 items-center gap-4 rounded-2xl border bg-card p-6"
            >
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-brand text-primary-foreground transition-transform group-hover:scale-110">
                <Icon className="h-7 w-7" />
              </span>
              <span className="text-2xl font-bold">{label}</span>
            </Link>
          ))}
        </div>
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
