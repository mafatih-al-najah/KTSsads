import { createFileRoute } from "@tanstack/react-router";
import { meta, PageHero } from "@/components/SiteShell";
import { PdfViewer } from "@/components/PdfViewer";
import { pdfFiles } from "@/data/site";

export const Route = createFileRoute("/minimums")({
  head: () => meta("الحدود الدنيا دفعة 2026", "ملف الحدود الدنيا للقبول المركزي لدفعة 2026 معروض مباشرة على الموقع."),
  component: () => (
    <>
      <PageHero title="الحدود الدنيا دفعة 2026 (متميزين)" />
      <div className="mx-auto max-w-5xl px-4 py-10"><PdfViewer url={pdfFiles.minimums} title="ملف الحدود الدنيا دفعة 2026" /></div>
    </>
  ),
});
