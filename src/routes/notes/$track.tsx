import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { ArrowLeft, BookOpen } from "lucide-react";
import { meta, PageHero } from "@/components/SiteShell";
import { notesTracks } from "@/data/site";
import { BackLink, NotFoundSection } from "@/components/NotesNav";
import { smoothScrollToTop } from "@/lib/smooth-scroll";

export const Route = createFileRoute("/notes/$track")({
  head: ({ params }) =>
    meta(
      notesTracks.find((t) => t.slug === params.track)?.title ?? "الملازم",
      "اختر المادة لعرض الفصول والواجبات.",
    ),
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
              data-tactile="true"
              onClick={smoothScrollToTop}
              className="card-lift card-glow rise group flex min-h-36 items-center gap-4 rounded-3xl border border-border/80 bg-card/90 p-5 shadow-sm backdrop-blur-sm sm:p-6"
              style={{ animationDelay: `${index * 45}ms` }}
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-secondary text-primary shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                <BookOpen className="h-6 w-6" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-display text-lg font-extrabold transition-colors group-hover:text-primary">
                  {subject}
                </span>
                {note && <span className="mt-1 block text-xs text-muted-foreground">({note})</span>}
              </span>
              <ArrowLeft className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition duration-200 group-hover:-translate-x-1 group-hover:opacity-100" />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
