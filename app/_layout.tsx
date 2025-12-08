import '@/global.css';
import { AuthProvider } from '@/src/context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from "react-native-toast-message";

// Create a client
const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="(modals)" options={{ presentation: "modal", headerShown: false }} />
              <Stack.Screen name="auth/login" options={{ headerShown: false }} />
              <Stack.Screen name="onboarding" options={{ headerShown: false }} />
              <Stack.Screen 
                name="love-lens/[loveType]" 
                options={{
                  title: 'Love Type Details',
                  headerBackTitle: 'Back',
                }}
              />
              <Stack.Screen 
                name="rituals/[id]" 
                options={{
                  headerShown: true,
                }}
              />
              <Stack.Screen 
                name="rituals/pack/[id]" 
                options={{
                  headerShown: true,
                }}
              />
            </Stack>
            <StatusBar style="auto" />
            <Toast />
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </AuthProvider>

      {/* <ReactQueryDevtools initialIsOpen={false} /> */}

    </QueryClientProvider>
  );
}
