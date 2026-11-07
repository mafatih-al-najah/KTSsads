import { useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  Loader2,
  Maximize,
  Minimize,
} from "lucide-react";
import type { PDFDocumentLoadingTask, PDFDocumentProxy, RenderTask } from "pdfjs-dist";
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";

type LoadStatus = "loading" | "ready" | "error";

let pdfLibPromise: Promise<typeof import("pdfjs-dist")> | null = null;

function loadPdfLib() {
  pdfLibPromise ??= import("pdfjs-dist").then((lib) => {
    lib.GlobalWorkerOptions.workerSrc = workerUrl;
    return lib;
  });
  return pdfLibPromise;
}

export function PdfViewer({ url, title }: { url: string; title: string }) {
  const src = url.trim();
  const filename = `${title}.pdf`;

  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [doc, setDoc] = useState<PDFDocumentProxy | null>(null);
  const [status, setStatus] = useState<LoadStatus>("loading");
  const [page, setPage] = useState(1);
  const [frameWidth, setFrameWidth] = useState(0);
  const [rendering, setRendering] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    if (!src) return;
    let cancelled = false;
    let task: PDFDocumentLoadingTask | null = null;
    setStatus("loading");
    setDoc(null);
    setPage(1);
    loadPdfLib()
      .then((lib) => {
        if (cancelled) return null;
        task = lib.getDocument(src);
        return task.promise;
      })
      .then(
        (loaded) => {
          if (cancelled || !loaded) return;
          setDoc(loaded);
          setStatus("ready");
        },
        () => {
          if (!cancelled) setStatus("error");
        },
      );
    return () => {
      cancelled = true;
      void task?.destroy();
    };
  }, [src]);

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const update = () => setFrameWidth(el.clientWidth);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!doc || !canvasRef.current || frameWidth === 0) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let cancelled = false;
    let renderTask: RenderTask | null = null;
    setRendering(true);

    doc
      .getPage(page)
      .then((pdfPage) => {
        if (cancelled) return;
        const dpr = window.devicePixelRatio || 1;
        const base = pdfPage.getViewport({ scale: 1 });
        const cssScale = frameWidth / base.width;
        const viewport = pdfPage.getViewport({ scale: cssScale * dpr });
        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);
        canvas.style.width = `${frameWidth}px`;
        canvas.style.height = `${viewport.height / dpr}px`;
        renderTask = pdfPage.render({ canvas, canvasContext: ctx, viewport });
        return renderTask.promise;
      })
      .then(
        () => {
          if (!cancelled) setRendering(false);
        },
        () => {
          if (!cancelled) setRendering(false);
        },
      );

    return () => {
      cancelled = true;
      renderTask?.cancel();
    };
  }, [doc, page, frameWidth]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [page]);

  useEffect(() => {
    const sync = () => setFullscreen(document.fullscreenElement === sectionRef.current);
    document.addEventListener("fullscreenchange", sync);
    return () => document.removeEventListener("fullscreenchange", sync);
  }, []);

  const numPages = doc?.numPages ?? 0;
  const goTo = (n: number) => setPage(Math.min(Math.max(1, n), numPages));

  useEffect(() => {
    if (!doc) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      if (e.key === "ArrowLeft") setPage((p) => Math.min(p + 1, doc.numPages));
      if (e.key === "ArrowRight") setPage((p) => Math.max(p - 1, 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [doc]);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void sectionRef.current?.requestFullscreen();
  };

  if (!src)
    return (
      <p className="border-y py-16 text-center text-muted-foreground">سيتم نشر الملف قريباً</p>
    );

  return (
    <section
      ref={sectionRef}
      className="flex flex-col overflow-hidden rounded-3xl border bg-card shadow-glow data-[fs=true]:h-screen data-[fs=true]:rounded-none data-[fs=true]:border-0"
      data-fs={fullscreen}
    >
      <div className="flex flex-wrap items-center justify-between gap-4 border-b bg-secondary/60 px-5 py-4 md:px-7">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand text-primary-foreground">
            <FileText className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <h2 className="truncate font-bold">{title}</h2>
            <p className="text-sm text-muted-foreground">
              {numPages > 0 ? `${numPages} صفحة` : "تصفّح الكتاب داخل الموقع"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label={fullscreen ? "الخروج من ملء الشاشة" : "ملء الشاشة"}
            className="grid h-10 w-10 place-items-center rounded-full border bg-card transition hover:border-primary"
          >
            {fullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
          </button>
          <a href={src} download={filename} className="btn-lime text-sm">
            <Download className="h-4 w-4" />
            تحميل الملف
          </a>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="relative flex-1 overflow-y-auto bg-muted/40 p-3 md:p-6 data-[fs=false]:max-h-[78vh] data-[fs=false]:min-h-[480px]"
        data-fs={fullscreen}
      >
        <div ref={frameRef} className="mx-auto w-full max-w-3xl">
          {status === "loading" && (
            <div className="flex flex-col items-center gap-3 py-24 text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm">جارٍ فتح الكتاب...</p>
            </div>
          )}

          {status === "error" && (
            <div className="flex flex-col items-center gap-4 py-24 text-center">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-destructive/10 text-destructive">
                <AlertTriangle className="h-7 w-7" />
              </span>
              <p className="font-bold">تعذّر فتح الكتاب داخل الموقع</p>
              <p className="max-w-sm text-sm text-muted-foreground">
                يمكنك تحميل الملف مباشرة وفتحه من جهازك
              </p>
              <a href={src} download={filename} className="btn-brand text-sm">
                <Download className="h-4 w-4" />
                تحميل الملف
              </a>
            </div>
          )}

          {status === "ready" && (
            <div
              key={page}
              className="page-turn relative mx-auto w-fit overflow-hidden rounded-lg bg-white shadow-xl"
            >
              <canvas ref={canvasRef} className="block" aria-label={`${title} - صفحة ${page}`} />
              {rendering && (
                <div className="absolute inset-0 grid place-items-center bg-white/70">
                  <Loader2 className="h-7 w-7 animate-spin text-primary" />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {status === "ready" && (
        <div className="flex flex-wrap items-center gap-4 border-t bg-card px-4 py-4 md:px-7">
          <button
            type="button"
            onClick={() => goTo(page - 1)}
            disabled={page <= 1}
            className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2.5 text-sm font-bold transition hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-40"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="hidden sm:inline">السابقة</span>
          </button>
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <input
              type="range"
              min={1}
              max={numPages}
              value={page}
              onChange={(e) => goTo(Number(e.target.value))}
              aria-label="الانتقال إلى صفحة"
              className="w-full cursor-pointer accent-primary"
            />
            <p className="text-center text-sm font-semibold tabular-nums">
              {page} / {numPages}
            </p>
          </div>
          <button
            type="button"
            onClick={() => goTo(page + 1)}
            disabled={page >= numPages}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition hover:scale-105 disabled:pointer-events-none disabled:opacity-40"
          >
            <span className="hidden sm:inline">التالية</span>
            <ChevronLeft className="h-4 w-4" />
          </button>
        </div>
      )}
    </section>
  );
}
