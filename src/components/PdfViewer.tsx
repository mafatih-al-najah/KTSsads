import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pdfLinks } from "@/lib/pdf-links";
import { DownloadChoices } from "@/components/DownloadChoices";

export function PdfViewer({
  url,
  title,
  telegramUrl,
  downloadUrl,
}: {
  url: string;
  title: string;
  telegramUrl?: string;
  downloadUrl?: string;
}) {
  const links = pdfLinks(url);
  if (!links.preview)
    return (
      <div className="border-y py-16 text-center">
        <p className="mb-4 text-muted-foreground">لا يوجد ملف للعرض</p>
        {telegramUrl !== undefined && (
          <DownloadChoices title={title} parts={[{ label: title, url, telegramUrl }]} />
        )}
      </div>
    );

  const downloadLinks = downloadUrl?.trim() ? pdfLinks(downloadUrl) : links;
  const filename = title.endsWith(".pdf") ? title : `${title}.pdf`;

  return (
    <section className="overflow-hidden rounded-3xl border border-border/80 bg-card/95 shadow-glow backdrop-blur-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b bg-secondary/50 px-5 py-4 md:px-7">
        <div className="flex items-center gap-3.5">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand text-primary-foreground shadow-sm">
            <FileText className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-display text-base font-extrabold sm:text-lg">{title}</h2>
            <p className="text-xs text-muted-foreground sm:text-sm">
              تصفّح الصفحات هنا دون مغادرة الموقع
            </p>
          </div>
        </div>
        {telegramUrl !== undefined ? (
          <DownloadChoices
            title={title}
            parts={[{ label: title, url, telegramUrl }]}
            className="btn-lime text-sm"
          />
        ) : (
          <Button asChild className="btn-lime text-sm">
            <a
              href={downloadLinks.download || links.download}
              download={downloadLinks.isDrive ? undefined : filename}
              target={downloadLinks.isDrive ? "_blank" : undefined}
              rel="noopener noreferrer"
            >
              <Download className="h-4 w-4" />
              {downloadLinks.isDrive ? "تحميل عبر Google Drive" : "تحميل الملف"}
            </a>
          </Button>
        )}
      </div>
      <div className="bg-muted/25 p-2 sm:p-3 md:p-4">
        <iframe
          src={links.preview}
          title={title}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="h-[78vh] min-h-[540px] w-full rounded-2xl border bg-background"
          allow="autoplay"
        />
      </div>
    </section>
  );
}
