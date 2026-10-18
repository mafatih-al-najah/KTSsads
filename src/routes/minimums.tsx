import { createFileRoute } from "@tanstack/react-router";
import { meta, PageHero } from "@/components/SiteShell";
import { minimums } from "@/data/site";

export const Route = createFileRoute("/minimums")({
  head: () => meta("الحدود الدنيا دفعة 2026", "الحدود الدنيا للقبول المركزي في الكليات العراقية لدفعة 2026."),
  component: () => (
    <>
      <PageHero title="الحدود الدنيا دفعة 2026 (متميزين)" />
      <div className="mx-auto max-w-3xl px-4 py-14">
        <div className="overflow-hidden rounded-2xl border bg-card">
          <div className="grid grid-cols-2 bg-brand px-6 py-4 font-bold text-primary-foreground">
            <span>الكلية</span><span className="text-left">الحد الأدنى</span>
          </div>
          {minimums.map((m) => (
            <div key={m.college} className="grid grid-cols-2 border-t px-6 py-4 transition hover:bg-muted">
              <span className="font-semibold">{m.college}</span>
              <span className="text-left font-bold text-primary">{m.score}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  ),
});
