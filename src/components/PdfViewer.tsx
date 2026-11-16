import { ChevronDown, ChevronUp, Download, FileText } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { pdfLinks } from "@/lib/pdf-links";
import { DownloadChoices } from "@/components/DownloadChoices";

function scrollViewer(ref: React.RefObject<HTMLDivElement | null>, direction: 1 | -1) {
  const el = ref.current;
  if (!el) return;
  const step = Math.max(window.innerHeight * 0.6, 320) * direction;
  const top = el.getBoundingClientRect().top + window.scrollY;
  const target = direction === -1 ? Math.min(window.scrollY + step, top) : window.scrollY + step;
  window.scrollTo({ top: target, behavior: "smooth" });
}

export function PdfViewer({ url, title, telegramUrl, downloadUrl }: { url: string; title: string; telegramUrl?: string; downloadUrl?: string }) {
  const frameWrapRef = useRef<HTMLDivElement>(null);
  if (!url.trim())
    return (
      <div className="border-y py-16 text-center"><p className="mb-4 text-muted-foreground">لا يوجد ملف للعرض</p>{telegramUrl !== undefined && <DownloadChoices title={title} parts={[{ label: title, url, telegramUrl }]} />}</div>
    );
  const sourceUrl = url.trim();
  const links = pdfLinks(sourceUrl);
  const downloadLinks = downloadUrl?.trim() ? pdfLinks(downloadUrl) : links;
  const filename = title.endsWith(".pdf") ? title : `${title}.pdf`; 

  return (
    <section className="overflow-hidden rounded-3xl border bg-card shadow-glow">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b bg-secondary/60 px-5 py-4 md:px-7">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand text-primary-foreground">
            <FileText className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-bold">{title}</h2>
            <p className="text-sm text-muted-foreground">تصفّح الصفحات هنا دون مغادرة الموقع</p>
          </div>
        </div>
        {telegramUrl !== undefined ? <DownloadChoices title={title} parts={[{ label: title, url, telegramUrl }]} className="btn-lime text-sm" /> : <Button asChild className="btn-lime text-sm">
          <a href={downloadLinks.download} download={downloadLinks.isDrive ? undefined : filename} target={downloadLinks.isDrive ? "_blank" : undefined} rel="noopener noreferrer">
            <Download className="h-4 w-4" />
            {downloadLinks.isDrive ? "تحميل عبر Google Drive" : "تحميل الملف"}
          </a>
        </Button>}
      </div>
      <div ref={frameWrapRef} className="relative bg-muted/30 p-2 md:p-4">
        <iframe
          src={links.preview}
          title={title}
          className="h-[160vh] min-h-[900px] w-full rounded-2xl border bg-background"
          allow="autoplay"
        />
        <div className="pointer-events-none absolute inset-y-0 left-3 z-10 hidden md:block">
          <div className="sticky top-1/2 flex -translate-y-1/2 flex-col gap-3">
            <button
              type="button"
              onClick={() => scrollViewer(frameWrapRef, -1)}
              aria-label="تمرير للأعلى"
              className="pointer-events-auto grid h-11 w-11 place-items-center rounded-full border bg-card/90 text-foreground shadow-glow backdrop-blur transition hover:bg-brand hover:text-primary-foreground"
            >
              <ChevronUp className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollViewer(frameWrapRef, 1)}
              aria-label="تمرير للأسفل"
              className="pointer-events-auto grid h-11 w-11 place-items-center rounded-full border bg-card/90 text-foreground shadow-glow backdrop-blur transition hover:bg-brand hover:text-primary-foreground"
            >
              <ChevronDown className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
