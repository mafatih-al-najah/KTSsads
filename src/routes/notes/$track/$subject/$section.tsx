import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { BookOpen, ClipboardList } from "lucide-react";
import { meta, PageHero } from "@/components/SiteShell";
import { notesTracks } from "@/data/site";
import { BackLink, NotFoundSection } from "@/components/NotesNav";

const kinds: Record<string, string> = { chapters: "الفصول", homework: "الواجبات" };

export const Route = createFileRoute("/notes/$track/$subject/$section")({
  head: ({ params }) => meta(kinds[params.section] ?? "القسم غير موجود", "اختر الفصل."),
  component: KindPage,
});

function KindPage() {
  const { pathname } = useLocation();
  const { track: trackSlug, subject: subjectSlug, section: kind } = Route.useParams();
  if (pathname.replace(/\/$/, "") !== `/notes/${trackSlug}/${subjectSlug}/${kind}`) return <Outlet />;
  const track = notesTracks.find((t) => t.slug === trackSlug);
  const subject = track?.structure.find((s) => s.slug === subjectSlug);
  if (!track || !subject || !kinds[kind]) return <NotFoundSection />;
  const Icon = kind === "homework" ? ClipboardList : BookOpen;
  return (
    <>
      <PageHero title={`${subject.subject} — ${kinds[kind]}`} subtitle="اختر الفصل" />
      <div className="mx-auto max-w-5xl px-4 py-8">
        <BackLink to="/notes/$track/$subject" params={{ track: track.slug, subject: subject.slug }} label={`العودة إلى ${subject.subject}`} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {subject.sections.map((s, index) => (
            <Link
              key={s.slug}
              to="/notes/$track/$subject/$section/$chapter"
              params={{ track: track.slug, subject: subject.slug, section: kind, chapter: s.slug }}
              className="card-lift group flex min-h-32 items-center gap-4 rounded-2xl border bg-card p-5"
              style={{ animationDelay: `${index * 40}ms` }}
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-secondary text-primary transition-transform group-hover:scale-110">
                <Icon className="h-5 w-5" />
              </span>
              <span className="font-bold leading-relaxed">{s.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
