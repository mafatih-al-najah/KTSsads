/*
# Restrict site_announcements to read-only access for visitors

1. Modified tables
- `site_announcements`: removed INSERT, UPDATE and DELETE privileges that were granted to the anon and authenticated roles.

2. Security
- Visitors can only SELECT rows. Existing RLS policy (active announcements only) is unchanged.
- The owner adds and edits announcements through the database dashboard, which uses a privileged role.
*/

REVOKE INSERT, UPDATE, DELETE ON public.site_announcements FROM anon, authenticated;
GRANT SELECT ON public.site_announcements TO anon, authenticated;
