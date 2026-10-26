import { createFileRoute } from "@tanstack/react-router";
import { meta, PageHero } from "@/components/SiteShell";
import { site } from "@/data/site";

export const Route = createFileRoute("/excellence")({
  head: () => meta("امتياز المتميزين 2026", "امتيازات طلاب المتميزين لدفعة 2026 معروضة مباشرة على الموقع."),
  component: () => (
    <>
      <PageHero title="امتياز المتميزين 2026" />
      <div className="mx-auto max-w-4xl px-4 py-10">
        {site.excellenceImageUrl ? (
          <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
            <img src={site.excellenceImageUrl} alt="امتيازات المتميزين 2026" className="h-auto w-full" />
          </div>
        ) : (
          <p className="rounded-2xl border bg-card p-10 text-center text-lg text-muted-foreground">
            سيتم نشر صورة الامتياز قريباً
          </p>
        )}
      </div>
    </>
  ),
});
