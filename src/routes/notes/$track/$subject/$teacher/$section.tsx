import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, ClipboardList } from "lucide-react";
import { ResourceLibrary } from "@/components/ResourceLibrary";
import { meta, PageHero } from "@/components/SiteShell";
import { notesTracks, subjectTeachers } from "@/data/site";
import { BackLink, NotFoundSection } from "@/components/NotesNav";
import { smoothScrollToTop } from "@/lib/smooth-scroll";

const kinds: Record<string, string> = { chapters: "الفصول", homework: "الواجبات" };
const frenchCurricula: Record<string, string> = {
  "old-curriculum": "المنهج القديم",
  "new-curriculum": "المنهج الجديد",
};

export const Route = createFileRoute("/notes/$track/$subject/$teacher/$section")({
  head: ({ params }) => {
    const title =
      params.subject === "french"
        ? (frenchCurricula[params.section] ?? "القسم غير موجود")
        : (kinds[params.section] ?? "القسم غير موجود");
    return meta(title, "اختر القسم.");
  },
  component: KindPage,
});

function KindPage() {
  const { pathname } = useLocation();
  const {
    track: trackSlug,
    subject: subjectSlug,
    teacher: teacherSlug,
    section: kind,
  } = Route.useParams();
  if (pathname.replace(/\/$/, "") !== `/notes/${trackSlug}/${subjectSlug}/${teacherSlug}/${kind}`)
    return <Outlet />;
  const track = notesTracks.find((t) => t.slug === trackSlug);
  const subject = track?.structure.find((s) => s.slug === subjectSlug);
  const teacher = subjectTeachers[subjectSlug]?.find((t) => t.slug === teacherSlug);
  if (!track || !subject || !teacher) return <NotFoundSection />;

  if (subject.slug === "french") {
    const curriculum = subject.sections.find((s) => s.slug === kind);
    if (!curriculum) return <NotFoundSection />;

    if (curriculum.slug === "old-curriculum") {
      const items = (curriculum.children ?? []).filter(
        (child) => child.slug !== "old-ministerial" || teacher.slug === "othman-alnaimi",
      );
      return (
        <>
          <PageHero
            title={`${subject.subject} — ${curriculum.label}`}
            subtitle={`المدرس: ${teacher.name}`}
          />
          <div className="mx-auto max-w-5xl px-4 py-8">
            <BackLink
              to="/notes/$track/$subject/$teacher"
              params={{ track: track.slug, subject: subject.slug, teacher: teacher.slug }}
              label={`العودة إلى ${teacher.name}`}
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item, index) => (
                <Link
                  key={item.slug}
                  to="/notes/$track/$subject/$teacher/$section/$chapter"
                  params={{
                    track: track.slug,
                    subject: subject.slug,
                    teacher: teacher.slug,
                    section: kind,
                    chapter: item.slug,
                  }}
                  data-tactile="true"
                  onClick={smoothScrollToTop}
                  className="card-lift card-glow rise group flex min-h-32 items-center gap-4 rounded-3xl border border-border/80 bg-card/90 p-5 shadow-sm backdrop-blur-sm"
                  style={{ animationDelay: `${index * 45}ms` }}
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-secondary text-primary transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                    <BookOpen className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1 font-display font-bold leading-relaxed transition-colors group-hover:text-primary">
                    {item.label}
                  </span>
                  <ArrowLeft className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition duration-200 group-hover:-translate-x-1 group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </div>
        </>
      );
    }

    const frenchNotes = track.chapters["french"]?.[curriculum.slug] ?? [];
    const teacherNotes = frenchNotes.filter((r) => r.teacher === teacher.name);
    return (
      <>
        <PageHero
          title={`${subject.subject} — ${curriculum.label}`}
          subtitle={`المدرس: ${teacher.name}`}
        />
        <div className="mx-auto max-w-5xl px-4 py-8">
          <BackLink
            to="/notes/$track/$subject/$teacher"
            params={{ track: track.slug, subject: subject.slug, teacher: teacher.slug }}
            label={`العودة إلى ${teacher.name}`}
          />
          <ResourceLibrary
            resources={teacherNotes}
            emptyText="لا توجد ملازم مرفوعة لهذا المنهج حالياً."
          />
        </div>
      </>
    );
  }

  if (!kinds[kind]) return <NotFoundSection />;
  const Icon = kind === "homework" ? ClipboardList : BookOpen;
  return (
    <>
      <PageHero
        title={`${subject.subject} — ${kinds[kind]}`}
        subtitle={`المدرس: ${teacher.name}`}
      />
      <div className="mx-auto max-w-5xl px-4 py-8">
        <BackLink
          to="/notes/$track/$subject/$teacher"
          params={{ track: track.slug, subject: subject.slug, teacher: teacher.slug }}
          label={`العودة إلى ${teacher.name}`}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {subject.sections.map((s, index) => (
            <Link
              key={s.slug}
              to="/notes/$track/$subject/$teacher/$section/$chapter"
              params={{
                track: track.slug,
                subject: subject.slug,
                teacher: teacher.slug,
                section: kind,
                chapter: s.slug,
              }}
              data-tactile="true"
              onClick={smoothScrollToTop}
              className="card-lift card-glow rise group flex min-h-32 items-center gap-4 rounded-3xl border border-border/80 bg-card/90 p-5 shadow-sm backdrop-blur-sm"
              style={{ animationDelay: `${index * 45}ms` }}
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-secondary text-primary transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                <Icon className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1 font-display font-bold leading-relaxed transition-colors group-hover:text-primary">
                {s.label}
              </span>
              <ArrowLeft className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition duration-200 group-hover:-translate-x-1 group-hover:opacity-100" />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
