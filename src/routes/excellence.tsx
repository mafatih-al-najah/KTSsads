import { createFileRoute } from "@tanstack/react-router";
import { meta, PageHero } from "@/components/SiteShell";
import { PdfViewer } from "@/components/PdfViewer";
import { pdfFiles } from "@/data/site";

export const Route = createFileRoute("/excellence")({
  head: () => meta("امتياز المتميزين 2026", "ملف امتياز المتميزين لدفعة 2026 معروض مباشرة على الموقع."),
  component: () => (
    <>
      <PageHero title="امتياز المتميزين 2026" subtitle="برنامج خاص للطلاب المتفوقين نحو المعدلات العليا" />
      <div className="mx-auto max-w-5xl px-4 py-10"><PdfViewer url={pdfFiles.excellence} title="ملف امتياز المتميزين 2026" /></div>
    </>
  ),
});
