import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database } from "@/integrations/supabase/types";
import { advertisementSchema, canManageAdvertisements } from "@/lib/advertisements";

export const listTeacherAdvertisements = createServerFn({ method: "GET" }).handler(async () => {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
  const url = process.env["SUPABASE_URL"];
  if (!key || !url) throw new Error("تعذّر تحميل الإعلانات");
  const client = createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch: (input, init) => {
      const headers = new Headers(init?.headers);
      if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) headers.delete("Authorization");
      headers.set("apikey", key);
      return fetch(input, { ...init, headers });
    } },
  });
  const { data, error } = await client.from("teacher_advertisements").select("id,title,teacher_name,subject,body,telegram_url,published,created_at").eq("published", true).order("created_at", { ascending: false });
  if (error) throw new Error("تعذّر تحميل الإعلانات، حاول مرة ثانية");
  return data;
});

export const ownerAdvertisementAccess = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).handler(async ({ context }) => {
  const { data, error } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
  if (error) throw new Error("تعذّر التحقق من حسابك");
  return { canManage: canManageAdvertisements(data) };
});

export const listOwnerAdvertisements = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).handler(async ({ context }) => {
  const role = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
  if (role.error || !canManageAdvertisements(role.data)) throw new Error("إدارة الإعلانات متاحة لمالك الموقع فقط");
  const { data, error } = await context.supabase.from("teacher_advertisements").select("*").order("created_at", { ascending: false });
  if (error) throw new Error("تعذّر تحميل إعلاناتك");
  return data;
});

export const saveTeacherAdvertisement = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator(advertisementSchema).handler(async ({ data, context }) => {
  const role = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
  if (role.error || !canManageAdvertisements(role.data)) throw new Error("إدارة الإعلانات متاحة لمالك الموقع فقط");
  const { id, ...values } = data;
  const result = id ? await context.supabase.from("teacher_advertisements").update(values).eq("id", id).select("id").single() : await context.supabase.from("teacher_advertisements").insert(values).select("id").single();
  if (result.error) throw new Error("لم يُحفظ الإعلان، حاول مرة ثانية");
  return result.data;
});

export const deleteTeacherAdvertisement = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator(z.object({ id: z.string().uuid() })).handler(async ({ data, context }) => {
  const role = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
  if (role.error || !canManageAdvertisements(role.data)) throw new Error("إدارة الإعلانات متاحة لمالك الموقع فقط");
  const { error } = await context.supabase.from("teacher_advertisements").delete().eq("id", data.id);
  if (error) throw new Error("تعذّر حذف الإعلان");
  return { success: true };
});