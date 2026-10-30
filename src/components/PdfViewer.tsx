import { Download, FileText } from "lucide-react";

function embedUrl(url: string) {
  const drive = url.match(/drive\.google\.com\/(?:file\/d\/|open\?id=)([\w-]+)/);
  return drive ? `https://drive.google.com/file/d/${drive[1]}/preview` : url;
}

function directDownload(url: string, filename: string) {
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.rel = "noreferrer";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export function PdfViewer({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  if (!url.trim())
    return (
      <p className="border-y py-16 text-center text-muted-foreground">
        سيتم نشر الملف قريباً
      </p>
    );
  const sourceUrl = url.trim();
  const src = embedUrl(sourceUrl);
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
            <p className="text-sm text-muted-foreground">
              تصفّح الصفحات هنا دون مغادرة الموقع
            </p>
          </div>
        </div>
        <button
          onClick={() => directDownload(sourceUrl, filename)}
          className="btn-lime text-sm"
        >
          <Download className="h-4 w-4" />
          تحميل الملف
        </button>
      </div>
      <div className="bg-muted/30 p-2 md:p-4">
        <iframe
          src={src}
          title={title}
          className="h-[80vh] min-h-[560px] w-full rounded-2xl border bg-background"
          allow="autoplay"
        />
      </div>
    </section>
  );
}
