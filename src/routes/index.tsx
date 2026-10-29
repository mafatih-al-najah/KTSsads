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
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-brand" />
        <div className="hero-blob right-10 top-10 h-80 w-80 bg-secondary opacity-30" />
        <div className="hero-blob bottom-0 left-0 h-96 w-96 bg-primary opacity-40" style={{ animationDelay: "-4s" }} />
        <div className="relative mx-auto max-w-7xl px-4 py-20 text-center text-primary-foreground md:py-28">
          <span className="inline-block rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-4 py-1 text-sm backdrop-blur">دفعة 25 🎓<br />دفعة 26 🎓<br />دفعة 27 ⏳</span>
          <h1 className="mt-6 text-4xl font-black leading-[1.2] md:text-6xl">
            طريقك إلى التفوّق<br /><span className="text-accent">يبدأ من هنا</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed opacity-90 md:text-lg">{site.tagline}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a href={site.telegramChannel} target="_blank" rel="noreferrer" className="btn-lime"><Send className="h-4 w-4" /> انضم لقناة التليجرام</a>
            <Link to="/notes" className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/40 px-6 py-3 font-bold transition hover:bg-primary-foreground/10">تصفح الملازم</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <h2 className="text-center text-3xl font-black md:text-4xl">كل ما تحتاجه <span className="text-gradient">في مكان واحد</span></h2>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-4">
          {nav.slice(1).map((n) => {
            const Icon = icons[n.to];
            if (!Icon) return null;
            return (
              <Link
                key={n.to}
                to={n.to}
                className="group flex items-center gap-4 rounded-3xl border bg-card p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-glow md:p-6"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand text-primary-foreground transition duration-300 group-hover:scale-105">
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
