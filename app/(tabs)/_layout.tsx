import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].background,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="love-lens"
        options={{
          title: 'Love Lens',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'heart' : 'heart-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="rituals"
        options={{
          title: 'Rituals',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'moon' : 'moon-outline'} color={color} size={24}/>
          ),
        }}
      />
      <Tabs.Screen
        name="ai-companion"
        options={{
          title: 'AI Companion',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline'} color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
}
