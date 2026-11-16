import { createFileRoute } from "@tanstack/react-router";
import { ExcellenceGallery } from "@/components/ExcellenceGallery";
import { meta, PageHero } from "@/components/SiteShell";
import { site } from "@/data/site";

export const Route = createFileRoute("/excellence")({
  head: () => meta("امتيازات المتميزين 2026", "امتيازات طلاب المتميزين لدفعة 2026 معروضة مباشرة على الموقع."),
  component: () => (
    <>
      <PageHero title="امتيازات المتميزين 2026" subtitle="تصفح الصفحات كصور واضحة من داخل الموقع" />
      <div className="mx-auto max-w-5xl px-4 py-10">
        <ExcellenceGallery images={site.excellenceImageUrl ? [site.excellenceImageUrl] : []} />
      </div>
    </>
  ),
});
