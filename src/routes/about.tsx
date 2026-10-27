import { createFileRoute } from "@tanstack/react-router";
import { FolderSearch, Users, MessageCircle, Send, Crown } from "lucide-react";
import { meta, PageHero } from "@/components/SiteShell";
import { site, tg } from "@/data/site";

export const Route = createFileRoute("/about")({
  head: () => meta("من نحن", "تعرّف على قناة مفاتيح النجاح التعليمية ورسالتها لطلاب العراق."),
  component: () => (
    <>
      <PageHero title="من نحن" />

      {/* الفكرة — بطاقة عريضة على طول الصفحة */}
      <section className="relative overflow-hidden py-16">
        <div className="hero-blob -right-24 -top-10 h-72 w-72 bg-primary" />
        <div className="hero-blob -bottom-24 left-0 h-64 w-64 bg-accent" style={{ animationDelay: "-4s" }} />

        <div className="relative mx-auto max-w-4xl px-4">
          <div className="card-lift rounded-3xl border bg-card p-8 text-center shadow-sm md:p-12">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-brand text-primary-foreground shadow-glow">
              <FolderSearch className="h-7 w-7" />
            </span>
            <h2 className="mt-6 text-3xl font-black md:text-4xl">
              <span className="text-gradient">فكرة القناة باختصار</span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              قناتنا تجمع ملفات كل مادة في مكان واحد. نجمَع المحتوى من كل القنوات ومن كل المصادر،
              حتى لا يحتاج الطالب أن يدخل كل قناة بنفسه — كل شيء أمامه في مكان واحد.
            </p>

            {/* فاصلة مزخرفة */}
            <div className="mx-auto my-10 flex max-w-xs items-center gap-3">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
              <span className="h-2 w-2 rounded-full bg-accent" />
              <span className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
            </div>

            {/* بطاقتان جنباً إلى جنب: المالك وكروب المناقشة */}
            <div className="grid gap-4 md:grid-cols-2">
              <a
                href={tg("O770ooo")}
                target="_blank"
                rel="noreferrer"
                className="card-lift group flex items-center gap-4 rounded-2xl border bg-background p-5 text-right transition hover:border-primary"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand text-primary-foreground">
                  <Crown className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-muted-foreground">المالك</span>
                  <span className="flex items-center gap-1 text-lg font-bold" dir="ltr">
                    <Send className="h-4 w-4 text-accent" />
                    @O770ooo
                  </span>
                </span>
              </a>

              <a
                href={tg("sad6thss")}
                target="_blank"
                rel="noreferrer"
                className="card-lift group flex items-center gap-4 rounded-2xl border bg-background p-5 text-right transition hover:border-accent"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent">
                  <MessageCircle className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-muted-foreground">كروب القناة للمناقشة وأسئلتكم</span>
                  <span className="flex items-center gap-1 text-lg font-bold" dir="ltr">
                    <Send className="h-4 w-4 text-accent" />
                    @sad6thss
                  </span>
                </span>
              </a>
            </div>

            <p className="mt-8 text-sm text-muted-foreground">
              <Users className="me-1 inline h-4 w-4 align-text-bottom" />
              نجمع الطلاب والمصححين في مكان واحد، لنوفر وقتك وتركزك على الأهم.
            </p>
          </div>
        </div>
      </section>
    </>
  ),
});
