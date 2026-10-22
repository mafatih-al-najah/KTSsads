import { createFileRoute } from "@tanstack/react-router";
import { Megaphone, Send } from "lucide-react";
import { meta, PageHero } from "@/components/SiteShell";
import { announcements, teacherAds } from "@/data/site";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/announcements")({
  head: () => meta("الإعلانات", "إعلانات المدرسين والتسجيل عبر التليكرام وآخر أخبار قناة مفاتيح النجاح."),
  component: Announcements,
});

function Announcements() {
  return (
    <>
      <PageHero title="الإعلانات" subtitle="إعلانات المدرسين وآخر أخبار مفاتيح النجاح" />
      <section className="mx-auto max-w-5xl px-4 py-10">
        <h2 className="mb-6 text-2xl font-black">إعلانات المدرسين</h2>
        {teacherAds.length === 0 ? <p className="border-y py-12 text-center text-muted-foreground">لا توجد إعلانات مدرسين منشورة حالياً</p> : <div className="grid gap-5 md:grid-cols-2">
          {teacherAds.map((ad) => <article key={ad.title} className="flex flex-col rounded-lg border bg-card p-6">
            <span className="text-sm font-bold text-primary">{ad.subject}</span>
            <h3 className="mt-3 break-words text-xl font-bold">{ad.title}</h3>
            <p className="mt-2 font-semibold">{ad.teacher}</p>
            <p className="mb-5 mt-4 whitespace-pre-wrap break-words text-muted-foreground">{ad.body}</p>
            <Button asChild className="mt-auto"><a href={ad.telegram} target="_blank" rel="noreferrer"><Send />التسجيل لدى المدرس</a></Button>
          </article>)}
        </div>}
      </section>
      <section className="mx-auto max-w-5xl space-y-5 px-4 py-10">
        <h2 className="text-2xl font-black">أخبار القناة</h2>
        {announcements.map((a) => (
          <article key={a.title} className="card-lift flex gap-4 rounded-2xl border bg-card p-6">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground"><Megaphone className="h-5 w-5" /></span>
            <div>
              <time className="text-xs font-semibold text-primary">{a.date}</time>
              <h3 className="mt-1 text-lg font-bold">{a.title}</h3>
              <p className="mt-2 text-muted-foreground">{a.body}</p>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
