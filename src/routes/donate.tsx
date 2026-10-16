import { createFileRoute } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { meta, PageHero } from "@/components/SiteShell";
import { site } from "@/data/site";

export const Route = createFileRoute("/donate")({
  head: () => meta("تبرع وادعم الموقع", "ادعم قناة مفاتيح النجاح لنستمر في تقديم المحتوى المجاني للطلاب."),
  component: () => (
    <>
      <PageHero title="تبرع وادعم الموقع" subtitle="دعمك يساعدنا على الاستمرار وتقديم محتوى مجاني لآلاف الطلاب" />
      <div className="mx-auto max-w-xl px-4 py-14">
        <div className="rounded-3xl bg-brand p-10 text-center text-primary-foreground shadow-glow">
          <Heart className="mx-auto h-14 w-14 text-accent" fill="currentColor" />
          <h2 className="mt-4 text-2xl font-black">كل مساهمة تصنع فرقاً</h2>
          <p className="mt-3 opacity-90">تواصل معنا لمعرفة طرق الدعم المتاحة (زين كاش، آسيا حوالة، ماستر كارد).</p>
          <a href={site.donateLink} target="_blank" rel="noreferrer" className="btn-lime mt-8">ادعمنا الآن</a>
        </div>
      </div>
    </>
  ),
});
