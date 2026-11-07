import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const fileUrl = z
  .string()
  .max(2000)
  .regex(/^(https:\/\/\S+|\/\S+\.pdf)$/, "Invalid file address");

const bookRowSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(120),
  file_url: fileUrl.nullable(),
});

export type Book = z.infer<typeof bookRowSchema>;

export const arabicBooksQueryKey = ["books", "arabic"] as const;

export async function fetchArabicBooks(): Promise<Book[]> {
  const { data, error } = await supabase
    .from("books")
    .select("id, title, file_url")
    .order("sort_order", { ascending: true });

  if (error) throw new Error("Could not load the books");
  return z.array(bookRowSchema).parse(data);
}
