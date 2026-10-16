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
        {tips.map((t) => (
          <div key={t.title} className="card-lift rounded-2xl border bg-card p-6">
            <Lightbulb className="h-8 w-8 text-primary" />
            <h3 className="mt-3 text-lg font-bold">{t.title}</h3>
            <p className="mt-2 text-muted-foreground">{t.body}</p>
          </div>
        ))}
      </div>
    </>
  ),
});
