import { Link, type LinkProps } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/SiteShell";
import { smoothScrollToTop } from "@/lib/smooth-scroll";

export function BackLink({ label, ...props }: LinkProps & { label: string }) {
  return (
    <Link
      {...props}
      data-tactile="true"
      onClick={smoothScrollToTop}
      className="btn-surface ripple-surface group mb-6 inline-flex min-h-10 items-center gap-2 rounded-full border border-border/80 bg-card/85 px-4 py-2 text-sm font-bold text-muted-foreground shadow-sm hover:border-primary hover:text-primary"
    >
      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
      {label}
    </Link>
  );
}

export function NotFoundSection() {
  return (
    <>
      <PageHero title="القسم غير موجود" />
      <div className="mx-auto max-w-5xl px-4 py-10">
        <BackLink to="/notes" label="العودة إلى الملازم" />
      </div>
    </>
  );
}
