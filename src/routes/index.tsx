import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Users, UserCheck, Megaphone, Trophy, BarChart3, Lightbulb, Heart, Send, Info, Phone } from "lucide-react";
import { meta, nav } from "@/components/SiteShell";
import { site, governorates, subjects } from "@/data/site";

export const Route = createFileRoute("/")({
  head: () => meta("الرئيسية", "مفاتيح النجاح: ملازم، مدرسون في 18 محافظة، مصححون، إعلانات ونصائح لطلاب العراق 2026."),
  component: Index,
});

const icons = [null, BookOpen, Users, UserCheck, Megaphone, Trophy, BarChart3, Lightbulb, Heart, Info, Phone];

function Index() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-brand opacity-95" />
        <div className="hero-blob right-10 top-10 h-80 w-80 bg-accent" />
        <div className="hero-blob bottom-0 left-0 h-96 w-96 bg-primary" style={{ animationDelay: "-4s" }} />
        <div className="relative mx-auto max-w-7xl px-4 py-24 text-center text-primary-foreground md:py-32">
          <span className="inline-block rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-4 py-1 text-sm backdrop-blur">🎓 دفعة 2026</span>
          <h1 className="mt-6 text-5xl font-black leading-tight md:text-7xl">
            طريقك إلى التفوّق<br /><span className="text-accent">يبدأ من هنا</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg opacity-90">{site.tagline}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a href={site.telegramChannel} target="_blank" rel="noreferrer" className="btn-lime"><Send className="h-4 w-4" /> انضم لقناة التليكرام</a>
            <Link to="/notes" className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/40 px-6 py-3 font-bold backdrop-blur transition hover:bg-primary-foreground/10">تصفح الملازم</Link>
          </div>
          <div className="mx-auto mt-16 grid max-w-3xl grid-cols-3 gap-4">
            {[[governorates.length, "محافظة"], [subjects.length, "مواد دراسية"], ["24/7", "دعم ومتابعة"]].map(([n, l]) => (
              <div key={l} className="rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 p-4 backdrop-blur">
                <div className="font-display text-3xl font-black text-accent">{n}</div>
                <div className="text-sm opacity-90">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20">
        <h2 className="text-center text-3xl font-black md:text-4xl">كل ما تحتاجه <span className="text-gradient">في مكان واحد</span></h2>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {nav.slice(1).map((n, i) => {
            const Icon = icons[i + 1]!;
            return (
              <Link key={n.to} to={n.to} className="card-lift group rounded-2xl border bg-card p-6 text-center">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand text-primary-foreground transition group-hover:scale-110">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-bold">{n.label}</h3>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
