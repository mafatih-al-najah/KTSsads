import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BarChart3, BookOpen, Heart, Info, Library, Lightbulb, Phone, Send, Trophy, type LucideIcon } from "lucide-react";
import { meta, nav } from "@/components/SiteShell";
import { site } from "@/data/site";

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

function Index() {
  return (
    <>
      <section className="px-3 pt-4 sm:px-4 sm:pt-6">
        <div className="grain relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-brand text-primary-foreground shadow-glow sm:rounded-[2.5rem]">
          <div className="hero-grid absolute inset-0" />
          <div className="hero-blob right-10 top-10 h-80 w-80 bg-primary opacity-50" />
          <div className="hero-blob -bottom-20 left-0 h-96 w-96 bg-accent opacity-25" style={{ animationDelay: "-4s" }} />
          <div className="spin-slow pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full border border-dashed border-primary-foreground/20" />
          <div className="spin-slow pointer-events-none absolute -bottom-32 -right-20 h-96 w-96 rounded-full border border-primary-foreground/10" style={{ animationDirection: "reverse" }} />
          <div className="relative px-5 py-16 text-center sm:py-20 md:py-28">
            <span className="rise inline-block rounded-2xl border border-primary-foreground/25 bg-primary-foreground/10 px-5 py-2 text-sm leading-7 backdrop-blur">دفعة 25 🎓<br />دفعة 26 🎓<br />دفعة 27 ⏳</span>
            <h1 className="rise mt-7 text-4xl font-black leading-[1.25] sm:text-5xl md:text-7xl" style={{ animationDelay: ".1s" }}>
              طريقك إلى التفوّق<br /><span className="relative inline-block text-accent">يبدأ من هنا<svg className="absolute -bottom-2 left-0 h-3 w-full text-accent/60" viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true"><path d="M2 9 Q 50 1 100 7 T 198 5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg></span>
            </h1>
            <p className="rise mx-auto mt-7 max-w-2xl text-base leading-relaxed opacity-90 md:text-lg" style={{ animationDelay: ".2s" }}>{site.tagline}</p>
            <div className="rise mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center" style={{ animationDelay: ".3s" }}>
              <a href={site.telegramChannel} target="_blank" rel="noreferrer" className="btn-lime shadow-lg"><Send className="h-4 w-4" /> انضم لقناة التليجرام</a>
              <Link to="/notes" className="inline-flex items-center justify-center gap-2 rounded-full border border-primary-foreground/40 bg-primary-foreground/5 px-6 py-3 font-bold backdrop-blur transition hover:bg-primary-foreground/15">تصفح الملازم</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <h2 className="text-center text-2xl font-black sm:text-3xl md:text-4xl">كل ما تحتاجه <span className="text-gradient">في مكان واحد</span></h2>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-4">
          {nav.slice(1).map((n, i) => {
            const Icon = icons[n.to];
            if (!Icon) return null;
            return (
              <Link
                key={n.to}
                to={n.to}
                style={{ animationDelay: `${i * 60}ms` }}
                className="card-glow rise group flex items-center gap-4 overflow-hidden rounded-3xl border bg-card/80 p-5 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-glow md:p-6"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand text-primary-foreground shadow-glow transition duration-300 group-hover:rotate-[-8deg] group-hover:scale-110">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1 font-bold leading-snug">{n.label}</span>
                <ArrowLeft className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition duration-300 group-hover:-translate-x-1 group-hover:opacity-100" />
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
