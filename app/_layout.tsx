import '@/global.css';
import { AuthProvider, useAuth } from '@/src/context/AuthContext';
import { useUserStore } from '@/src/store/useUserStore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import LoadingState from '@/src/components/states/LoadingState';
import { Redirect, Stack, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from "react-native-toast-message";

// Create a client
const queryClient = new QueryClient();

export const unstable_settings = {
  anchor: '(tabs)',
};

function RootLayoutNav() {
  const { loading, user } = useAuth();
  const pathname = usePathname();
  const { onboardingCompleted } = useUserStore();

  if (loading) return <LoadingState text="Loading your profile..." />;

  const isOnboarding = pathname?.startsWith("/onboarding");
  const isAuth = pathname?.startsWith("/auth");
  const isTabs = pathname?.startsWith("/(tabs)");

  // 1. If not logged in → only allow /auth
  if (!user) {
    if (!isAuth) return <Redirect href="/auth/login" />;
    return renderScreens();
  }

  // 2. Logged in but onboarding not done → force onboarding
  if (!onboardingCompleted) {
    if (!isOnboarding) return <Redirect href="/onboarding" />;
    return renderScreens();
  }

  // 3. Logged in AND onboarding done → force into tabs
  if (onboardingCompleted) {
    if (!isTabs) return <Redirect href="/(tabs)" />;
    return renderScreens();
  }

  return renderScreens();
}

function renderScreens() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(modals)" options={{ presentation: "modal", headerShown: false }} />
      <Stack.Screen name="auth/login" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaProvider>
            <RootLayoutNav />
            <StatusBar style="auto" />
            <Toast />
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </AuthProvider>

      {/* <ReactQueryDevtools initialIsOpen={false} /> */}

    </QueryClientProvider>
  );
}
