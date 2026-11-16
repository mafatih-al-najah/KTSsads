import { createFileRoute } from "@tanstack/react-router";
import { PdfViewer } from "@/components/PdfViewer";
import { meta, PageHero } from "@/components/SiteShell";
import { site } from "@/data/site";

export const Route = createFileRoute("/excellence")({
  head: () => meta("امتيازات المتميزين 2026", "امتيازات طلاب المتميزين لدفعة 2026 معروضة مباشرة على الموقع."),
  component: () => (
    <>
      <PageHero title="امتيازات المتميزين 2026" subtitle="تصفح الملف مباشرة من داخل الموقع" />
      <div className="mx-auto max-w-5xl px-4 py-10">
        <PdfViewer
          title="امتيازات المتميزين 2026"
          url={site.pdfFiles.excellence}
          downloadUrl={site.pdfFiles.excellenceGoogleDrive}
        />
        {!site.pdfFiles.excellenceGoogleDrive.trim() && (
          <p className="mt-4 rounded-2xl border border-dashed bg-card/70 px-5 py-4 text-center text-sm text-muted-foreground">
            التحميل عبر Google Drive يتفعل مباشرة بعد إضافة رابط الملف المشترك.
          </p>
        )}
      </div>
    </>
  ),
});
