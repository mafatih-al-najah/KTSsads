import { useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { downloadOptions, type ResourcePart } from "@/lib/download-options";

function ProviderIcon({ provider }: { provider: "telegram" | "drive" }) {
  return provider === "telegram" ? (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.9 6.2-1.6 8.1c-.1.6-.5.7-1 .4l-2.5-1.9-1.2 1.2c-.1.1-.3.3-.6.3l.2-2.6 4.7-4.2c.2-.2 0-.3-.3-.1l-5.8 3.7-2.5-.8c-.6-.2-.6-.6.1-.8l9.7-3.8c.5-.2.9.1.8.5Z" /></svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"><path d="m9 3-7 12 3.5 6h14l3.5-6-7-12H9Z M9 3l7 12H2 M16 3 5.5 21 M9 15h14" /></svg>
  );
}

export function DownloadChoices({ title, parts, className }: { title: string; parts: ResourcePart[]; className?: string }) {
  const [selectedPart, setSelectedPart] = useState(0);
  return (
    <Dialog>
      <DialogTrigger asChild><Button className={className}><Download />تحميل</Button></DialogTrigger>
      <DialogContent dir="rtl" className="w-[calc(100%-2rem)] max-w-md rounded-lg">
        <DialogTitle className="pl-6 pr-5 text-right">تحميل {title}</DialogTitle>
        <DialogDescription className="text-right">{parts[selectedPart]?.label ?? title}</DialogDescription>
        {parts.length > 1 && (
          <div role="tablist" aria-label="أجزاء التحميل" className="flex flex-wrap gap-2">
            {parts.map((part, i) => <Button key={part.label} role="tab" aria-selected={selectedPart === i} variant={selectedPart === i ? "default" : "outline"} onClick={() => setSelectedPart(i)}>{part.label}</Button>)}
          </div>
        )}
        <div className="grid gap-3">
          {downloadOptions(parts[selectedPart]).map(({ provider, href }) => {
            const label = provider === "telegram" ? "تحميل عبر تليكرام" : "تحميل عبر Google Drive";
            return href ? (
              <Button key={provider} asChild variant="outline" className="h-14 justify-start gap-3">
                <a href={href} target="_blank" rel="noopener noreferrer"><ProviderIcon provider={provider} />{label}</a>
              </Button>
            ) : (
              <Button key={provider} disabled variant="outline" className="h-14 justify-start gap-3"><ProviderIcon provider={provider} /><span className="text-right">{label}<span className="block text-xs font-normal">غير متوفر حالياً</span></span></Button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}