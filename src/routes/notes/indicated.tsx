import { createFileRoute } from "@tanstack/react-router";
import { meta, PageHero } from "@/components/SiteShell";
import { ResourceLibrary } from "@/components/ResourceLibrary";
import { indicatedBooks } from "@/data/site";

export const Route = createFileRoute("/notes/indicated")({
  head: () => meta("الكتب المؤشرة", "ملازم ومنهجيات الكتب المؤشرة من قبل الوزارة."),
  component: () => (
    <>
      <PageHero title="الكتب المؤشرة" subtitle="سيتم نشر الكتب المؤشرة هنا قريباً" />
      <ResourceLibrary resources={indicatedBooks} emptyText="لا توجد كتب مؤشرة مرفوعة حالياً. تابعوا القناة لإضافة جديدة." />
    </>
  ),
});
