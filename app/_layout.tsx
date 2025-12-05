import '@/global.css';
import { AuthProvider, useAuth } from '@/src/context/AuthContext';
import { getHasOnboarded } from '@/src/lib/onboarding';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Redirect, Stack, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
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
  const [hasOnboarded, setHasOnboarded] = useState<boolean | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      const v = await getHasOnboarded();
      if (active) {
        setHasOnboarded(v);
        setIsReady(true);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const isOnOnboarding = pathname?.startsWith('/onboarding');
  const isAuthPage = pathname?.startsWith('/auth');
  const isTabsPage = pathname?.startsWith('/(tabs)');

  // Don't render anything until we've checked the onboarding status
  if (loading || !isReady) {
    return null;
  }

  // Handle redirects
  if (!user && !isAuthPage && !isOnOnboarding) {
    return <Redirect href="/auth/login" />;
  }

  if (user && !hasOnboarded && !isOnOnboarding) {
    return <Redirect href="/onboarding" />;
  }

  if (user && hasOnboarded && !isTabsPage && !isOnOnboarding) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(modals)" options={{ presentation: 'modal', headerShown: false }} />
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
