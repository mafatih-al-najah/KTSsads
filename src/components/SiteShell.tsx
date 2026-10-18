import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Menu, Moon, Sun, X, KeyRound, Send, Palette, Check } from "lucide-react";
import { site } from "@/data/site";

export const nav = [
  { to: "/", label: "الرئيسية" },
  { to: "/notes", label: "الملازم" },
  { to: "/teachers", label: "المدرسون" },
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
  { id: "sunset", name: "غروب", c: ["#5a1a10", "#e8552a", "#f5b942"] },
  { id: "amber", name: "كهرماني", c: ["#4a2a10", "#e58a1f", "#f7e04a"] },
  { id: "rose", name: "وردي", c: ["#4a0f1e", "#d9306a", "#f5a070"] },
  { id: "coral", name: "مرجاني", c: ["#5a1f1a", "#f0604a", "#f2d08a"] },
  { id: "ember", name: "جمر", c: ["#2e140c", "#c42a1e", "#f0a030"] },
  { id: "peach", name: "خوخي", c: ["#5a3020", "#f08a5a", "#f5e0a0"] },
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
      <button onClick={() => setOpen(!open)} className="btn-lime"><Palette className="h-4 w-4" /> تغيير الثيم</button>
      {open && (
        <div className="absolute bottom-full left-0 z-50 mb-3 w-72 rounded-2xl border bg-card p-4 text-card-foreground shadow-glow">
          <p className="mb-3 font-bold">اختر ثيم الألوان</p>
          <div className="grid grid-cols-3 gap-3">
            {palettes.map((p) => (
              <button key={p.id} onClick={() => pick(p.id)} className={`flex flex-col items-center gap-1 rounded-xl p-2 transition hover:bg-secondary ${cur === p.id ? "ring-2 ring-primary" : ""}`}>
                <span className="relative grid h-12 w-12 place-items-center rounded-full" style={{ background: `linear-gradient(135deg, ${p.c[0]}, ${p.c[1]}, ${p.c[2]})` }}>
                  {cur === p.id && <Check className="h-5 w-5 text-primary-foreground" />}
                </span>
                <span className="text-xs">{p.name}</span>
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
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand shadow-glow">
              <KeyRound className="h-5 w-5 text-primary-foreground" />
            </span>
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
      </header>
      <main className="flex-1">{children}</main>
      <footer className="relative mt-20 overflow-hidden bg-teal text-teal-foreground">
        <div className="absolute inset-x-0 top-0 h-1 bg-brand" />
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand"><KeyRound className="h-5 w-5" /></span>
              <span className="font-display text-2xl font-extrabold">{site.name}</span>
            </div>
            <p className="mt-4 text-sm opacity-80">{site.tagline}</p>
            <a href={site.telegramChannel} target="_blank" rel="noreferrer" className="btn-lime mt-6"><Send className="h-4 w-4" /> انضم للقناة</a>
          </div>
          <div>
            <h3 className="mb-4 font-bold text-accent">أقسام الموقع</h3>
            <div className="grid grid-cols-2 gap-2 text-sm opacity-85">
              {nav.map((n) => <Link key={n.to} to={n.to} className="hover:text-accent">{n.label}</Link>)}
            </div>
          </div>
          <div>
            <h3 className="mb-4 font-bold text-accent">تواصل</h3>
            <p className="text-sm opacity-85">تليكرام: @{site.contactUsername}</p>
            <p className="mt-2 text-sm opacity-85">{site.email}</p>
          </div>
        </div>
        <div className="border-t border-teal-foreground/15">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-sm md:flex-row">
            <p>
              <span className="text-lg font-bold text-accent">©</span> {new Date().getFullYear()} جميع الحقوق محفوظة لقناة{" "}
              <span className="font-bold text-accent">{site.name}</span>
            </p>
            <PalettePicker />
            <p className="opacity-70">صُنع بحب لطلاب العراق 🇮🇶</p>
          </div>
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
