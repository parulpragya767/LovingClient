import { Stack } from 'expo-router';
import React from 'react';

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="rituals-and-ai-chat" />
      <Stack.Screen name="starting-path" />
    </Stack>
  );
}
