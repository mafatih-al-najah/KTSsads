import { useState } from "react";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DownloadChoices } from "@/components/DownloadChoices";
import { PdfViewer } from "@/components/PdfViewer";
import type { StudyResource } from "@/lib/download-options";

function ResourceItem({ resource, index }: { resource: StudyResource; index: number }) {
  const [preview, setPreview] = useState(false);
  const [part, setPart] = useState(0);

  return (
    <article
      className="rise rounded-3xl border border-border/80 bg-card/85 p-5 shadow-sm backdrop-blur-sm transition hover:border-primary/40 sm:p-6"
      style={{ animationDelay: `${index * 45}ms` }}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="min-w-0">
          <h2 className="font-display text-lg font-extrabold leading-snug">{resource.label}</h2>
          {(resource.teacher || resource.year) && (
            <p className="mt-1.5 flex flex-wrap items-center gap-2 text-xs font-medium text-muted-foreground sm:text-sm">
              {resource.teacher && (
                <span className="font-semibold text-foreground/85">{resource.teacher}</span>
              )}
              {resource.teacher && resource.year && <span aria-hidden="true">·</span>}
              {resource.year && <span className="tabular-nums">{resource.year}</span>}
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-2.5">
          {resource.parts.some((item) => item.url.trim()) && (
            <Button
              variant="outline"
              onClick={() => setPreview(!preview)}
              aria-expanded={preview}
              className="rounded-xl"
            >
              <BookOpen />
              {preview ? "إخفاء الكتاب" : "تصفح"}
            </Button>
          )}
          <DownloadChoices title={resource.label} parts={resource.parts} />
        </div>
      </div>
      {preview && (
        <div className="announce-in mt-6 border-t pt-6">
          {resource.parts.length > 1 && (
            <div className="mb-4 flex flex-wrap gap-2" role="tablist" aria-label="أجزاء الكتاب">
              {resource.parts.map((item, i) => (
                <Button
                  key={item.label}
                  role="tab"
                  aria-selected={part === i}
                  variant={part === i ? "default" : "outline"}
                  onClick={() => setPart(i)}
                >
                  {item.label}
                </Button>
              ))}
            </div>
          )}
          <PdfViewer
            title={`${resource.label} — ${resource.parts[part]?.label ?? ""}`}
            url={resource.parts[part]?.url ?? ""}
            telegramUrl={resource.parts[part]?.telegramUrl ?? ""}
          />
        </div>
      )}
    </article>
  );
}

export function ResourceLibrary({
  resources,
  emptyText,
}: {
  resources: StudyResource[];
  emptyText: string;
}) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {resources.length ? (
        <div className="space-y-4">
          {resources.map((resource, index) => (
            <ResourceItem key={resource.label} resource={resource} index={index} />
          ))}
        </div>
      ) : (
        <p className="rounded-3xl border border-dashed bg-card/60 py-12 text-center text-muted-foreground">
          {emptyText}
        </p>
      )}
    </div>
  );
}
