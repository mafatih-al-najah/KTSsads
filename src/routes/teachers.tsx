import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Send } from "lucide-react";
import { meta, PageHero } from "@/components/SiteShell";
import { governorates, subjects, teachers, tg } from "@/data/site";

export const Route = createFileRoute("/teachers")({
  head: () => meta("المدرسون", "مدرسو جميع المواد في 18 محافظة عراقية للمنهج العراقي."),
  component: Teachers,
});

function Teachers() {
  const [gov, setGov] = useState<string>(governorates[0]);
  return (
    <>
      <PageHero title="المدرسون" subtitle="اختر محافظتك لعرض مدرسي المواد الثمانية" />
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="flex flex-wrap justify-center gap-2">
          {governorates.map((g) => (
            <button key={g} onClick={() => setGov(g)} className={`inline-flex items-center gap-1 rounded-full border px-4 py-2 text-sm font-semibold transition ${gov === g ? "bg-brand text-primary-foreground shadow-glow" : "bg-card hover:border-primary"}`}>
              <MapPin className="h-3.5 w-3.5" /> {g}
            </button>
          ))}
        </div>
        <h2 className="mt-12 text-center text-2xl font-black">مدرسو محافظة <span className="text-gradient">{gov}</span></h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {subjects.map((s) => {
            const t = teachers[gov]?.[s];
            return (
              <div key={s} className="card-lift rounded-2xl border bg-card p-6">
                <span className="rounded-full bg-accent px-3 py-0.5 text-xs font-bold text-accent-foreground">{s}</span>
                <h3 className="mt-4 text-lg font-bold">{t ? t.name : "سيُضاف قريباً"}</h3>
                {t ? (
                  <a href={tg(t.username)} target="_blank" rel="noreferrer" className="btn-brand mt-4 w-full text-sm"><Send className="h-4 w-4" /> تواصل</a>
                ) : (
                  <p className="mt-4 text-sm text-muted-foreground">لا يوجد مدرس مضاف لهذه المادة بعد</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
