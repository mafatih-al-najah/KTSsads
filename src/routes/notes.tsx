import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, ExternalLink } from "lucide-react";
import { meta, PageHero } from "@/components/SiteShell";
import { notes } from "@/data/site";

export const Route = createFileRoute("/notes")({
  head: () => meta("الملازم", "ملازم جميع المواد للمنهج العراقي متوفرة عبر قنوات التليكرام."),
  component: () => (
    <>
      <PageHero title="الملازم" subtitle="اضغط على أي ملزمة للانتقال إلى قناتها في التليكرام" />
      <div className="mx-auto grid max-w-7xl gap-5 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {notes.map((n) => (
          <a key={n.title} href={n.link} target="_blank" rel="noreferrer" className="card-lift flex flex-col rounded-2xl border bg-card p-6">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand text-primary-foreground"><BookOpen className="h-5 w-5" /></span>
            <span className="mt-4 w-fit rounded-full bg-accent px-3 py-0.5 text-xs font-bold text-accent-foreground">{n.subject}</span>
            <h3 className="mt-3 flex-1 text-lg font-bold">{n.title}</h3>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-primary">فتح القناة <ExternalLink className="h-4 w-4" /></span>
          </a>
        ))}
      </div>
    </>
  ),
});
