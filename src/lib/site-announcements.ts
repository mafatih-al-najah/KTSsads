import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const secureLink = z
  .string()
  .max(2000)
  .regex(/^https:\/\/\S+$/, "Links must use https");

export const announcementSchema = z.object({
  id: z.string().uuid(),
  message: z.string().min(1).max(300),
  icon: z.string().min(1).max(8).nullable(),
  image_url: secureLink.nullable(),
  cta_label: z.string().min(1).max(40).nullable(),
  cta_url: secureLink.nullable(),
});

export type Announcement = z.infer<typeof announcementSchema>;

export async function fetchActiveAnnouncement(): Promise<Announcement | null> {
  const { data, error } = await supabase
    .from("site_announcements")
    .select("id, message, icon, image_url, cta_label, cta_url")
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw new Error("Could not load the announcement");
  if (!data) return null;
  return announcementSchema.parse(data);
}
