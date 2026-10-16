import { createFileRoute } from "@tanstack/react-router";
import { Target, Eye, Sparkles } from "lucide-react";
import { meta, PageHero } from "@/components/SiteShell";

const items = [
  { icon: Target, t: "رسالتنا", b: "توفير محتوى تعليمي مجاني ومنظم لكل طالب عراقي أينما كان." },
  { icon: Eye, t: "رؤيتنا", b: "أن نكون المنصة الأولى التي يثق بها طلاب السادس الإعدادي." },
  { icon: Sparkles, t: "قيمنا", b: "الجودة، الأمانة، والوقوف بجانب الطالب حتى يوم النتائج." },
];

export const Route = createFileRoute("/about")({
  head: () => meta("من نحن", "تعرّف على قناة مفاتيح النجاح التعليمية ورسالتها لطلاب العراق."),
  component: () => (
    <>
      <PageHero title="من نحن" subtitle="مفاتيح النجاح قناة تعليمية على التليكرام تجمع الطلاب والمدرسين والمصححين في مكان واحد" />
      <div className="mx-auto grid max-w-6xl gap-5 px-4 py-14 md:grid-cols-3">
        {items.map(({ icon: I, t, b }) => (
          <div key={t} className="card-lift rounded-2xl border bg-card p-7 text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand text-primary-foreground"><I className="h-6 w-6" /></span>
            <h3 className="mt-4 text-xl font-bold">{t}</h3>
            <p className="mt-2 text-muted-foreground">{b}</p>
          </div>
        ))}
      </div>
    </>
  ),
});
