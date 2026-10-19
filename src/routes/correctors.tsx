import { createFileRoute } from "@tanstack/react-router";
import { UserCheck, Send } from "lucide-react";
import { meta, PageHero } from "@/components/SiteShell";
import { correctors, tg } from "@/data/site";

export const Route = createFileRoute("/correctors")({
  head: () => meta("المصححون", "تواصل مباشرة مع مصحح خاص لتصحيح إجاباتك ومتابعة مستواك."),
  component: () => (
    <>
      <PageHero title="التواصل مع مصحح خاص" subtitle="اختر المصحح المناسب لمادتك وراسله مباشرة على التليكرام" />
      <div className="mx-auto grid max-w-6xl gap-5 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {correctors.map((c) => (
          <div key={c.username} className="card-lift rounded-2xl border bg-card p-6 text-center">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand text-primary-foreground"><UserCheck className="h-7 w-7" /></span>
            <h3 className="mt-4 text-lg font-bold">{c.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{c.subject}</p>
            <a href={tg(c.username)} target="_blank" rel="noreferrer" className="mt-2 block text-sm font-semibold text-primary hover:underline" dir="ltr">@{c.username}</a>
            <a href={tg(c.username)} target="_blank" rel="noreferrer" className="btn-brand mt-5 w-full text-sm"><Send className="h-4 w-4" /> راسل المصحح</a>
          </div>
        ))}
      </div>
    </>
  ),
});
