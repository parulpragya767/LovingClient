import { supabase } from '@/src/lib/supabase';
import { userService } from '@/src/services/userService';
import { useUserStore } from '@/src/store/useUserStore';
import { Session, User } from '@supabase/supabase-js';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (params: { email: string; password: string }) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const setUser = useUserStore(s => s.setUser);
  const clearUser = useUserStore(s => s.clearUser);

  // SYNC FUNCTION: sync Supabase → backend
  const syncUserToBackend = useCallback(async (sbUser: User | null) => {
    if (!sbUser) {
      clearUser();
      return;
    }
    try {
      const user = await userService.syncUser();
      setUser(user);
    } catch (err) {
      console.warn("User sync failed.", err);
    }
  }, [setUser, clearUser]);

  // INIT: Load stored session on app start
  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.warn('Error getting session', error.message);
        }
        if (!isMounted) return;
        setSession(data.session ?? null);
        // await syncUserToBackend(sbSession?.user ?? null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    init();

    // Listen for login/logout/session refresh
    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession ?? null);
      syncUserToBackend(newSession?.user ?? null);
    });
    
    return () => {
      isMounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  // Signin flow
  const signIn = async ({ email, password }: { email: string; password: string }) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };

    await syncUserToBackend(data.user);
    return {};
  };

  // Signout flow
  const signOut = async () => {
    clearUser();
    await supabase.auth.signOut();
  };

  const value = useMemo<AuthContextType>(() => ({
    session,
    user: session?.user ?? null,
    loading,
    signIn,
    signOut,
  }), [session, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
