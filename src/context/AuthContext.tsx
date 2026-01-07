import { supabase } from '@/src/lib/supabase';
import { userService } from '@/src/services/userService';
import { useUserStore } from '@/src/store/useUserStore';
import { Session, User } from '@supabase/supabase-js';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Platform } from 'react-native';

type AuthContextType = {
  session: Session | null;
  sessionUser: User | null;
  loading: boolean;
  signIn: (params: { email: string; password: string }) => Promise<{ error?: string }>;
  signUp: (params: { email: string; password: string }) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  resetPasswordForEmail: (params: { email: string }) => Promise<{ error?: string }>;
  updateUser: (params: { password: string }) => Promise<{ error?: string }>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function getAuthRedirect(path: string) {
  // Web (always HTTP/HTTPS)
  if (Platform.OS === 'web') {
    return __DEV__
      ? `http://localhost:8081/${path}`
      : `https://yourdomain.com/${path}`;
  }

  // Mobile - Expo dev
  if (__DEV__) {
    return `exp://localhost:8081/--/${path}`;
  }

  // Mobile - Production
  return `loving://${path}`;
}

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
    const init = async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.warn('Error getting session', error.message);
      }

      const sbSession = data.session ?? null;
      setSession(sbSession);
      await syncUserToBackend(sbSession?.user ?? null);
    } finally {
      setLoading(false);
    }
  };

    init();

    // Listen for login/logout/session refresh
    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession ?? null);
    });
    
    return () => {
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

  // Signup flow
  const signUp = async ({ email, password }: { email: string; password: string }) => {
    const { data, error } = await supabase.auth.signUp({ email, password, options: { 
      emailRedirectTo: getAuthRedirect('auth/callback/signup') 
    }});
    if (error) return { error: error.message };

    await syncUserToBackend(data.user);
    return {};
  };

  // Signout flow
  const signOut = async () => {
    clearUser();
    await supabase.auth.signOut();
  };

  // Forgot password flow
  const resetPasswordForEmail = async ({ email }: { email: string }) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: getAuthRedirect('auth/callback/recovery'),
    });
    if (error) return { error: error.message };
    return {};
  };

  // Update user info flow
  const updateUser = async ({ password }: { password: string }) => {
    const { error } = await supabase.auth.updateUser({ password: password });
    if (error) return { error: error.message };
    return {};
  };

  const value = useMemo<AuthContextType>(() => ({
    session,
    sessionUser: session?.user ?? null,
    loading,
    signIn,
    signUp,
    signOut,
    resetPasswordForEmail,
    updateUser,
  }), [session, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
