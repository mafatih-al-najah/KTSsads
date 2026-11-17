import { Link, type LinkProps } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/SiteShell";

export function BackLink({ label, ...props }: LinkProps & { label: string }) {
  return (
    <Link
      {...props}
      className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-primary"
    >
      <ArrowRight className="h-4 w-4" />
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
