import { z } from "zod";

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
  // The owner-login announcement table is not part of the current schema.
  // Do not query a removed table; teacher advertisements remain in site.ts.
  return null;
}
