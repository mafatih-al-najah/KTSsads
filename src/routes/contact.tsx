import { createFileRoute } from "@tanstack/react-router";
import { Send, Mail, Megaphone, Users, ArrowUpRight, type LucideIcon } from "lucide-react";
import { meta, PageHero } from "@/components/SiteShell";
import { site, tg } from "@/data/site";

type ContactItem = { icon: LucideIcon; title: string; action: string; href: string };

const items: ContactItem[] = [
  { icon: Send, title: "راسل الإدارة", action: "مراسلة", href: tg(site.contactUsername) },
  { icon: Megaphone, title: "قناة التليكرام", action: "انضم الآن", href: site.telegramChannel },
  { icon: Megaphone, title: "قناة السشنات", action: "انضم الآن", href: site.sanaatChannel },
  { icon: Users, title: "كروب الواتساب", action: "انضم الآن", href: site.whatsappGroup },
  { icon: Mail, title: "البريد الإلكتروني", action: "أرسل بريداً", href: `mailto:${site.email}` },
];

export const Route = createFileRoute("/contact")({
  head: () =>
    meta("تواصل معنا", "تواصل مع إدارة قناة مفاتيح النجاح عبر التليكرام أو الواتساب أو البريد."),
  component: () => (
    <>
      <PageHero title="تواصل معنا" subtitle="نحن هنا للإجابة على أسئلتك" />
      <div className="mx-auto grid max-w-5xl gap-5 px-4 py-14 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ icon: I, title, action, href }) => (
          <div
            key={title}
            className="card-lift flex flex-col items-center rounded-2xl border bg-card p-7 text-center"
          >
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand text-primary-foreground">
              <I className="h-6 w-6" />
            </span>
            <h3 className="mt-4 text-lg font-bold">{title}</h3>
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="btn-brand mt-6 w-full text-sm"
            >
              {action}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        ))}
      </div>
    </>
  ),
});
