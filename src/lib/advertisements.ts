import { z } from "zod";

export function telegramRegistrationUrl(value: string): string {
  const input = value.trim();
  const url = input.startsWith("https://") ? input : `https://t.me/${input.replace(/^@/, "").replace(/^(?:https?:\/\/)?t\.me\//, "")}`;
  if (!/^https:\/\/t\.me\/[A-Za-z0-9_+/-]+$/.test(url)) throw new Error("أدخل رابط قناة تليكرام أو يوزر صحيح");
  return url;
}

export const advertisementSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().trim().min(1).max(120),
  teacher_name: z.string().trim().min(1).max(100),
  subject: z.string().trim().min(1).max(80),
  body: z.string().trim().min(1).max(3000),
  telegram_url: z.string().transform(telegramRegistrationUrl),
  published: z.boolean(),
});

export type AdvertisementInput = z.input<typeof advertisementSchema>;
export type TeacherAdvertisement = z.output<typeof advertisementSchema> & { id: string; created_at: string };
export function canManageAdvertisements(hasAdminRole: unknown): boolean { return hasAdminRole === true; }