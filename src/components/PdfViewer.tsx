import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pdfLinks } from "@/lib/pdf-links";

export function PdfViewer({ url, title }: { url: string; title: string }) {
  if (!url.trim())
    return (
      <p className="border-y py-16 text-center text-muted-foreground">سيتم نشر الملف قريباً</p>
    );
  const sourceUrl = url.trim();
  const links = pdfLinks(sourceUrl);
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
        <Button asChild className="btn-lime text-sm">
          <a href={links.download} download={links.isDrive ? undefined : filename} target={links.isDrive ? "_blank" : undefined} rel="noopener noreferrer">
            <Download className="h-4 w-4" />
            تحميل الملف
          </a>
        </Button>
      </div>
      <div className="bg-muted/30 p-2 md:p-4">
        <iframe
          src={links.preview}
          title={title}
          className="h-[80vh] min-h-[560px] w-full rounded-2xl border bg-background"
          allow="autoplay"
        />
      </div>
    </section>
  );
}
