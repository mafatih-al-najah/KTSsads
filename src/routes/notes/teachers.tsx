import { createFileRoute } from "@tanstack/react-router";
import { meta, PageHero } from "@/components/SiteShell";
import { ResourceLibrary } from "@/components/ResourceLibrary";
import { teacherNotes } from "@/data/site";

export const Route = createFileRoute("/notes/teachers")({
  head: () => meta("ملازم المدرسين", "ملازم يرفعها المدرسون لطلابهم."),
  component: () => (
    <>
      <PageHero title="ملازم المدرسين" />
      <ResourceLibrary resources={teacherNotes} emptyText="لا توجد ملازم مرفوعة حالياً. تابعوا القناة لإضافة جديدة." />
    </>
  ),
});
