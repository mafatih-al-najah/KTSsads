import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Menu, Moon, Sun, X, Send, Palette, Check, Mail } from "lucide-react";
import { site, tg } from "@/data/site";
import channelLogo from "@/assets/channel-logo.png.asset.json";
import { PageNavigation } from "@/components/PageNavigation";
import { Button } from "@/components/ui/button";

export const nav = [
  { to: "/", label: "الرئيسية" },
  { to: "/notes", label: "الملازم" },
  { to: "/correctors", label: "المصححون" },
  { to: "/announcements", label: "الإعلانات" },
  { to: "/excellence", label: "امتياز المتميزين 2026" },
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
    localStorage.setItem("theme", d ? "dark" : "light");
  };
  return (
    <button onClick={toggle} aria-label="تغيير الوضع" className="grid h-10 w-10 place-items-center rounded-full border bg-card transition hover:border-primary">
      {dark ? <Sun className="h-5 w-5 text-accent" /> : <Moon className="h-5 w-5 text-primary" />}
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
    localStorage.setItem("palette", id);
  };
  return (
    <div className="relative">
      <Button variant="outline" size="icon" onClick={() => setOpen(!open)} aria-label="تغيير الثيم" title="تغيير الثيم"><Palette className="h-4 w-4" /></Button>
      {open && (
        <div className="absolute left-0 top-full z-50 mt-3 w-[min(20rem,calc(100vw-2rem))] rounded-2xl border bg-card p-4 text-card-foreground shadow-glow">
          <p className="mb-3 font-bold">اختر ثيم الألوان</p>
          <div className="grid max-h-72 grid-cols-6 gap-2 overflow-y-auto pe-1">
            {palettes.map((p) => (
              <button
                key={p.id}
                title={p.name}
                aria-label={`ثيم ${p.name}`}
                onClick={() => pick(p.id)}
                className={`grid h-9 w-9 place-items-center rounded-full transition hover:scale-110 ${cur === p.id ? "ring-2 ring-primary ring-offset-2 ring-offset-card" : ""}`}
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
  return (
    <div dir="rtl" className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <img
              src={site.logoUrl || channelLogo.url}
              alt="شعار مفاتيح النجاح"
              referrerPolicy="no-referrer"
              className="h-12 w-12 shrink-0 object-contain dark:invert"
              onError={(e) => {
                const el = e.currentTarget;
                if (el.dataset.fallback === "done") return;
                el.dataset.fallback = "done";
                el.src = channelLogo.url;
                el.classList.remove("dark:invert");
              }}
            />
            <span className="font-display text-xl font-extrabold">{site.name}</span>
          </Link>
          <nav className="hidden items-center gap-1 xl:flex">
            {nav.slice(0, 8).map((n) => (
              <Link key={n.to} to={n.to} activeOptions={{ exact: true }} className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition hover:text-foreground" activeProps={{ className: "bg-secondary text-foreground" }}>
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <PalettePicker />
            <ThemeToggle />
            <button onClick={() => setOpen(!open)} aria-label="القائمة" className="grid h-10 w-10 place-items-center rounded-full border bg-card">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {open && (
          <div className="border-t bg-background">
            <div className="mx-auto grid max-w-7xl grid-cols-2 gap-2 p-4 md:grid-cols-4">
              {nav.map((n) => (
                <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="rounded-xl border bg-card px-4 py-3 text-sm font-semibold transition hover:border-primary">
                  {n.label}
                </Link>
              ))}
            </div>
          </div>
        )}
        <PageNavigation />
      </header>
      <main className="flex-1">{children}</main>
      <footer className="mt-10 border-t bg-teal text-teal-foreground">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-3 px-4 py-4 text-sm">
          <Link to="/contact" className="font-bold text-accent hover:underline">تواصل معنا</Link>
          <a href={tg(site.contactUsername)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:underline"><Send className="h-4 w-4" /><span dir="ltr">@{site.contactUsername}</span></a>
          <a href={`mailto:${site.email}`} className="inline-flex min-w-0 items-center gap-2 hover:underline"><Mail className="h-4 w-4 shrink-0" /><span dir="ltr" className="break-all">{site.email}</span></a>
        </div>
      </footer>
    </div>
  );
}

export function PageHero({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="relative overflow-hidden border-b">
      <div className="hero-blob -right-20 -top-20 h-72 w-72 bg-primary" />
      <div className="hero-blob -bottom-24 left-10 h-64 w-64 bg-accent" style={{ animationDelay: "-3s" }} />
      <div className="relative mx-auto max-w-7xl px-4 py-16 text-center md:py-20">
        <h1 className="text-4xl font-black md:text-5xl"><span className="text-gradient">{title}</span></h1>
        {subtitle && <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">{subtitle}</p>}
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
