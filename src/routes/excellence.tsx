import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ExternalLink, Upload, Trash2, LogIn } from "lucide-react";
import { toast } from "sonner";
import { meta, PageHero } from "@/components/SiteShell";
import { Button } from "@/components/ui/button";
import { useOwnerSession } from "@/components/OwnerSession";
import { OwnerLogin } from "@/components/OwnerLogin";
import { supabase } from "@/integrations/supabase/client";

const PDF_URL = "/api/public/excellence-pdf";

function ExcellencePage() {
  const { user, canManage, signOut } = useOwnerSession();
  const [version, setVersion] = useState(0);
  const [exists, setExists] = useState<boolean | null>(null);
  const [busy, setBusy] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  useEffect(() => {
    fetch(PDF_URL, { method: "GET" }).then((r) => { setExists(r.ok); r.body?.cancel(); }).catch(() => setExists(false));
  }, [version]);

  const upload = async (file: File) => {
    if (file.type !== "application/pdf") return toast.error("اختر ملف PDF فقط");
    setBusy(true);
    const { error } = await supabase.storage.from("excellence").upload("excellence.pdf", file, { upsert: true, contentType: "application/pdf" });
    setBusy(false);
    if (error) return toast.error("ما نجح الرفع: " + error.message);
    toast.success("تم رفع الملف");
    setVersion((v) => v + 1);
  };

  const remove = async () => {
    setBusy(true);
    const { error } = await supabase.storage.from("excellence").remove(["excellence.pdf"]);
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("تم حذف الملف");
    setVersion((v) => v + 1);
  };

  const src = `${PDF_URL}?v=${version}`;

  return (
    <>
      <PageHero title="امتياز المتميزين 2026" subtitle="برنامج خاص للطلاب المتفوقين نحو المعدلات العليا" />
      <div className="mx-auto max-w-5xl px-4 py-10">
        {canManage && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <Button asChild disabled={busy}>
              <label className="cursor-pointer">
                <Upload />{busy ? "جارٍ الرفع…" : exists ? "استبدال ملف PDF" : "رفع ملف PDF"}
                <input type="file" accept="application/pdf" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) void upload(f); e.target.value = ""; }} />
              </label>
            </Button>
            {exists && <Button variant="outline" onClick={remove} disabled={busy}><Trash2 />حذف الملف</Button>}
            <Button variant="ghost" onClick={() => void signOut()}>خروج</Button>
          </div>
        )}
        {loginOpen && !user && <div className="mb-8 border-y py-8"><OwnerLogin /></div>}

        {exists === null ? (
          <p className="py-16 text-center text-muted-foreground">جارٍ التحميل…</p>
        ) : exists ? (
          <>
            <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
              <iframe key={version} src={src} title="ملف امتياز المتميزين 2026" className="h-[80vh] w-full" />
            </div>
            <div className="mt-4 text-center">
              <a href={src} target="_blank" rel="noreferrer" className="btn-brand"><ExternalLink className="h-4 w-4" /> فتح الملف بشاشة كاملة</a>
            </div>
          </>
        ) : (
          <p className="border-y py-16 text-center text-muted-foreground">سيتم نشر ملف الامتياز قريباً</p>
        )}

        {!user && (
          <div className="mt-10 text-center">
            <button onClick={() => setLoginOpen((o) => !o)} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><LogIn className="h-3 w-3" /> دخول المالك</button>
          </div>
        )}
      </div>
    </>
  );
}

export const Route = createFileRoute("/excellence")({
  head: () => meta("امتياز المتميزين 2026", "ملف امتياز المتميزين لدفعة 2026 معروض مباشرة على الموقع."),
  component: ExcellencePage,
});
