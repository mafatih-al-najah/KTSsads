import { createFileRoute } from "@tanstack/react-router";
import { Send, Mail, Megaphone, Users, ArrowUpRight, type LucideIcon } from "lucide-react";
import { meta, PageHero } from "@/components/SiteShell";
import { site, tg } from "@/data/site";
import { sanitizeSafeUrl } from "@/lib/security";

type ContactItem = {
  icon: LucideIcon;
  title: string;
  action: string;
  href: string;
  allowMailto?: boolean;
};

const items: ContactItem[] = [
  { icon: Send, title: "راسل الإدارة", action: "مراسلة", href: tg(site.contactUsername) },
  { icon: Megaphone, title: "قناة التليكرام", action: "انضم الآن", href: site.telegramChannel },
  { icon: Megaphone, title: "قناة السشنات", action: "انضم الآن", href: site.sanaatChannel },
  { icon: Users, title: "كروب الواتساب", action: "انضم الآن", href: site.whatsappGroup },
  {
    icon: Mail,
    title: "البريد الإلكتروني",
    action: "أرسل بريداً",
    href: `mailto:${site.email}`,
    allowMailto: true,
  },
];

export const Route = createFileRoute("/contact")({
  head: () =>
    meta("تواصل معنا", "تواصل مع إدارة قناة مفاتيح النجاح عبر التليكرام أو الواتساب أو البريد."),
  component: () => (
    <>
      <PageHero title="تواصل معنا" subtitle="نحن هنا للإجابة على أسئلتك" />
      <div className="mx-auto grid max-w-5xl gap-5 px-4 py-14 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ icon: I, title, action, href, allowMailto }, index) => {
          const safeHref = sanitizeSafeUrl(href, {
            allowMailto: Boolean(allowMailto),
            allowRelative: false,
          });
          if (!safeHref) return null;
          return (
            <div
              key={title}
              className="card-lift card-glow rise group flex flex-col items-center rounded-3xl border border-border/80 bg-card/90 p-7 text-center shadow-sm backdrop-blur-sm"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand text-primary-foreground shadow-glow transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                <I className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-display text-lg font-extrabold">{title}</h3>
              <a
                href={safeHref}
                target={allowMailto ? undefined : "_blank"}
                rel={allowMailto ? undefined : "noopener noreferrer"}
                data-tactile="true"
                className="btn-brand mt-6 w-full text-sm"
              >
                {action}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          );
        })}
      </div>
    </>
  ),
});
