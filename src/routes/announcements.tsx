import { createFileRoute } from "@tanstack/react-router";
import { Megaphone } from "lucide-react";
import { meta, PageHero } from "@/components/SiteShell";
import { announcements } from "@/data/site";

export const Route = createFileRoute("/announcements")({
  head: () => meta("الإعلانات", "آخر إعلانات وأخبار قناة مفاتيح النجاح."),
  component: () => (
    <>
      <PageHero title="الإعلانات" subtitle="آخر الأخبار والتحديثات" />
      <div className="mx-auto max-w-3xl space-y-5 px-4 py-14">
        {announcements.map((a) => (
          <article key={a.title} className="card-lift flex gap-4 rounded-2xl border bg-card p-6">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground"><Megaphone className="h-5 w-5" /></span>
            <div>
              <time className="text-xs font-semibold text-primary">{a.date}</time>
              <h3 className="mt-1 text-lg font-bold">{a.title}</h3>
              <p className="mt-2 text-muted-foreground">{a.body}</p>
            </div>
          </article>
        ))}
      </div>
    </>
  ),
});
