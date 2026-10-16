import { createFileRoute } from "@tanstack/react-router";
import { Trophy, Send } from "lucide-react";
import { meta, PageHero } from "@/components/SiteShell";
import { excellence, site, tg } from "@/data/site";

export const Route = createFileRoute("/excellence")({
  head: () => meta("امتياز المتميزين 2026", "برنامج امتياز المتميزين لدفعة 2026: الشروط والمميزات وطريقة التسجيل."),
  component: () => (
    <>
      <PageHero title="امتياز المتميزين 2026" subtitle="برنامج خاص للطلاب المتفوقين نحو المعدلات العليا" />
      <div className="mx-auto grid max-w-6xl gap-5 px-4 py-14 md:grid-cols-3">
        {excellence.map((e, i) => (
          <div key={e.title} className="card-lift relative overflow-hidden rounded-2xl border bg-card p-7">
            <span className="absolute -left-3 -top-4 font-display text-8xl font-black text-primary/10">{i + 1}</span>
            <Trophy className="h-8 w-8 text-primary" />
            <h3 className="mt-4 text-xl font-bold">{e.title}</h3>
            <p className="mt-2 text-muted-foreground">{e.body}</p>
          </div>
        ))}
      </div>
      <div className="text-center">
        <a href={tg(site.contactUsername)} target="_blank" rel="noreferrer" className="btn-brand"><Send className="h-4 w-4" /> سجّل الآن</a>
      </div>
    </>
  ),
});
