import { createFileRoute } from "@tanstack/react-router";
import { meta, PageHero } from "@/components/SiteShell";

export const Route = createFileRoute("/notes/teachers")({
  head: () => meta("ملازم المدرسين", "ملازم يرفعها المدرسون لطلابهم."),
  component: () => (
    <>
      <PageHero title="ملازم المدرسين" subtitle="سيتم نشر الملازم هنا قريباً" />
      <div className="mx-auto max-w-3xl px-4 py-20 text-center text-muted-foreground">
        <p>لا توجد ملازم مرفوعة حالياً. تابعوا القناة لإضافة جديدة.</p>
      </div>
    </>
  ),
});
