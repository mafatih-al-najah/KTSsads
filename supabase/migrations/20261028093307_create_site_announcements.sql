/*
# Create site announcements (announcement bar)

1. New Tables
- `site_announcements`
  - `id` (uuid, primary key)
  - `message` (text, the announcement text, 1 to 300 characters)
  - `icon` (text, optional short emoji or symbol shown beside the message)
  - `image_url` (text, optional secure https image link shown beside the message)
  - `cta_label` and `cta_url` (optional button text and secure https link; both or neither)
  - `is_active` (boolean, only active rows are shown on the site; defaults to false)
  - `created_at` (timestamp, the newest active announcement is shown first)

2. Security
- Row level security is enabled on `site_announcements`.
- Visitors (anon and signed-in roles) can only SELECT rows where `is_active` is true.
- No insert, update, or delete access is granted to website visitors. Content is managed by the site owner through the database dashboard.

3. Notes
- Only the newest active announcement is displayed.
- Links and images must start with https:// to be accepted by the database.
*/

CREATE TABLE IF NOT EXISTS public.site_announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  message text NOT NULL CHECK (char_length(message) BETWEEN 1 AND 300),
  icon text CHECK (icon IS NULL OR char_length(icon) BETWEEN 1 AND 8),
  image_url text CHECK (image_url IS NULL OR image_url ~ '^https://[^[:space:]]+$'),
  cta_label text CHECK (cta_label IS NULL OR char_length(cta_label) BETWEEN 1 AND 40),
  cta_url text CHECK (cta_url IS NULL OR cta_url ~ '^https://[^[:space:]]+$'),
  is_active boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK ((cta_label IS NULL) = (cta_url IS NULL))
);

CREATE INDEX IF NOT EXISTS site_announcements_active_created_idx
  ON public.site_announcements (created_at DESC)
  WHERE is_active;

ALTER TABLE public.site_announcements ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON public.site_announcements TO anon, authenticated;

DROP POLICY IF EXISTS "read_active_announcements" ON public.site_announcements;
CREATE POLICY "read_active_announcements"
ON public.site_announcements FOR SELECT
TO anon, authenticated
USING (is_active = true);
