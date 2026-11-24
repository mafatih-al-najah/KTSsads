import { createFileRoute } from "@tanstack/react-router";
import { FolderSearch, MessageCircle, Send, Crown } from "lucide-react";
import { meta, PageHero } from "@/components/SiteShell";
import { tg } from "@/data/site";
import { sanitizeSafeUrl } from "@/lib/security";

export const Route = createFileRoute("/about")({
  head: () => meta("من نحن", "تعرّف على قناة مفاتيح النجاح التعليمية ورسالتها لطلاب العراق."),
  component: () => {
    const ownerUrl = sanitizeSafeUrl(tg("O770ooo"), { allowRelative: false });
    const groupUrl = sanitizeSafeUrl(tg("sad6thss"), { allowRelative: false });

    return (
      <>
        <PageHero title="من نحن" />

        <section className="relative overflow-hidden py-14 md:py-16">
          <div aria-hidden="true" className="hero-blob -right-24 -top-10 h-72 w-72 bg-primary/25" />
          <div
            aria-hidden="true"
            className="hero-blob float-reverse -bottom-24 left-0 h-64 w-64 bg-accent/35"
          />

          <div className="relative mx-auto max-w-4xl px-4">
            <div className="rise rounded-[2rem] border border-border/80 bg-card/90 p-8 text-center shadow-glow backdrop-blur-md md:p-12">
              <span className="float-slow mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-brand text-primary-foreground shadow-glow">
                <FolderSearch className="h-7 w-7" />
              </span>
              <h2 className="mt-6 font-display text-3xl font-black md:text-4xl">
                <span className="text-gradient">فكرة القناة باختصار</span>
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                قناتنا تجمع ملفات كل مادة في مكان واحد. نجمَع المحتوى من كل القنوات ومن كل المصادر،
                حتى لا يحتاج الطالب أن يدخل كل قناة بنفسه — كل شيء أمامه في مكان واحد.
              </p>

              <div aria-hidden="true" className="mx-auto my-10 flex max-w-xs items-center gap-3">
                <span className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                <span className="h-2 w-2 rounded-full bg-primary/60" />
                <span className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {ownerUrl && (
                  <a
                    href={ownerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-tactile="true"
                    className="card-lift card-glow group flex items-center gap-4 rounded-2xl border border-border/80 bg-background/85 p-5 text-right"
                  >
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand text-primary-foreground shadow-sm transition-transform duration-300 group-hover:scale-110">
                      <Crown className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-muted-foreground">
                        المالك
                      </span>
                      <span
                        className="flex items-center gap-1.5 font-display text-lg font-bold"
                        dir="ltr"
                      >
                        <Send className="h-4 w-4 text-primary" />
                        @O770ooo
                      </span>
                    </span>
                  </a>
                )}

                {groupUrl && (
                  <a
                    href={groupUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-tactile="true"
                    className="card-lift card-glow group flex items-center gap-4 rounded-2xl border border-border/80 bg-background/85 p-5 text-right"
                  >
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-secondary text-primary shadow-sm transition-transform duration-300 group-hover:scale-110">
                      <MessageCircle className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-muted-foreground">
                        كروب القناة للمناقشة وأسئلتكم
                      </span>
                      <span
                        className="flex items-center gap-1.5 font-display text-lg font-bold"
                        dir="ltr"
                      >
                        <Send className="h-4 w-4 text-primary" />
                        @sad6thss
                      </span>
                    </span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      </>
    );
  },
});
