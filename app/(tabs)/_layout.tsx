import LoadingState from '@/src/components/states/LoadingState';
import { HeaderIconButton } from '@/src/components/ui/navigation/HeaderIconButton';
import { DefaultHeaderOptions } from '@/src/components/ui/navigation/HeaderOptions';
import { TabScreenOptions } from '@/src/components/ui/navigation/TabOptions';
import { useAuth } from '@/src/context/AuthContext';
import { useUserStore } from '@/src/store/useUserStore';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Redirect, Tabs, useRouter } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  const { loading, user } = useAuth();
  const { onboardingCompleted } = useUserStore();
  const router = useRouter();

  if (loading) return <LoadingState text="Loading your profile..." />;

  if (!user) return <Redirect href="/auth/login" />;

  if (!onboardingCompleted) return <Redirect href="/onboarding" />;

  return (
    <Tabs screenOptions={TabScreenOptions}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Loving',
          headerShown: true,
          headerLeft: ({ tintColor }) => (
            <HeaderIconButton
              name="person-circle-outline"
              color={tintColor}
              onPress={() => router.push('/(modals)/user')}
            />
          ),
          ...DefaultHeaderOptions,
          popToTopOnBlur: true,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="love-lens"
        options={{
          title: 'Love Lens',
          popToTopOnBlur: true,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'heart' : 'heart-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="rituals"
        options={{
          title: 'Rituals',
          popToTopOnBlur: true,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'moon' : 'moon-outline'} color={color} size={24}/>
          ),
        }}
      />
      <Tabs.Screen
        name="ai-chat"
        options={{
          title: 'AI Chat',
          popToTopOnBlur: true,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline'} color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
}
