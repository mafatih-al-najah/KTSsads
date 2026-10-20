import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useOwnerSession } from "@/components/OwnerSession";
import "@lovable.dev/cloud-auth-js/styles.css";

export function OwnerLogin() {
  const { recovering, finishRecovery } = useOwnerSession();
  const [mode, setMode] = useState<"login" | "signup" | "reset">("login");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setBusy(true); setError(""); setMessage("");
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "");
    const password = String(form.get("password") || "");
    const redirect = `${window.location.origin}/announcements`;
    try {
      if (recovering) { const result = await supabase.auth.updateUser({ password }); if (result.error) throw result.error; finishRecovery(); setMessage("تم تغيير كلمة المرور"); }
      else if (mode === "reset") { const result = await supabase.auth.resetPasswordForEmail(email, { redirectTo: redirect }); if (result.error) throw result.error; setMessage("إذا الإيميل مسجّل، يوصلك رابط لتغيير كلمة المرور"); }
      else if (mode === "signup") { const result = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: redirect } }); if (result.error) throw result.error; setMessage("راجع إيميلك واضغط رابط تأكيد الحساب"); }
      else { const result = await supabase.auth.signInWithPassword({ email, password }); if (result.error) throw result.error; }
    } catch { setError("تعذّر إكمال الطلب؛ تأكد من الإيميل وكلمة المرور وتأكيد حسابك"); }
    finally { setBusy(false); }
  };
  const social = async (provider: "google" | "lovable") => {
    setBusy(true); setError("");
    try { const result = await lovable.auth.signInWithOAuth(provider, { redirect_uri: `${window.location.origin}/announcements` }); if (result.error) setError("تعذّر تسجيل الدخول، حاول مرة ثانية"); }
    catch { setError("تعذّر تسجيل الدخول، حاول مرة ثانية"); }
    finally { setBusy(false); }
  };
  return <div className="mx-auto max-w-md space-y-5">
    <h2 className="text-xl font-bold">{recovering ? "كلمة مرور جديدة" : mode === "signup" ? "إنشاء حساب المالك" : mode === "reset" ? "استعادة كلمة المرور" : "دخول المالك"}</h2>
    <form onSubmit={submit} className="space-y-4">
      {!recovering && <label className="block text-sm font-bold">الإيميل<Input type="email" name="email" required dir="ltr" autoComplete="email" className="mt-2" /></label>}
      {(recovering || mode !== "reset") && <label className="block text-sm font-bold">كلمة المرور<Input type="password" name="password" required minLength={8} autoComplete={mode === "login" ? "current-password" : "new-password"} className="mt-2" /></label>}
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      {message && <p role="status" className="text-sm text-primary">{message}</p>}
      <Button type="submit" disabled={busy} className="w-full">{busy ? "انتظر…" : recovering ? "حفظ كلمة المرور" : mode === "reset" ? "إرسال رابط الاستعادة" : mode === "signup" ? "إنشاء الحساب" : "دخول"}</Button>
    </form>
    {!recovering && <>
      <div className="flex flex-wrap gap-2"><Button variant="link" disabled={busy} onClick={() => { setMode(mode === "signup" ? "login" : "signup"); setMessage(""); setError(""); }}>{mode === "signup" ? "عندي حساب" : "إنشاء حساب"}</Button><Button variant="link" disabled={busy} onClick={() => setMode(mode === "reset" ? "login" : "reset")}>{mode === "reset" ? "العودة للدخول" : "نسيت كلمة المرور"}</Button></div>
      <Button variant="outline" className="w-full" disabled={busy} onClick={() => social("google")}>الدخول بحساب Google</Button>
      <Button className="lovable-auth-button w-full" disabled={busy} onClick={() => social("lovable")}>Continue with Lovable</Button>
    </>}
  </div>;
}