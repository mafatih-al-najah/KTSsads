import { useState } from "react";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DownloadChoices } from "@/components/DownloadChoices";
import { PdfViewer } from "@/components/PdfViewer";
import type { StudyResource } from "@/lib/download-options";

function ResourceItem({ resource }: { resource: StudyResource }) {
  const [preview, setPreview] = useState(false);
  const [part, setPart] = useState(0);
  return (
    <article className="border-b py-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="min-w-0 text-lg font-bold">{resource.label}</h2>
        <div className="flex flex-wrap gap-2">
          {resource.parts.some((item) => item.url.trim()) && <Button variant="outline" onClick={() => setPreview(!preview)} aria-expanded={preview}><BookOpen />{preview ? "إخفاء الكتاب" : "تصفح"}</Button>}
          <DownloadChoices title={resource.label} parts={resource.parts} />
        </div>
      </div>
      {preview && <div className="mt-6">
        {resource.parts.length > 1 && <div className="mb-4 flex flex-wrap gap-2" role="tablist" aria-label="أجزاء الكتاب">{resource.parts.map((item, i) => <Button key={item.label} role="tab" aria-selected={part === i} variant={part === i ? "default" : "outline"} onClick={() => setPart(i)}>{item.label}</Button>)}</div>}
        <PdfViewer title={`${resource.label} — ${resource.parts[part]?.label ?? ""}`} url={resource.parts[part]?.url ?? ""} telegramUrl={resource.parts[part]?.telegramUrl ?? ""} />
      </div>}
    </article>
  );
}

export function ResourceLibrary({ resources, emptyText }: { resources: StudyResource[]; emptyText: string }) {
  return <div className="mx-auto max-w-5xl px-4 py-10">{resources.length ? resources.map((resource) => <ResourceItem key={resource.label} resource={resource} />) : <p className="py-10 text-center text-muted-foreground">{emptyText}</p>}</div>;
}