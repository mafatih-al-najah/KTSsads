import { Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { historyAvailability, nextHistoryBounds, type HistoryBounds } from "@/lib/page-history";

export function PageNavigation() {
  const router = useRouter();
  const [available, setAvailable] = useState({ back: false, forward: false });
  useEffect(() => {
    const index = router.history.location.state.__TSR_index;
    let bounds: HistoryBounds = { first: index, last: index };
    try {
      const saved = JSON.parse(sessionStorage.getItem("site-page-history") || "null");
      if (saved && Number.isInteger(saved.first) && Number.isInteger(saved.last) && saved.first <= index && saved.last >= index) bounds = saved;
    } catch { /* Browsers may disable storage. */ }
    setAvailable(historyAvailability(bounds, index));
    return router.history.subscribe(({ location, action }) => {
      const current = location.state.__TSR_index;
      bounds = nextHistoryBounds(bounds, current, action.type);
      setAvailable(historyAvailability(bounds, current));
      try { sessionStorage.setItem("site-page-history", JSON.stringify(bounds)); } catch { /* Navigation works without storage. */ }
    });
  }, [router]);
  return (
    <div className="border-t bg-background">
      <nav aria-label="التنقّل بين الصفحات" className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-2">
        <Button variant="outline" size="icon" aria-label="رجوع" title="رجوع" disabled={!available.back} onClick={() => router.history.back()}><ArrowRight /></Button>
        <Button variant="outline" size="icon" aria-label="تقدّم" title="تقدّم" disabled={!available.forward} onClick={() => router.history.forward()}><ArrowLeft /></Button>
        <Button variant="ghost" size="icon" asChild><Link to="/" aria-label="العودة للرئيسية" title="العودة للرئيسية"><Home /></Link></Button>
      </nav>
    </div>
  );
}