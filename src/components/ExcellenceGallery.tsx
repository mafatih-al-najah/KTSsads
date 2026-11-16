import { useCallback, useRef, useState, type PointerEvent, type WheelEvent } from "react";
import { ChevronLeft, ChevronRight, Images } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ExcellenceGallery({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);
  const safeIndex = Math.min(current, Math.max(images.length - 1, 0));

  const goTo = useCallback((index: number) => {
    if (!images.length) return;
    setCurrent((index + images.length) % images.length);
  }, [images.length]);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    setDragStart(event.clientX);
    setIsDragging(true);
    galleryRef.current?.setPointerCapture(event.pointerId);
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (dragStart === null) return;
    const distance = event.clientX - dragStart;
    if (Math.abs(distance) > 48) goTo(safeIndex + (distance > 0 ? -1 : 1));
    setDragStart(null);
    setIsDragging(false);
  };

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    if (Math.abs(event.deltaX) < 8 && Math.abs(event.deltaY) < 8) return;
    event.preventDefault();
    goTo(safeIndex + (event.deltaY > 0 || event.deltaX < 0 ? 1 : -1));
  };

  if (!images.length) {
    return (
      <div className="rounded-[2rem] border border-dashed bg-card px-6 py-16 text-center text-muted-foreground">
        لا توجد صور مضافة لهذا الملف حالياً
      </div>
    );
  }

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-card shadow-glow" aria-label="معرض امتيازات المتميزين">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-black/25 to-transparent" />
      <div className="absolute right-5 top-5 z-20 flex items-center gap-2 rounded-full bg-black/45 px-3 py-1.5 text-sm font-bold text-white backdrop-blur-md">
        <Images className="h-4 w-4" />
        <span>صفحة {safeIndex + 1} من {images.length}</span>
      </div>

      <div
        ref={galleryRef}
        className={`relative flex min-h-[60vh] select-none items-center justify-center overflow-hidden bg-slate-950/95 p-3 sm:p-6 md:min-h-[720px] ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={handleWheel}
        onDragStart={(event) => event.preventDefault()}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,color-mix(in_oklab,var(--color-primary)_30%,transparent),transparent_65%)]" />
        <img
          key={images[safeIndex]}
          src={images[safeIndex]}
          alt={`صفحة ${safeIndex + 1} من امتيازات المتميزين 2026`}
          className="relative max-h-[calc(60vh-1.5rem)] w-auto max-w-full rounded-xl object-contain shadow-2xl transition-transform duration-300 sm:max-h-[calc(720px-3rem)]"
          draggable={false}
        />

        {images.length > 1 && (
          <>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="الصفحة السابقة"
              title="الصفحة السابقة"
              onClick={() => goTo(safeIndex - 1)}
              className="absolute right-3 top-1/2 h-12 w-12 -translate-y-1/2 rounded-full bg-white/90 text-slate-900 shadow-xl hover:bg-white sm:right-6"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="الصفحة التالية"
              title="الصفحة التالية"
              onClick={() => goTo(safeIndex + 1)}
              className="absolute left-3 top-1/2 h-12 w-12 -translate-y-1/2 rounded-full bg-white/90 text-slate-900 shadow-xl hover:bg-white sm:left-6"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 border-t bg-card/95 px-4 py-4 backdrop-blur">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`عرض الصفحة ${index + 1}`}
            aria-current={safeIndex === index ? "page" : undefined}
            className={`h-2.5 rounded-full transition-all duration-300 ${safeIndex === index ? "w-10 bg-primary" : "w-2.5 bg-primary/25 hover:bg-primary/55"}`}
          />
        ))}
        <span className="basis-full text-center text-xs text-muted-foreground sm:basis-auto sm:text-right">اسحب أو مرّر للتنقل بين الصفحات</span>
      </div>
    </section>
  );
}
