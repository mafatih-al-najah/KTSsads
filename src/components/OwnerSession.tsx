import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useRouter } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { ownerAdvertisementAccess } from "@/lib/advertisements.functions";

const OwnerContext = createContext<{ user: User | null; canManage: boolean; loading: boolean; recovering: boolean; finishRecovery: () => void; signOut: () => Promise<void> }>({ user: null, canManage: false, loading: true, recovering: false, finishRecovery: () => {}, signOut: async () => {} });
export const useOwnerSession = () => useContext(OwnerContext);

export function OwnerSession({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [canManage, setCanManage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [recovering, setRecovering] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const access = useServerFn(ownerAdvertisementAccess);
  useEffect(() => {
    let active = true;
    let revision = 0;
    const refresh = async (nextUser: User | null) => {
      const current = ++revision;
      setUser(nextUser);
      setCanManage(false);
      setLoading(true);
      if (nextUser) {
        try {
          const result = await access();
          if (active && current === revision) setCanManage(result.canManage);
        } catch { /* No edit controls without a verified role. */ }
      }
      if (active && current === revision) setLoading(false);
    };
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY") setRecovering(true);
      if (!["INITIAL_SESSION", "SIGNED_IN", "SIGNED_OUT", "USER_UPDATED", "PASSWORD_RECOVERY"].includes(event)) return;
      // Run outside the auth callback to avoid locking the auth client.
      setTimeout(() => { if (active) void refresh(session?.user ?? null); }, 0);
      if (event !== "INITIAL_SESSION" && event !== "PASSWORD_RECOVERY") {
        void router.invalidate();
        if (event !== "SIGNED_OUT") void queryClient.invalidateQueries();
      }
    });
    return () => { active = false; data.subscription.unsubscribe(); };
  }, [access, queryClient, router]);
  const signOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    await router.navigate({ to: "/announcements", replace: true });
  };
  return <OwnerContext.Provider value={{ user, canManage, loading, recovering, finishRecovery: () => setRecovering(false), signOut }}>{children}</OwnerContext.Provider>;
}