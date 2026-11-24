import { createFileRoute } from "@tanstack/react-router";
import { Megaphone, Send } from "lucide-react";
import { meta, PageHero } from "@/components/SiteShell";
import { announcements, teacherAds } from "@/data/site";
import { Button } from "@/components/ui/button";
import { sanitizeSafeUrl } from "@/lib/security";

export const Route = createFileRoute("/announcements")({
  head: () =>
    meta("الإعلانات", "إعلانات المدرسين والتسجيل عبر التليكرام وآخر أخبار قناة مفاتيح النجاح."),
  component: Announcements,
});

function Announcements() {
  return (
    <>
      <PageHero title="الإعلانات" subtitle="إعلانات المدرسين وآخر أخبار مفاتيح النجاح" />
      <section className="mx-auto max-w-5xl px-4 py-10">
        <h2 className="mb-6 font-display text-2xl font-black">إعلانات المدرسين</h2>
        {teacherAds.length === 0 ? (
          <p className="rounded-3xl border border-dashed bg-card/60 py-12 text-center text-muted-foreground">
            لا توجد إعلانات مدرسين منشورة حالياً
          </p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {teacherAds.map((ad, index) => {
              const safeTg = sanitizeSafeUrl(ad.telegram, { allowRelative: false });
              return (
                <article
                  key={ad.title}
                  className="card-lift card-glow rise flex flex-col rounded-3xl border border-border/80 bg-card/90 p-6 shadow-sm backdrop-blur-sm"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  <span className="text-xs font-bold text-primary">{ad.subject}</span>
                  <h3 className="mt-2.5 break-words font-display text-xl font-extrabold">
                    {ad.title}
                  </h3>
                  <p className="mt-1.5 text-sm font-semibold text-foreground/85">{ad.teacher}</p>
                  <p className="mb-5 mt-4 whitespace-pre-wrap break-words text-sm leading-relaxed text-muted-foreground">
                    {ad.body}
                  </p>
                  {safeTg && (
                    <Button asChild className="mt-auto rounded-xl">
                      <a href={safeTg} target="_blank" rel="noopener noreferrer">
                        <Send />
                        التسجيل لدى المدرس
                      </a>
                    </Button>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </section>
      <section className="mx-auto max-w-5xl space-y-4 px-4 py-10">
        <h2 className="font-display text-2xl font-black">أخبار القناة</h2>
        {announcements.map((a, index) => (
          <article
            key={a.title}
            className="card-lift card-glow rise flex gap-4 rounded-3xl border border-border/80 bg-card/90 p-6 shadow-sm backdrop-blur-sm"
            style={{ animationDelay: `${index * 55}ms` }}
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand text-primary-foreground shadow-sm">
              <Megaphone className="h-5 w-5" />
            </span>
            <div>
              <time className="text-xs font-semibold tabular-nums text-primary">{a.date}</time>
              <h3 className="mt-1 font-display text-lg font-extrabold">{a.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{a.body}</p>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
