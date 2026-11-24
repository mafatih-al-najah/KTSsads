import { createFileRoute } from "@tanstack/react-router";
import { Heart, Send } from "lucide-react";
import { meta, PageHero } from "@/components/SiteShell";
import { site, tg } from "@/data/site";
import { sanitizeSafeUrl } from "@/lib/security";

export const Route = createFileRoute("/donate")({
  head: () =>
    meta("تبرع وادعم الموقع", "ادعم قناة مفاتيح النجاح لنستمر في تقديم المحتوى المجاني للطلاب."),
  component: () => {
    const safeDonateUrl = sanitizeSafeUrl(tg(site.donateUsername), { allowRelative: false });
    return (
      <>
        <PageHero
          title="تبرع وادعم الموقع"
          subtitle="دعمك يساعدنا على الاستمرار وتقديم محتوى مجاني لآلاف الطلاب"
        />
        <div className="mx-auto max-w-xl px-4 py-14">
          <div className="grain rise relative overflow-hidden rounded-[2rem] bg-brand p-10 text-center text-primary-foreground shadow-glow">
            <div aria-hidden="true" className="hero-grid absolute inset-0" />
            <div
              aria-hidden="true"
              className="hero-blob -right-12 -top-12 h-48 w-48 bg-accent/35"
            />
            <Heart
              className="float-slow relative mx-auto h-14 w-14 text-accent drop-shadow"
              fill="currentColor"
            />
            <h2 className="relative mt-4 font-display text-2xl font-black sm:text-3xl">
              كل مساهمة تصنع فرقاً
            </h2>
            <p className="relative mt-3 leading-relaxed opacity-90">
              تواصل معنا لمعرفة طرق الدعم المتاحة (زين كاش، آسيا حوالة، ماستر كارد).
            </p>
            {safeDonateUrl && (
              <a
                href={safeDonateUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-tactile="true"
                className="btn-lime relative mt-8 text-lg shadow-lg"
              >
                <Send className="h-5 w-5" />
                <span>ادعمنا الآن</span>
              </a>
            )}
          </div>
        </div>
      </>
    );
  },
});
