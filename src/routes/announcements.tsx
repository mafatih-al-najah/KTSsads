import { createFileRoute } from "@tanstack/react-router";
import { Megaphone, Send, Plus, Pencil, Trash2, LogOut } from "lucide-react";
import { useState } from "react";
import { queryOptions, useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { meta, PageHero } from "@/components/SiteShell";
import { announcements } from "@/data/site";
import { Button } from "@/components/ui/button";
import { useOwnerSession } from "@/components/OwnerSession";
import { OwnerLogin } from "@/components/OwnerLogin";
import { AdvertisementEditor } from "@/components/AdvertisementEditor";
import { listTeacherAdvertisements, listOwnerAdvertisements, deleteTeacherAdvertisement } from "@/lib/advertisements.functions";
import type { TeacherAdvertisement } from "@/lib/advertisements";

const publicAdsOptions = queryOptions({ queryKey: ["teacher-ads", "public"], queryFn: () => listTeacherAdvertisements() });

export const Route = createFileRoute("/announcements")({
  head: () => meta("الإعلانات", "إعلانات المدرسين والتسجيل عبر التليكرام وآخر أخبار قناة مفاتيح النجاح."),
  loader: ({ context }) => context.queryClient.ensureQueryData(publicAdsOptions),
  component: Announcements,
});

function Announcements() {
  const { data: publicAds } = useSuspenseQuery(publicAdsOptions);
  const { user, canManage, loading, recovering, signOut } = useOwnerSession();
  const ownerList = useServerFn(listOwnerAdvertisements);
  const remove = useServerFn(deleteTeacherAdvertisement);
  const queryClient = useQueryClient();
  const ownerAds = useQuery({ queryKey: ["teacher-ads", "owner", user?.id], queryFn: () => ownerList(), enabled: canManage });
  const [loginOpen, setLoginOpen] = useState(false);
  const [editor, setEditor] = useState<TeacherAdvertisement | "new" | null>(null);
  const [error, setError] = useState("");
  const [removing, setRemoving] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const ads = canManage ? ownerAds.data ?? [] : publicAds;
  const deleteAd = async (id: string) => {
    setRemoving(id); setError("");
    try { await remove({ data: { id } }); await queryClient.invalidateQueries({ queryKey: ["teacher-ads"] }); setDeleteId(null); }
    catch (e) { setError(e instanceof Error ? e.message : "تعذّر حذف الإعلان"); }
    finally { setRemoving(null); }
  };
  return (
    <>
      <PageHero title="الإعلانات" subtitle="إعلانات المدرسين وآخر أخبار مفاتيح النجاح" />
      <section className="mx-auto max-w-5xl px-4 py-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-black">إعلانات المدرسين</h2>
          <div className="flex gap-2">
            {canManage && <Button onClick={() => setEditor("new")}><Plus />إضافة إعلان</Button>}
            {user ? <Button variant="outline" disabled={loading} onClick={() => { void signOut(); }}><LogOut />تسجيل خروج</Button> : <Button variant="outline" disabled={loading} onClick={() => setLoginOpen(!loginOpen)}>{loginOpen ? "إغلاق الدخول" : "دخول المالك"}</Button>}
          </div>
        </div>
        {(recovering || (loginOpen && !user)) && <div className="mb-8 border-y py-8"><OwnerLogin /></div>}
        {user && !loading && !canManage && <p role="status" className="mb-6 text-sm text-muted-foreground">هذا الحساب لا يملك صلاحية إدارة الإعلانات.</p>}
        {(error || ownerAds.isError) && <p role="alert" className="mb-4 text-destructive">{error || "تعذّر تحميل إعلاناتك"}</p>}
        {canManage && ownerAds.isPending ? <p role="status" className="py-10 text-center text-muted-foreground">جارٍ تحميل إعلاناتك…</p> : ads.length === 0 ? <p className="border-y py-12 text-center text-muted-foreground">لا توجد إعلانات مدرسين منشورة حالياً</p> : <div className="grid gap-5 md:grid-cols-2">
          {ads.map((ad) => <article key={ad.id} className="flex flex-col rounded-lg border bg-card p-6">
            <div className="flex items-center justify-between gap-3"><span className="text-sm font-bold text-primary">{ad.subject}</span><span className="text-xs text-muted-foreground">{ad.published ? "" : "غير منشور"}</span></div>
            <h3 className="mt-3 break-words text-xl font-bold">{ad.title}</h3>
            <p className="mt-2 font-semibold">{ad.teacher_name}</p>
            <p className="mb-5 mt-4 whitespace-pre-wrap break-words text-muted-foreground">{ad.body}</p>
            <Button asChild className="mt-auto"><a href={ad.telegram_url} target="_blank" rel="noreferrer"><Send />التسجيل لدى المدرس</a></Button>
            {canManage && <div className="mt-4 flex flex-wrap gap-2 border-t pt-4">
              <Button variant="outline" size="icon" aria-label={`تعديل ${ad.title}`} title="تعديل الإعلان" onClick={() => setEditor(ad)}><Pencil /></Button>
              {deleteId === ad.id ? <><Button variant="destructive" disabled={removing === ad.id} onClick={() => { void deleteAd(ad.id); }}>تأكيد الحذف</Button><Button variant="outline" onClick={() => setDeleteId(null)}>إلغاء</Button></> : <Button variant="outline" size="icon" aria-label={`حذف ${ad.title}`} title="حذف الإعلان" onClick={() => setDeleteId(ad.id)}><Trash2 /></Button>}
            </div>}
          </article>)}
        </div>}
      </section>
      <section className="mx-auto max-w-5xl space-y-5 px-4 py-10">
        <h2 className="text-2xl font-black">أخبار القناة</h2>
        {announcements.map((a) => (
          <article key={a.title} className="card-lift flex gap-4 rounded-2xl border bg-card p-6">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground"><Megaphone className="h-5 w-5" /></span>
            <div>
              <time className="text-xs font-semibold text-primary">{a.date}</time>
              <h3 className="mt-1 text-lg font-bold">{a.title}</h3>
              <p className="mt-2 text-muted-foreground">{a.body}</p>
            </div>
          </article>
        ))}
      </section>
      {editor && <AdvertisementEditor advertisement={editor === "new" ? undefined : editor} onClose={() => setEditor(null)} />}
    </>
  );
}
