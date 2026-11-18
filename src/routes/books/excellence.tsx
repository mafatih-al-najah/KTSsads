import { createFileRoute } from "@tanstack/react-router";
import { meta, PageHero } from "@/components/SiteShell";
import { ResourceLibrary } from "@/components/ResourceLibrary";
import { excellenceBooks } from "@/data/site";

export const Route = createFileRoute("/books/excellence")({
  head: () => meta("كتب منهج المتميزين", "كتب منهج مدارس المتميزين لجميع المواد."),
  component: () => (
    <>
      <PageHero title="كتب منهج المتميزين" />
      <ResourceLibrary resources={excellenceBooks} emptyText="لا توجد كتب مرفوعة حالياً. تابعوا القناة لإضافة جديدة." />
    </>
  ),
});
