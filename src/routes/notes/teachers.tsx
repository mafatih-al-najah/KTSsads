import { createFileRoute } from "@tanstack/react-router";
import { meta, PageHero } from "@/components/SiteShell";
import { ResourceLibrary } from "@/components/ResourceLibrary";
import { teacherNotes } from "@/data/site";

export const Route = createFileRoute("/notes/teachers")({
  head: () => meta("ملازم المدرسين", "ملازم يرفعها المدرسون لطلابهم."),
  component: () => (
    <>
      <PageHero title="ملازم المدرسين" />
      <div className="mx-auto max-w-5xl px-4 pt-8">
        <div className="flex flex-wrap justify-center gap-2">
          {teacherNotes.map((s) => (
            <a key={s.subject} href={`#subject-${s.subject}`} className="rounded-full border bg-card px-4 py-2 text-sm font-semibold hover:bg-accent">{s.subject}</a>
          ))}
        </div>
      </div>
      {teacherNotes.map((s) => (
        <section key={s.subject} id={`subject-${s.subject}`} className="scroll-mt-24 pt-8">
          <h2 className="mx-auto max-w-5xl px-4 text-2xl font-bold">{s.subject}</h2>
          <ResourceLibrary resources={s.notes} emptyText="لا توجد ملازم مرفوعة حالياً." />
        </section>
      ))}
    </>
  ),
});
