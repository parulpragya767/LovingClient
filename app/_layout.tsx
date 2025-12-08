import '@/global.css';
import { AuthProvider } from '@/src/context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Slot } from 'expo-router';
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
            <Slot />
            <StatusBar style="auto" />
            <Toast />
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </AuthProvider>

      {/* <ReactQueryDevtools initialIsOpen={false} /> */}

    </QueryClientProvider>
  );
}
