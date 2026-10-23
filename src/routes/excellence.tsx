import { createFileRoute } from "@tanstack/react-router";
import { meta, PageHero } from "@/components/SiteShell";
import excellenceImage from "@/assets/excellence.jpg.asset.json";

export const Route = createFileRoute("/excellence")({
  head: () => meta("امتياز المتميزين 2026", "امتيازات طلاب المتميزين لدفعة 2026 معروضة مباشرة على الموقع."),
  component: () => (
    <>
      <PageHero title="امتياز المتميزين 2026" subtitle="برنامج خاص للطلاب المتفوقين نحو المعدلات العليا" />
      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
          <img src={excellenceImage.url} alt="امتيازات المتميزين 2026" className="h-auto w-full" />
        </div>
      </div>
    </>
  ),
});
