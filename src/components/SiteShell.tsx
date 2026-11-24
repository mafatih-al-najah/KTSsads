import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Menu, Moon, Sun, X, Send, Palette, Check, Mail } from "lucide-react";
import { site, tg } from "@/data/site";
import { PageNavigation } from "@/components/PageNavigation";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { GlobalSearch } from "@/components/GlobalSearch";
import { MotionEffects } from "@/components/MotionEffects";
import { Button } from "@/components/ui/button";
import { sanitizeSafeUrl } from "@/lib/security";
import { smoothScrollToTop } from "@/lib/smooth-scroll";

export const nav = [
  { to: "/", label: "الرئيسية" },
  { to: "/notes", label: "الملازم" },
  { to: "/books", label: "الكتب" },
  { to: "/excellence", label: "امتيازات المتميزين 2026" },
  { to: "/minimums", label: "الحدود الدنيا 2026" },
  { to: "/tips", label: "نصائح الطلاب" },
  { to: "/donate", label: "تبرع وادعم" },
  { to: "/about", label: "من نحن" },
  { to: "/contact", label: "تواصل معنا" },
] as const;

function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const d = localStorage.getItem("theme") === "dark";
    setDark(d);
    document.documentElement.classList.toggle("dark", d);
  }, []);
  const toggle = () => {
    const d = !dark;
    setDark(d);
    document.documentElement.classList.toggle("dark", d);
    try {
      localStorage.setItem("theme", d ? "dark" : "light");
    } catch {
      /* Storage may be unavailable in restricted contexts. */
    }
  };
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="تغيير الوضع"
      title="تغيير الوضع"
      className="btn-surface grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border/80 bg-card/90 text-foreground shadow-sm hover:border-primary"
    >
      {dark ? (
        <Sun className="h-[18px] w-[18px] text-accent transition-transform duration-300 rotate-0" />
      ) : (
        <Moon className="h-[18px] w-[18px] text-primary transition-transform duration-300 rotate-0" />
      )}
    </button>
  );
}

const palettes = [
  { id: "default", name: "الأصلي", c: ["#033030", "#AC0EFF", "#EFFE00"] },
  { id: "ocean", name: "محيطي", c: ["#06263f", "#1f6fd0", "#7fdcff"] },
  { id: "sky", name: "سماوي", c: ["#0a3557", "#2f88d0", "#b8ecff"] },
  { id: "azure", name: "أزرق صافي", c: ["#083048", "#1d86b8", "#c4f0ff"] },
  { id: "ice", name: "جليدي", c: ["#16324a", "#3f7fc8", "#eaf6ff"] },
  { id: "steel", name: "فولاذي", c: ["#16303f", "#3f719c", "#d5e8f5"] },
  { id: "denim", name: "جينزي", c: ["#12233d", "#3c62c4", "#dbe7ff"] },
  { id: "indigo", name: "نيلي", c: ["#151a3d", "#4650cf", "#c9d0ff"] },
  { id: "midnight", name: "ليلي", c: ["#0a1230", "#2f45a8", "#93b4ff"] },
  { id: "periwinkle", name: "أزرق هادئ", c: ["#22264a", "#5b6cd8", "#e2e6ff"] },
  { id: "slate", name: "أزرق رمادي", c: ["#1e2733", "#4f6e8d", "#dfe8f0"] },
  { id: "cyan", name: "سماوي فيروزي", c: ["#062e3a", "#0f95b8", "#c8f6ff"] },
  { id: "teal", name: "زمردي", c: ["#033030", "#0f948c", "#d6fff5"] },
  { id: "mint", name: "نعناعي", c: ["#0c3530", "#2f9a82", "#d8ffe9"] },
  { id: "sage", name: "مريمية", c: ["#22352a", "#4f8a68", "#e3f2d8"] },
  { id: "forest", name: "غابي", c: ["#0f2820", "#2f8f5b", "#dff5c8"] },
  { id: "moss", name: "طحلبي", c: ["#24311c", "#5f7f36", "#f0f7d0"] },
  { id: "olive", name: "زيتوني", c: ["#2a2f18", "#6f7f2e", "#f5f2c0"] },
  { id: "mist", name: "ضبابي", c: ["#23323a", "#5f8798", "#eaf5f7"] },
  { id: "graphite", name: "فحمي", c: ["#1c1f22", "#55606a", "#eceff1"] },
  { id: "lavender", name: "لافندر", c: ["#2a2440", "#7a68d0", "#e6dcff"] },
  { id: "lilac", name: "ليلكي", c: ["#2b2338", "#8a58c0", "#f3e5ff"] },
  { id: "plum", name: "برقوقي", c: ["#2a1830", "#8a3fa8", "#f0d0f0"] },
  { id: "rose", name: "وردي", c: ["#4a0f1e", "#d9306a", "#f5a070"] },
  { id: "blush", name: "وردي شاحب", c: ["#3a2028", "#b85f80", "#ffe6ee"] },
  { id: "sunset", name: "غروب", c: ["#5a1a10", "#e8552a", "#f5b942"] },
  { id: "amber", name: "كهرماني", c: ["#4a2a10", "#d9821a", "#f7e04a"] },
  { id: "coral", name: "مرجاني", c: ["#5a1f1a", "#e85a44", "#f2d08a"] },
  { id: "ember", name: "جمر", c: ["#2e140c", "#c42a1e", "#f0a030"] },
  { id: "peach", name: "خوخي", c: ["#5a3020", "#e07a4a", "#f5e0a0"] },
  { id: "sand", name: "رملي", c: ["#3a2f1c", "#a87c3e", "#fff3d0"] },
  { id: "honey", name: "عسلي", c: ["#3a2a10", "#c08810", "#fff0b0"] },
  { id: "clay", name: "طيني", c: ["#3a241c", "#9a5a3a", "#f5dcc0"] },
  { id: "coffee", name: "قهوائي", c: ["#2a1e16", "#6a4529", "#f0dcc0"] },
];

function PalettePicker() {
  const [open, setOpen] = useState(false);
  const [cur, setCur] = useState("default");
  useEffect(() => {
    const p = localStorage.getItem("palette") || "default";
    setCur(p);
    document.documentElement.dataset["palette"] = p;
  }, []);
  const pick = (id: string) => {
    setCur(id);
    document.documentElement.dataset["palette"] = id;
    try {
      localStorage.setItem("palette", id);
    } catch {
      /* Storage may be unavailable in restricted contexts. */
    }
  };
  return (
    <div className="relative">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setOpen(!open)}
        aria-label="تغيير الثيم"
        aria-expanded={open}
        title="تغيير الثيم"
        className="rounded-full border-border/80 bg-card/90"
      >
        <Palette className="h-4 w-4" />
      </Button>
      {open && (
        <div className="announce-in absolute left-0 top-full z-50 mt-3 w-[min(20.5rem,calc(100vw-2rem))] rounded-2xl border border-border/80 bg-card/95 p-4 text-card-foreground shadow-glow backdrop-blur-xl">
          <div className="mb-3 flex items-center justify-between">
            <p className="font-display text-sm font-extrabold">اختر ثيم الألوان</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="إغلاق قائمة الألوان"
              className="grid h-7 w-7 place-items-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="grid max-h-72 grid-cols-6 gap-2 overflow-y-auto pe-1">
            {palettes.map((p) => (
              <button
                key={p.id}
                type="button"
                title={p.name}
                aria-label={`ثيم ${p.name}`}
                onClick={() => pick(p.id)}
                className={`relative grid h-9 w-9 place-items-center overflow-hidden rounded-full transition-transform duration-150 hover:scale-110 active:scale-95 ${
                  cur === p.id
                    ? "ring-2 ring-primary ring-offset-2 ring-offset-card"
                    : "ring-1 ring-black/10"
                }`}
                style={{ background: `linear-gradient(135deg, ${p.c[0]}, ${p.c[1]}, ${p.c[2]})` }}
              >
                {cur === p.id && <Check className="h-4 w-4 text-primary-foreground drop-shadow" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const safeTelegramContact = sanitizeSafeUrl(tg(site.contactUsername), { allowRelative: false });
  const safeMailto = sanitizeSafeUrl(`mailto:${site.email}`, {
    allowMailto: true,
    allowRelative: false,
  });

  return (
    <div dir="rtl" className="relative flex min-h-screen flex-col">
      <header className="glass sticky top-0 z-50 border-b border-border/60 shadow-[0_8px_30px_-22px_var(--color-primary)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-3 py-2.5 sm:px-5 sm:py-3">
          <Link
            to="/"
            onClick={() => {
              setOpen(false);
              smoothScrollToTop();
            }}
            className="group flex min-w-0 shrink-0 items-center gap-2.5 sm:gap-3"
          >
            <span className="logo-ring relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full p-[2px] transition-transform duration-300 group-hover:scale-105 sm:h-11 sm:w-11">
              <span className="orbit-spin absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,var(--color-primary,#033030),var(--color-accent,#AC0EFF),var(--color-secondary,#1f6fd0),var(--color-primary,#033030))] opacity-90" />
              <span className="relative grid h-full w-full place-items-center overflow-hidden rounded-full bg-card">
                <img
                  src={site.logoUrl || "/favicon.png"}
                  alt="شعار مفاتيح النجاح"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-[6deg]"
                  onError={(e) => {
                    const el = e.currentTarget;
                    if (el.dataset["fallback"] === "done") return;
                    el.dataset["fallback"] = "done";
                    el.src = "/favicon.png";
                  }}
                />
              </span>
            </span>
            <span className="truncate font-display text-lg font-extrabold tracking-tight sm:text-xl">
              {site.name}
            </span>
          </Link>

          <nav aria-label="التنقل الرئيسي" className="hidden items-center gap-1 xl:flex">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={smoothScrollToTop}
                activeOptions={{ exact: n.to === "/" }}
                className="nav-link-line whitespace-nowrap shrink-0 rounded-lg px-2.5 py-2 text-sm font-semibold text-muted-foreground transition-colors duration-150 hover:text-foreground"
                activeProps={{ className: "!text-primary !font-bold" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <GlobalSearch />
            <PalettePicker />
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-label="القائمة"
              aria-expanded={open}
              className="btn-brand !p-0 grid h-10 w-10 shrink-0 place-items-center rounded-full shadow-glow xl:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <AnnouncementBar />

        {open && (
          <div className="announce-in border-t border-border/60 bg-background/95 backdrop-blur-xl xl:hidden">
            <div className="mx-auto grid max-w-7xl grid-cols-2 gap-2.5 p-3 sm:p-4 md:grid-cols-3">
              {nav.map((n, index) => (
                <Link
                  key={n.to}
                  to={n.to}
                  data-tactile="true"
                  onClick={() => {
                    setOpen(false);
                    smoothScrollToTop();
                  }}
                  activeOptions={{ exact: n.to === "/" }}
                  activeProps={{
                    className: "!border-primary !bg-primary !text-primary-foreground shadow-glow",
                  }}
                  style={{ animationDelay: `${index * 25}ms` }}
                  className="rise ripple-surface tactile-card flex min-h-12 items-center rounded-2xl border border-border/70 bg-card/90 px-4 py-3 text-sm font-bold shadow-sm transition hover:border-primary"
                >
                  <span className="truncate">{n.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        <MotionEffects />
      </header>

      <PageNavigation />

      <main className="flex-1">{children}</main>

      <footer className="grain relative mt-16 overflow-hidden bg-brand text-teal-foreground">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-l from-transparent via-accent to-transparent opacity-90"
        />
        <div aria-hidden="true" className="hero-blob -left-16 -bottom-24 h-56 w-56 bg-accent/40" />
        <div className="relative mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-6 text-sm sm:px-6">
          <div className="flex items-center gap-3">
            <span className="font-display text-base font-extrabold">{site.name}</span>
            <span aria-hidden="true" className="opacity-40">
              ·
            </span>
            <span className="text-xs opacity-85 sm:text-sm">{site.tagline}</span>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link
              to="/contact"
              onClick={smoothScrollToTop}
              className="font-bold text-accent underline-offset-4 hover:underline"
            >
              تواصل معنا
            </Link>
            {safeTelegramContact && (
              <a
                href={safeTelegramContact}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 opacity-90 transition hover:opacity-100 hover:underline"
              >
                <Send className="h-4 w-4" />
                <span dir="ltr">@{site.contactUsername}</span>
              </a>
            )}
            {safeMailto && (
              <a
                href={safeMailto}
                className="inline-flex min-w-0 items-center gap-2 opacity-90 transition hover:opacity-100 hover:underline"
              >
                <Mail className="h-4 w-4 shrink-0" />
                <span dir="ltr" className="break-all">
                  {site.email}
                </span>
              </a>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}

export function PageHero({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="relative px-3 pt-4 sm:px-5 sm:pt-6">
      <div className="grain relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-brand px-5 py-11 text-center text-primary-foreground shadow-glow sm:px-8 md:py-16">
        <div aria-hidden="true" className="hero-grid absolute inset-0" />
        <div aria-hidden="true" className="hero-blob -right-16 -top-20 h-64 w-64 bg-primary" />
        <div
          aria-hidden="true"
          className="hero-blob float-reverse -bottom-24 left-6 h-56 w-56 bg-accent opacity-40"
        />
        <div
          aria-hidden="true"
          className="orbit-spin pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full border border-white/10"
        />
        <div
          aria-hidden="true"
          className="orbit-spin pointer-events-none absolute -bottom-28 -right-24 h-72 w-72 rounded-full border border-dashed border-accent/25"
          style={{ animationDirection: "reverse" }}
        />
        <h1 className="rise relative mx-auto max-w-4xl font-display text-[clamp(1.85rem,3.6vw,3.1rem)] font-black leading-[1.2] text-balance">
          {title}
        </h1>
        <span
          aria-hidden="true"
          className="relative mx-auto mt-4 block h-1 w-16 rounded-full bg-accent/90"
        />
        {subtitle && (
          <p
            className="rise relative mx-auto mt-4 max-w-2xl text-sm leading-relaxed opacity-90 sm:text-base md:text-lg"
            style={{ animationDelay: "90ms" }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}

export const meta = (title: string, description: string) => ({
  meta: [
    { title: `${title} | مفاتيح النجاح` },
    { name: "description", content: description },
    { property: "og:title", content: `${title} | مفاتيح النجاح` },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ],
});
