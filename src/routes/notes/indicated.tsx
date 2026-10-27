import { createFileRoute } from "@tanstack/react-router";
import { meta, PageHero } from "@/components/SiteShell";

export const Route = createFileRoute("/notes/indicated")({
  head: () => meta("الكتب المؤشرة", "ملازم ومنهجيات الكتب المؤشرة من قبل الوزارة."),
  component: () => (
    <>
      <PageHero title="الكتب المؤشرة" subtitle="سيتم نشر الكتب المؤشرة هنا قريباً" />
      <div className="mx-auto max-w-3xl px-4 py-20 text-center text-muted-foreground">
        <p>لا توجد كتب مؤشرة مرفوعة حالياً. تابعوا القناة لإضافة جديدة.</p>
      </div>
    </>
  ),
});
