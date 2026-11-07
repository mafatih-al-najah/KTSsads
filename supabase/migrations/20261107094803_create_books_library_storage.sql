/*
# Books library: storage bucket and catalog table

1. New storage
- `books` bucket for book PDF files. Public so the reader and download links work for every visitor.
- Maximum file size 50 MB per file. Only PDF files are accepted.

2. New table
- `books`: the list of books shown on the Arabic curriculum page.
  - `id` (uuid, primary key, fixed values for seeded rows)
  - `title` (text, the book name shown to visitors)
  - `storage_path` (text, file name inside the `books` bucket; empty until the file is uploaded)
  - `sort_order` (integer, display order)
  - `created_at` (timestamp)

3. Security
- Row level security is enabled on `books`. Visitors (anonymous and signed-in) can only read rows; the catalog is intentionally public.
- No client can insert, update, or delete rows or files. Uploads are done by the site owner through the server (service role), which bypasses these rules.
- The bucket has a read policy for listing; files are readable by URL because the bucket is public.

4. Notes
- Seeded rows are the eight Arabic curriculum books. Rows without a file keep `storage_path` empty and show "coming soon" in the app.
*/

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('books', 'books', true, 52428800, ARRAY['application/pdf'])
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

DROP POLICY IF EXISTS "Anyone can list book files" ON storage.objects;
CREATE POLICY "Anyone can list book files" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'books');

CREATE TABLE IF NOT EXISTS public.books (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL CHECK (char_length(title) BETWEEN 1 AND 120),
  storage_path text CHECK (storage_path IS NULL OR storage_path ~ '^[A-Za-z0-9._-]+\.pdf$'),
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON public.books TO anon, authenticated;

DROP POLICY IF EXISTS "Anyone can read the books catalog" ON public.books;
CREATE POLICY "Anyone can read the books catalog" ON public.books
  FOR SELECT TO anon, authenticated
  USING (true);

INSERT INTO public.books (id, title, storage_path, sort_order) VALUES
  ('6d1f2a10-0000-4000-8000-000000000001', 'كتاب الإسلامية 2026', 'islamiyya-2026.pdf', 1),
  ('6d1f2a10-0000-4000-8000-000000000002', 'كتاب العربي 2026', NULL, 2),
  ('6d1f2a10-0000-4000-8000-000000000003', 'كتاب الإنكليزي 2026', NULL, 3),
  ('6d1f2a10-0000-4000-8000-000000000004', 'كتاب الفيزياء 2026', NULL, 4),
  ('6d1f2a10-0000-4000-8000-000000000005', 'كتاب الكيمياء 2026', NULL, 5),
  ('6d1f2a10-0000-4000-8000-000000000006', 'كتاب الأحياء 2026', NULL, 6),
  ('6d1f2a10-0000-4000-8000-000000000007', 'كتاب الرياضيات 2026', NULL, 7),
  ('6d1f2a10-0000-4000-8000-000000000008', 'كتاب الفرنسي 2026 (للمتوفقين)', NULL, 8)
ON CONFLICT (id) DO NOTHING;
