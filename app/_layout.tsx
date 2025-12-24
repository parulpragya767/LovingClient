import '@/global.css';
import { AuthProvider } from '@/src/context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { HeaderIconButton } from '@/src/components/ui/navigation/HeaderIconButton';
import { DefaultHeaderOptions } from '@/src/components/ui/navigation/HeaderOptions';
import { toastConfig } from '@/src/components/ui/ToastConfig';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from "react-native-toast-message";

// Create a client
const queryClient = new QueryClient();

export default function RootLayout() {
  const router = useRouter();

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
              <Stack.Screen name="ai-chat/(modals)" options={{ headerShown: false }} />
              <Stack.Screen 
                name="love-lens/[loveType]" 
                options={{
                  title: 'Love Type Details',
                  gestureEnabled: false,
                  headerLeft: ({ tintColor }) => (
                    <HeaderIconButton
                      name="chevron-back"
                      color={tintColor}
                      onPress={() => router.back()}
                    />
                  ),
                  ...DefaultHeaderOptions,
                }}
              />
              <Stack.Screen 
                name="rituals/[id]" 
                options={{
                  title: "Ritual Details",
                  gestureEnabled: false,
                  headerLeft: ({ tintColor }) => (
                    <HeaderIconButton
                      name="chevron-back"
                      color={tintColor}
                      onPress={() => router.back()}
                    />
                  ),
                  ...DefaultHeaderOptions,
                }}
              />
              <Stack.Screen 
                name="rituals/pack/[id]" 
                options={{
                  headerShown: true,
                  gestureEnabled: false,
                  headerLeft: ({ tintColor }) => (
                    <HeaderIconButton
                      name="chevron-back"
                      color={tintColor}
                      onPress={() => router.back()}
                    />
                  ),
                  ...DefaultHeaderOptions,
                }}
              />
            </Stack>
            <StatusBar style="auto" />
            <Toast
              config={toastConfig}
              position="bottom"
              bottomOffset={64}
            />
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </AuthProvider>

      {/* <ReactQueryDevtools initialIsOpen={false} /> */}

    </QueryClientProvider>
  );
}
