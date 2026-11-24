import { Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { historyAvailability, nextHistoryBounds, type HistoryBounds } from "@/lib/page-history";
import { smoothScrollToTop } from "@/lib/smooth-scroll";

export function PageNavigation() {
  const router = useRouter();
  const [available, setAvailable] = useState({ back: false, forward: false });

  useEffect(() => {
    const index = router.history.location.state.__TSR_index;
    let bounds: HistoryBounds = { first: index, last: index };
    try {
      const saved = JSON.parse(sessionStorage.getItem("site-page-history") || "null");
      if (
        saved &&
        Number.isInteger(saved.first) &&
        Number.isInteger(saved.last) &&
        saved.first <= index &&
        saved.last >= index
      ) {
        bounds = saved;
      }
    } catch {
      /* Browsers may disable storage. */
    }
    setAvailable(historyAvailability(bounds, index));
    return router.history.subscribe(({ location, action }) => {
      const current = location.state.__TSR_index;
      bounds = nextHistoryBounds(bounds, current, action.type);
      setAvailable(historyAvailability(bounds, current));
      try {
        sessionStorage.setItem("site-page-history", JSON.stringify(bounds));
      } catch {
        /* Navigation works without storage. */
      }
    });
  }, [router]);

  return (
    <div className="border-b border-border/60 bg-background/85 backdrop-blur-sm">
      <nav
        aria-label="التنقّل بين الصفحات"
        className="mx-auto flex max-w-7xl items-center gap-2 px-3 py-2 sm:px-5"
      >
        <Button
          variant="outline"
          size="icon"
          aria-label="رجوع"
          title="رجوع"
          disabled={!available.back}
          onClick={() => router.history.back()}
          className="h-9 w-9 rounded-full"
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          aria-label="تقدّم"
          title="تقدّم"
          disabled={!available.forward}
          onClick={() => router.history.forward()}
          className="h-9 w-9 rounded-full"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" asChild className="h-9 rounded-full px-3">
          <Link
            to="/"
            onClick={smoothScrollToTop}
            aria-label="العودة للرئيسية"
            title="العودة للرئيسية"
          >
            <Home className="h-4 w-4 text-primary" />
            <span className="hidden text-xs font-bold sm:inline">الرئيسية</span>
          </Link>
        </Button>
      </nav>
    </div>
  );
}
