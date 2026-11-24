import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowUp,
  BarChart3,
  BookMarked,
  BookOpen,
  GraduationCap,
  Heart,
  Info,
  Library,
  Lightbulb,
  Phone,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import { meta, nav } from "@/components/SiteShell";
import { WelcomeHero } from "@/components/WelcomeHero";
import { createAnchorClickHandler, smoothScrollToId, smoothScrollToTop } from "@/lib/smooth-scroll";

export const Route = createFileRoute("/")({
  head: () => meta("الرئيسية", "مفاتيح النجاح: ملازم، مصححون، إعلانات ونصائح لطلاب العراق 2026."),
  component: Index,
});

const icons: Record<string, LucideIcon> = {
  "/notes": BookOpen,
  "/books": Library,
  "/excellence": Trophy,
  "/minimums": BarChart3,
  "/tips": Lightbulb,
  "/donate": Heart,
  "/about": Info,
  "/contact": Phone,
};

const quickSectionLinks = [
  { id: "excellence-curriculum", label: "منهج المتميزين" },
  { id: "arabic-curriculum", label: "المنهج العربي" },
  { id: "books-curriculum", label: "الكتب الرسمية" },
  { id: "all-sections", label: "باقي الأقسام" },
] as const;

function Index() {
  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (hash) {
      smoothScrollToId(hash);
    }
  }, []);

  return (
    <>
      <WelcomeHero />

      <section
        id="curricula"
        className="relative mx-auto max-w-7xl scroll-mt-24 px-4 py-14 md:py-20"
      >
        <div aria-hidden="true" className="hero-blob -right-24 top-20 h-64 w-64 bg-primary/15" />

        <div className="relative text-center">
          <h2 className="font-display text-2xl font-black sm:text-3xl md:text-4xl">
            أقسام المناهج <span className="text-gradient">والكتب الدراسية</span>
          </h2>
          <p className="mx-auto mt-2.5 max-w-xl text-sm text-muted-foreground sm:text-base">
            تنقّل بسلاسة بين مسارات الدراسة والمواد والكتب الرسمية والأدلة الإرشادية
          </p>

          <nav
            aria-label="فهرس أقسام الصفحة الرئيسية"
            className="mx-auto mt-6 flex max-w-2xl flex-wrap items-center justify-center gap-2 border-y border-border/70 py-3"
          >
            {quickSectionLinks.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                data-tactile="true"
                onClick={createAnchorClickHandler(section.id)}
                className="btn-surface ripple-surface inline-flex min-h-10 items-center rounded-xl px-4 py-2 text-sm font-bold text-muted-foreground hover:bg-secondary/70 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {section.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="relative mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
          <article
            id="excellence-curriculum"
            className="card-lift card-glow rise scroll-mt-24 rounded-3xl border border-border/80 bg-card/90 p-6 shadow-sm backdrop-blur-sm"
          >
            <div className="flex items-center gap-3.5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand text-primary-foreground shadow-glow">
                <GraduationCap className="h-5 w-5" />
              </span>
              <div>
                <p className="font-mono text-xs font-semibold tabular-nums text-primary">01</p>
                <h3 className="font-display text-lg font-extrabold">منهج المتميزين</h3>
              </div>
            </div>
            <p className="mt-3.5 text-sm leading-relaxed text-muted-foreground">
              ملازم الأساتذة المعتمدين باللغة الإنجليزية والفرنسية بالإضافة إلى الكتب الرسمية لمدارس
              المتميزين.
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <Link
                to="/notes/$track"
                params={{ track: "teachers" }}
                data-tactile="true"
                onClick={smoothScrollToTop}
                className="btn-brand !rounded-xl !px-4 !py-2.5 text-sm"
              >
                ملازم المتميزين
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <Link
                to="/books/excellence"
                data-tactile="true"
                onClick={smoothScrollToTop}
                className="btn-surface ripple-surface inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-border bg-background/85 px-4 py-2 text-sm font-bold text-foreground hover:border-primary hover:text-primary"
              >
                كتب المتميزين
              </Link>
            </div>
          </article>

          <article
            id="arabic-curriculum"
            className="card-lift card-glow rise scroll-mt-24 rounded-3xl border border-border/80 bg-card/90 p-6 shadow-sm backdrop-blur-sm"
            style={{ animationDelay: "70ms" }}
          >
            <div className="flex items-center gap-3.5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand text-primary-foreground shadow-glow">
                <BookOpen className="h-5 w-5" />
              </span>
              <div>
                <p className="font-mono text-xs font-semibold tabular-nums text-primary">02</p>
                <h3 className="font-display text-lg font-extrabold">المنهج العربي</h3>
              </div>
            </div>
            <p className="mt-3.5 text-sm leading-relaxed text-muted-foreground">
              جميع مواد السادس العلمي للمنهج العربي مرتبة حسب المدرس والفصول والوزاريات والواجبات.
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <Link
                to="/notes/$track"
                params={{ track: "arabic" }}
                data-tactile="true"
                onClick={smoothScrollToTop}
                className="btn-brand !rounded-xl !px-4 !py-2.5 text-sm"
              >
                ملازم المنهج العربي
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <Link
                to="/books/arabic"
                data-tactile="true"
                onClick={smoothScrollToTop}
                className="btn-surface ripple-surface inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-border bg-background/85 px-4 py-2 text-sm font-bold text-foreground hover:border-primary hover:text-primary"
              >
                كتب المنهج العربي
              </Link>
            </div>
          </article>

          <article
            id="books-curriculum"
            className="card-lift card-glow rise scroll-mt-24 rounded-3xl border border-border/80 bg-card/90 p-6 shadow-sm backdrop-blur-sm"
            style={{ animationDelay: "140ms" }}
          >
            <div className="flex items-center gap-3.5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand text-primary-foreground shadow-glow">
                <BookMarked className="h-5 w-5" />
              </span>
              <div>
                <p className="font-mono text-xs font-semibold tabular-nums text-primary">03</p>
                <h3 className="font-display text-lg font-extrabold">الكتب الرسمية والملازم</h3>
              </div>
            </div>
            <p className="mt-3.5 text-sm leading-relaxed text-muted-foreground">
              استعراض وتحميل مباشر للكتب المنهجية الرسمية والمؤشّرات المعتمدة لكلا المسارين.
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <Link
                to="/books"
                data-tactile="true"
                onClick={smoothScrollToTop}
                className="btn-brand !rounded-xl !px-4 !py-2.5 text-sm"
              >
                مكتبة الكتب
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <Link
                to="/notes"
                data-tactile="true"
                onClick={smoothScrollToTop}
                className="btn-surface ripple-surface inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-border bg-background/85 px-4 py-2 text-sm font-bold text-foreground hover:border-primary hover:text-primary"
              >
                كافة الملازم
              </Link>
            </div>
          </article>
        </div>

        <div id="all-sections" className="relative mt-16 scroll-mt-24">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-display text-xl font-black sm:text-2xl">
              كل ما تحتاجه <span className="text-gradient">في مكان واحد</span>
            </h3>
            <a
              href="#welcome-hero-heading"
              data-tactile="true"
              onClick={(e) => {
                e.preventDefault();
                smoothScrollToTop();
              }}
              className="btn-surface ripple-surface inline-flex min-h-10 items-center gap-1.5 rounded-full border border-border/70 bg-card/85 px-4 py-1.5 text-sm font-semibold text-muted-foreground hover:border-primary hover:text-primary"
            >
              <span>العودة للأعلى</span>
              <ArrowUp className="h-4 w-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-4">
            {nav.slice(1).map((n, i) => {
              const Icon = icons[n.to];
              if (!Icon) return null;
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  data-tactile="true"
                  onClick={smoothScrollToTop}
                  style={{ animationDelay: `${i * 50}ms` }}
                  className="card-lift card-glow rise group flex items-center gap-4 overflow-hidden rounded-3xl border border-border/80 bg-card/90 p-5 shadow-sm backdrop-blur-sm md:p-6"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand text-primary-foreground shadow-glow transition duration-200 group-hover:rotate-[-8deg] group-hover:scale-105">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1 font-display font-bold leading-snug">
                    {n.label}
                  </span>
                  <ArrowLeft className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition duration-200 group-hover:-translate-x-1 group-hover:opacity-100" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
