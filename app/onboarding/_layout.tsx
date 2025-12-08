import LoadingState from '@/src/components/states/LoadingState';
import { useAuth } from '@/src/context/AuthContext';
import { useUserStore } from '@/src/store/useUserStore';
import { Redirect, Stack } from 'expo-router';
import React from 'react';

export default function OnboardingLayout() {
  const { loading, user } = useAuth();
  const { onboardingCompleted } = useUserStore();

  if (loading) return <LoadingState text="Loading your profile..." />;

  if (!user) return <Redirect href="/auth/login" />;

  if (onboardingCompleted) return <Redirect href="/" />;
    
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="rituals-and-ai-chat" />
      <Stack.Screen name="starting-path" />
    </Stack>
  );
}
