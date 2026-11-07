/*
# Books catalog: store a file address per book

1. Modified table
- `books.storage_path` is renamed to `books.file_url`. A book's file address can now be either a file uploaded to the `books` bucket (full https link) or a file shipped with the site (path starting with a slash).
- The old file-name rule is replaced by a rule that accepts only https links or site paths ending in .pdf.

2. Data
- The Islamic book row points to its PDF shipped with the site, so it keeps opening while the other books are still pending.

3. Security
- No change to access rules: visitors can only read the catalog, and nobody can write to it from the app.

4. Notes
- The table had no rows with file data before this change, so nothing is lost.
*/

ALTER TABLE public.books RENAME COLUMN storage_path TO file_url;

ALTER TABLE public.books DROP CONSTRAINT IF EXISTS books_storage_path_check;

UPDATE public.books
SET file_url = '/كتاب_الاسلامية_السادس_الاعدادي.pdf'
WHERE id = '6d1f2a10-0000-4000-8000-000000000001';

ALTER TABLE public.books ADD CONSTRAINT books_file_url_check
  CHECK (file_url IS NULL OR file_url ~ '^(https://[^[:space:]]+|/[^[:space:]]+\.pdf)$');
