import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { meta, PageHero } from "@/components/SiteShell";
import { notesTracks } from "@/data/site";
import { BackLink, NotFoundSection } from "@/components/NotesNav";

export const Route = createFileRoute("/notes/$track")({
  head: ({ params }) =>
    meta(notesTracks.find((t) => t.slug === params.track)?.title ?? "الملازم", "اختر المادة لعرض الفصول والواجبات."),
  component: TrackPage,
});

function TrackPage() {
  const { pathname } = useLocation();
  const { track: trackSlug } = Route.useParams();
  if (pathname.replace(/\/$/, "") !== `/notes/${trackSlug}`) return <Outlet />;
  const track = notesTracks.find((t) => t.slug === trackSlug);
  if (!track) return <NotFoundSection />;
  return (
    <>
      <PageHero title={track.title} subtitle="اختر المادة لعرض الفصول والواجبات" />
      <div className="mx-auto max-w-5xl px-4 py-8">
        <BackLink to="/notes" label="العودة إلى الملازم" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {track.structure.map(({ slug, subject, note }, index) => (
            <Link
              key={slug}
              to="/notes/$track/$subject"
              params={{ track: track.slug, subject: slug }}
              className="card-lift group flex min-h-36 items-center gap-4 rounded-2xl border bg-card p-5 sm:p-6"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-secondary text-primary transition-transform group-hover:scale-110">
                <BookOpen className="h-6 w-6" />
              </span>
              <span>
                <span className="block text-lg font-bold">{subject}</span>
                {note && <span className="mt-1 block text-sm text-muted-foreground">({note})</span>}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
