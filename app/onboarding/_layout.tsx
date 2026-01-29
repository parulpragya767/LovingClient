import LoadingState from '@/src/components/states/LoadingState';
import { useAuth } from '@/src/context/AuthContext';
import { Redirect, Stack } from 'expo-router';
import React from 'react';

export default function OnboardingLayout() {
  const { loading, sessionUser: user } = useAuth();

  if (loading) return <LoadingState text="Loading your profile..." />;

  if (!user) return <Redirect href="/auth" />;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
