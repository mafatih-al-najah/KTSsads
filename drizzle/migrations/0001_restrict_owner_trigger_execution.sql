REVOKE ALL ON FUNCTION public.assign_site_owner() FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.assign_site_owner() TO service_role;