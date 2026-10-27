import { createFileRoute } from "@tanstack/react-router";
import { meta, PageHero } from "@/components/SiteShell";

export const Route = createFileRoute("/books/excellence")({
  head: () => meta("كتب منهج المتميزين", "كتب منهج مدارس المتميزين لجميع المواد."),
  component: () => (
    <>
      <PageHero title="كتب منهج المتميزين" subtitle="سيتم نشر الكتب هنا قريباً" />
      <div className="mx-auto max-w-3xl px-4 py-20 text-center text-muted-foreground">
        <p>لا توجد كتب مرفوعة حالياً. تابعوا القناة لإضافة جديدة.</p>
      </div>
    </>
  ),
});
