import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useQueryClient } from "@tanstack/react-query";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { advertisementSchema, type TeacherAdvertisement } from "@/lib/advertisements";
import { saveTeacherAdvertisement } from "@/lib/advertisements.functions";

export function AdvertisementEditor({ advertisement, onClose }: { advertisement?: TeacherAdvertisement; onClose: () => void }) {
  const save = useServerFn(saveTeacherAdvertisement);
  const queryClient = useQueryClient();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const parsed = advertisementSchema.safeParse({ id: advertisement?.id, title: form.get("title"), teacher_name: form.get("teacher_name"), subject: form.get("subject"), body: form.get("body"), telegram_url: form.get("telegram_url"), published: form.get("published") === "on" });
    if (!parsed.success) { setError("أكمل الحقول وتأكد من رابط التليكرام"); return; }
    setBusy(true); setError("");
    try { await save({ data: parsed.data }); await queryClient.invalidateQueries({ queryKey: ["teacher-ads"] }); onClose(); }
    catch (e) { setError(e instanceof Error ? e.message : "تعذّر حفظ الإعلان"); }
    finally { setBusy(false); }
  };
  return <Dialog open onOpenChange={(open) => { if (!open && !busy) onClose(); }}>
    <DialogContent dir="rtl" className="max-h-[90dvh] w-[calc(100%-2rem)] overflow-y-auto text-right">
      <DialogTitle>{advertisement ? "تعديل الإعلان" : "إعلان مدرس جديد"}</DialogTitle>
      <DialogDescription>إعلانات مفاتيح النجاح للطلاب</DialogDescription>
      <form onSubmit={submit} className="space-y-4">
        <label className="block text-sm font-bold">عنوان الإعلان<Input name="title" required maxLength={120} defaultValue={advertisement?.title} className="mt-2" /></label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-bold">اسم المدرس<Input name="teacher_name" required maxLength={100} defaultValue={advertisement?.teacher_name} className="mt-2" /></label>
          <label className="block text-sm font-bold">المادة<Input name="subject" required maxLength={80} defaultValue={advertisement?.subject} className="mt-2" /></label>
        </div>
        <label className="block text-sm font-bold">تفاصيل الإعلان<textarea name="body" required maxLength={3000} rows={5} defaultValue={advertisement?.body} className="mt-2 w-full rounded-md border border-input bg-background p-3 font-normal focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" /></label>
        <label className="block text-sm font-bold">رابط قناة التليكرام أو اليوزر<Input name="telegram_url" required dir="ltr" defaultValue={advertisement?.telegram_url} placeholder="@teacher_username" className="mt-2" /></label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="published" defaultChecked={advertisement?.published ?? true} /> ظاهر للطلاب</label>
        {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
        <div className="flex gap-2"><Button type="submit" disabled={busy}><Save />{busy ? "جارٍ الحفظ…" : "حفظ الإعلان"}</Button><Button type="button" variant="outline" disabled={busy} onClick={onClose}>إلغاء</Button></div>
      </form>
    </DialogContent>
  </Dialog>;
}