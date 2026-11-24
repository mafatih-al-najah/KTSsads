import { createFileRoute } from "@tanstack/react-router";
import { Lightbulb } from "lucide-react";
import { meta, PageHero } from "@/components/SiteShell";
import { tips } from "@/data/site";

export const Route = createFileRoute("/tips")({
  head: () => meta("نصائح الطلاب", "نصائح دراسية مجرّبة لطلاب السادس الإعدادي للوصول إلى التفوق."),
  component: () => (
    <>
      <PageHero title="نصائح الطلاب" subtitle="خطوات بسيطة تصنع فرقاً كبيراً" />
      <div className="mx-auto grid max-w-6xl gap-5 px-4 py-14 sm:grid-cols-2 lg:grid-cols-3">
        {tips.map((t, index) => (
          <div
            key={t.title}
            data-tactile="true"
            className="card-lift card-glow rise group rounded-3xl border border-border/80 bg-card/90 p-6 shadow-sm backdrop-blur-sm"
            style={{ animationDelay: `${index * 55}ms` }}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-secondary text-primary transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                <Lightbulb className="h-5 w-5" />
              </span>
              <span className="font-mono text-xs font-semibold tabular-nums text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="mt-4 font-display text-lg font-extrabold transition-colors group-hover:text-primary">
              {t.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
          </div>
        ))}
      </div>
    </>
  ),
});
