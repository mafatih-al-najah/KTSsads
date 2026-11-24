import { createFileRoute } from "@tanstack/react-router";
import { UserCheck, Send } from "lucide-react";
import { meta, PageHero } from "@/components/SiteShell";
import { correctors, tg } from "@/data/site";
import { sanitizeSafeUrl } from "@/lib/security";

export const Route = createFileRoute("/correctors")({
  head: () => meta("المصححون", "تواصل مباشرة مع مصحح خاص لتصحيح إجاباتك ومتابعة مستواك."),
  component: () => (
    <>
      <PageHero
        title="التواصل مع مصحح خاص"
        subtitle="اختر المصحح المناسب لمادتك وراسله مباشرة على التليكرام"
      />
      <div className="mx-auto grid max-w-6xl gap-5 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {correctors.map((c, index) => {
          const safeHref = sanitizeSafeUrl(tg(c.username), { allowRelative: false });
          return (
            <div
              key={c.username}
              className="card-lift card-glow rise group flex flex-col items-center rounded-3xl border border-border/80 bg-card/90 p-6 text-center shadow-sm backdrop-blur-sm"
              style={{ animationDelay: `${index * 55}ms` }}
            >
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand text-primary-foreground shadow-glow transition-transform duration-300 group-hover:scale-110">
                <UserCheck className="h-7 w-7" />
              </span>
              <h3 className="mt-4 font-display text-lg font-extrabold">{c.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.subject}</p>
              {safeHref && (
                <>
                  <a
                    href={safeHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 block text-sm font-semibold text-primary hover:underline"
                    dir="ltr"
                  >
                    @{c.username}
                  </a>
                  <a
                    href={safeHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-tactile="true"
                    className="btn-brand mt-5 w-full text-sm"
                  >
                    <Send className="h-4 w-4" /> راسل المصحح
                  </a>
                </>
              )}
            </div>
          );
        })}
      </div>
    </>
  ),
});
