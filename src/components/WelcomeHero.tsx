import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowLeft, BookOpen, Library, Send } from "lucide-react";
import heroStudyImg from "@/assets/images/hero_study_sanctuary_1795247764417.jpg";
import { site } from "@/data/site";
import { sanitizeSafeUrl } from "@/lib/security";
import { createAnchorClickHandler, smoothScrollToTop } from "@/lib/smooth-scroll";

const curriculumHighlights = [
  {
    index: "01.",
    title: "منهج المتميزين",
    detail: "ملازم وكتب حصرية",
    targetId: "excellence-curriculum",
  },
  {
    index: "02.",
    title: "المنهج العربي",
    detail: "لكافة المواد والفصول",
    targetId: "arabic-curriculum",
  },
  {
    index: "03.",
    title: "الكتب الرسمية",
    detail: "تصفّح وتحميل مباشر",
    targetId: "books-curriculum",
  },
] as const;

export function WelcomeHero() {
  const [imgFailed, setImgFailed] = useState(false);
  const safeTelegramChannel = sanitizeSafeUrl(site.telegramChannel, { allowRelative: false });

  return (
    <section className="relative px-3 pt-4 sm:px-5 sm:pt-6" aria-labelledby="welcome-hero-heading">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-border/80 bg-card/90 shadow-glow backdrop-blur-md sm:rounded-[2.5rem]">
        <div aria-hidden="true" className="hero-blob -top-24 right-8 h-72 w-72 bg-primary/25" />
        <div
          aria-hidden="true"
          className="hero-blob float-reverse -bottom-24 left-12 h-64 w-64 bg-accent/30"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(48rem_30rem_at_92%_8%,color-mix(in_oklab,var(--violet)_13%,transparent),transparent_65%),radial-gradient(38rem_26rem_at_12%_95%,color-mix(in_oklab,var(--lime)_13%,transparent),transparent_65%)]"
        />

        <div className="relative grid items-stretch lg:grid-cols-12">
          <div className="flex flex-col justify-between p-6 sm:p-10 lg:col-span-7 lg:p-14">
            <div>
              <p className="rise text-xs font-semibold text-muted-foreground sm:text-sm">
                بوابة الطالب التعليمية
                <span aria-hidden="true" className="mx-2 text-border">
                  ·
                </span>
                السادس الإعدادي
                <span aria-hidden="true" className="mx-2 text-border">
                  ·
                </span>
                المتميزون والمنهج العربي
              </p>

              <h1
                id="welcome-hero-heading"
                className="rise mt-5 font-display text-[clamp(2.15rem,4.2vw,3.65rem)] font-black leading-[1.2] text-balance text-foreground"
                style={{ animationDelay: "60ms" }}
              >
                مرحباً بك في <span className="text-gradient">{site.name}</span>
              </h1>

              <p
                className="rise mt-5 max-w-xl text-base leading-[1.75] text-muted-foreground sm:text-lg"
                style={{ animationDelay: "120ms" }}
              >
                منصّتك الدراسية الشاملة لطلبة السادس الإعدادي ومدارس المتميزين — تجمع الكتب الرسمية،
                ملازم المدرسين، الفصول والواجبات، وأدلة القبول في مكان واحد منظّم وسهل الوصول.
              </p>

              <div
                className="rise mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4"
                style={{ animationDelay: "180ms" }}
              >
                <a
                  href="#curricula"
                  data-tactile="true"
                  onClick={createAnchorClickHandler("curricula")}
                  className="btn-brand whitespace-nowrap shrink-0 px-7 py-3.5 text-base shadow-glow"
                >
                  الانتقال إلى أقسام المناهج
                  <ArrowDown className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5" />
                </a>

                <Link
                  to="/books"
                  data-tactile="true"
                  onClick={smoothScrollToTop}
                  className="btn-surface ripple-surface inline-flex min-h-11 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-border bg-background/85 px-6 py-3 text-sm font-bold text-foreground shadow-sm hover:border-primary hover:text-primary"
                >
                  <Library className="h-4 w-4 text-primary" />
                  مكتبة الكتب
                </Link>

                {safeTelegramChannel && (
                  <a
                    href={safeTelegramChannel}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-tactile="true"
                    className="btn-surface ripple-surface inline-flex min-h-10 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-semibold text-muted-foreground underline-offset-4 hover:bg-secondary/60 hover:text-primary hover:underline"
                  >
                    <Send className="h-4 w-4" />
                    قناة التليجرام
                  </a>
                )}
              </div>
            </div>

            <nav
              aria-label="روابط أقسام المناهج السريعة"
              className="rise mt-10 grid grid-cols-1 gap-3 border-t border-border/70 pt-6 sm:grid-cols-3 sm:gap-4"
              style={{ animationDelay: "220ms" }}
            >
              {curriculumHighlights.map((item) => (
                <a
                  key={item.title}
                  href={`#${item.targetId}`}
                  data-tactile="true"
                  onClick={createAnchorClickHandler(item.targetId)}
                  className="card-lift ripple-surface group block rounded-2xl border border-transparent bg-background/50 p-3.5 hover:border-border/80 hover:bg-background/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-xs font-semibold tabular-nums text-primary">
                        {item.index}
                      </span>
                      <span className="font-display text-sm font-bold text-foreground transition-colors group-hover:text-primary sm:text-base">
                        {item.title}
                      </span>
                    </div>
                    <ArrowLeft className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:-translate-x-1 group-hover:text-primary" />
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{item.detail}</p>
                </a>
              ))}
            </nav>
          </div>

          <div className="relative min-h-[19rem] overflow-hidden border-t border-border/70 bg-brand sm:min-h-[24rem] lg:col-span-5 lg:min-h-full lg:border-t-0 lg:border-r lg:border-border/70">
            <div
              aria-hidden="true"
              className="orbit-spin pointer-events-none absolute -right-24 -top-24 z-10 h-60 w-60 rounded-full border border-white/15"
            />
            {!imgFailed ? (
              <img
                src={heroStudyImg}
                alt="بيئة دراسية منظمة لموقع مفاتيح النجاح"
                referrerPolicy="no-referrer"
                onError={() => setImgFailed(true)}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.04]"
              />
            ) : (
              <div className="hero-grid flex h-full w-full flex-col items-center justify-center p-8 text-center text-primary-foreground">
                <BookOpen className="h-14 w-14 opacity-80" />
                <p className="mt-3 font-display text-xl font-bold">{site.name}</p>
              </div>
            )}

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"
            />

            <div className="float-slow absolute inset-x-4 bottom-4 flex items-center gap-3.5 rounded-2xl border border-white/20 bg-black/45 p-4 text-white backdrop-blur-md sm:inset-x-5 sm:bottom-5">
              <span className="relative grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-full border border-white/35 bg-white/15 p-0.5">
                <img
                  src={site.logoUrl || "/favicon.png"}
                  alt={`شعار ${site.name}`}
                  referrerPolicy="no-referrer"
                  className="h-full w-full rounded-full object-cover"
                  onError={(e) => {
                    const el = e.currentTarget;
                    if (el.dataset["fallback"] === "done") return;
                    el.dataset["fallback"] = "done";
                    el.src = "/favicon.png";
                  }}
                />
              </span>
              <div className="min-w-0">
                <p className="truncate font-display text-base font-extrabold">{site.name}</p>
                <p className="line-clamp-2 text-xs leading-relaxed text-white/85 sm:text-sm">
                  {site.tagline}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
