import { createFileRoute } from "@tanstack/react-router";
import { Send, Mail, Megaphone } from "lucide-react";
import { meta, PageHero } from "@/components/SiteShell";
import { site, tg } from "@/data/site";

export const Route = createFileRoute("/contact")({
  head: () => meta("تواصل معنا", "تواصل مع إدارة قناة مفاتيح النجاح عبر التليكرام أو البريد."),
  component: () => {
    const items = [
      { icon: Send, t: "راسل الإدارة", v: `@${site.contactUsername}`, href: tg(site.contactUsername) },
      { icon: Megaphone, t: "قناة التليكرام", v: "انضم الآن", href: site.telegramChannel },
      { icon: Mail, t: "البريد الإلكتروني", v: site.email, href: `mailto:${site.email}` },
    ];
    return (
      <>
        <PageHero title="تواصل معنا" subtitle="نحن هنا للإجابة على أسئلتك" />
        <div className="mx-auto grid max-w-5xl gap-5 px-4 py-14 md:grid-cols-3">
          {items.map(({ icon: I, t, v, href }) => (
            <a key={t} href={href} target="_blank" rel="noreferrer" className="card-lift rounded-2xl border bg-card p-7 text-center">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand text-primary-foreground"><I className="h-6 w-6" /></span>
              <h3 className="mt-4 text-lg font-bold">{t}</h3>
              <p className="mt-2 font-semibold text-primary">{v}</p>
            </a>
          ))}
        </div>
      </>
    );
  },
});
