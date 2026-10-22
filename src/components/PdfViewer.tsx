import { ExternalLink } from "lucide-react";

function embedUrl(url: string) {
  const drive = url.match(/drive\.google\.com\/(?:file\/d\/|open\?id=)([\w-]+)/);
  return drive ? `https://drive.google.com/file/d/${drive[1]}/preview` : url;
}

export function PdfViewer({ url, title }: { url: string; title: string }) {
  if (!url.trim()) return <p className="border-y py-16 text-center text-muted-foreground">سيتم نشر الملف قريباً</p>;
  const src = embedUrl(url.trim());
  return (
    <>
      <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
        <iframe src={src} title={title} className="h-[80vh] w-full" allow="autoplay" />
      </div>
      <div className="mt-4 text-center">
        <a href={url} target="_blank" rel="noreferrer" className="btn-brand"><ExternalLink className="h-4 w-4" /> فتح الملف بشاشة كاملة</a>
      </div>
    </>
  );
}
