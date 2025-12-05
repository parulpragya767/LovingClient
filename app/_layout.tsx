import '@/global.css';
import { AuthProvider, useAuth } from '@/src/context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Redirect, Stack } from 'expo-router';
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
  return (
    <>
      {!loading && (
        <Redirect href={user ? '/(tabs)' : '/auth/login'} />
      )}
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(modals)" options={{ presentation: 'modal', headerShown: false }} />
        <Stack.Screen name="auth/login" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      </Stack>
    </>
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
