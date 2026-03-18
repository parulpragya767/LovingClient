import '@/global.css';
import { AuthProvider } from '@/src/context/AuthContext';
import { QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AppErrorBoundary } from '@/src/components/errors/AppErrorBoundary';
import { GlobalErrorRenderer } from '@/src/components/errors/GlobalErrorRenderer';
import { HeaderIconButton } from '@/src/components/ui/navigation/HeaderIconButton';
import { DefaultHeaderOptions } from '@/src/components/ui/navigation/HeaderOptions';
import { toastConfig } from '@/src/components/ui/ToastConfig';
import { DevToolsOverlay } from '@/src/devtools/DevToolsOverlay';
import { DevToolsTrigger } from '@/src/devtools/DevToolsTrigger';
import { queryClient } from '@/src/lib/reactQuery/queryClient';
import { Analytics } from '@/src/services/analytics';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from "react-native-toast-message";

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    Analytics.initialize();
  }, []);

  const [fontsLoaded] = useFonts({
    Manrope: require('@/assets/fonts/manrope/Manrope-Regular.ttf'),
    'Manrope-Medium': require('@/assets/fonts/manrope/Manrope-Medium.ttf'),
    'Manrope-SemiBold': require('@/assets/fonts/manrope/Manrope-SemiBold.ttf'),

    Nunito: require('@/assets/fonts/nunito/Nunito-Regular.ttf'),
    'Nunito-Medium': require('@/assets/fonts/nunito/Nunito-Medium.ttf'),
    'Nunito-SemiBold': require('@/assets/fonts/nunito/Nunito-SemiBold.ttf'),

    GeneralSans: require('@/assets/fonts/general-sans/GeneralSans-Regular.ttf'),
    'GeneralSans-Medium': require('@/assets/fonts/general-sans/GeneralSans-Medium.ttf'),
    'GeneralSans-SemiBold': require('@/assets/fonts/general-sans/GeneralSans-Semibold.ttf'),

    OpenSans: require('@/assets/fonts/open-sans/OpenSans-Regular.ttf'),
    'OpenSans-Medium': require('@/assets/fonts/open-sans/OpenSans-Medium.ttf'),
    'OpenSans-SemiBold': require('@/assets/fonts/open-sans/OpenSans-SemiBold.ttf'),

    Quicksand: require('@/assets/fonts/quicksand/Quicksand-Regular.ttf'),
    'Quicksand-Medium': require('@/assets/fonts/quicksand/Quicksand-Medium.ttf'),
    'Quicksand-SemiBold': require('@/assets/fonts/quicksand/Quicksand-SemiBold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AppErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <GlobalErrorRenderer>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <SafeAreaProvider>
                <Stack>
                  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                  <Stack.Screen name="auth" options={{ headerShown: false }} />
                  <Stack.Screen name="onboarding" options={{ headerShown: false }} />
                  <Stack.Screen name="settings" options={{ headerShown: false }} />
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

            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            <DevToolsOverlay />
            <DevToolsTrigger visible={true}/>
          </GlobalErrorRenderer>
        </AuthProvider>
      </QueryClientProvider>
    </AppErrorBoundary>
  );
 }
