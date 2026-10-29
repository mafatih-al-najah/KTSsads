import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import { fetchActiveAnnouncement } from "@/lib/site-announcements";

const DISMISSED_KEY = "dismissed-announcement";

export function AnnouncementBar() {
  const { data } = useQuery({
    queryKey: ["site-announcement"],
    queryFn: fetchActiveAnnouncement,
    staleTime: 5 * 60_000,
    retry: 1,
  });
  const [dismissedId, setDismissedId] = useState<string | null>(null);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    try {
      setDismissedId(sessionStorage.getItem(DISMISSED_KEY));
    } catch {
      setDismissedId(null);
    }
  }, []);

  if (!data || data.id === dismissedId) return null;

  const dismiss = () => {
    setDismissedId(data.id);
    try {
      sessionStorage.setItem(DISMISSED_KEY, data.id);
    } catch {
      /* Dismissal only lasts for this page view when storage is unavailable. */
    }
  };

  const showImage = Boolean(data.image_url) && !imageFailed;

  return (
    <div role="region" aria-label="إعلان" className="announce-in border-b bg-teal text-teal-foreground">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2.5 text-sm">
        {showImage ? (
          <img
            src={data.image_url ?? undefined}
            alt=""
            referrerPolicy="no-referrer"
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="h-8 w-8 shrink-0 rounded-full object-cover ring-2 ring-accent/60"
          />
        ) : data.icon ? (
          <span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center text-lg">{data.icon}</span>
        ) : null}
        <p className="min-w-0 flex-1 font-semibold leading-snug">{data.message}</p>
        {data.cta_url && data.cta_label && (
          <a
            href={data.cta_url}
            target="_blank"
            rel="noreferrer"
            className="hidden shrink-0 rounded-full bg-accent px-4 py-1.5 text-xs font-bold text-accent-foreground transition hover:-translate-y-0.5 sm:inline-flex"
          >
            {data.cta_label}
          </a>
        )}
        <button
          type="button"
          onClick={dismiss}
          aria-label="إغلاق الإعلان"
          title="إغلاق الإعلان"
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full transition hover:bg-white/10"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      {data.cta_url && data.cta_label && (
        <div className="px-4 pb-2.5 sm:hidden">
          <a
            href={data.cta_url}
            target="_blank"
            rel="noreferrer"
            className="block rounded-full bg-accent px-4 py-2 text-center text-xs font-bold text-accent-foreground"
          >
            {data.cta_label}
          </a>
        </div>
      )}
    </div>
  );
}
