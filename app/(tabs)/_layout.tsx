import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, Tabs } from 'expo-router';
import React from 'react';
import { TouchableOpacity } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ffd33d',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#25292e',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: true,
          headerStyle: { backgroundColor: '#25292e' },
          headerTintColor: '#ffd33d',
          headerLeft: () => (
            <Link href="/(modals)/user" asChild>
              <TouchableOpacity style={{ paddingHorizontal: 12 }}>
                <Ionicons name="person-circle-outline" size={26} color="#ffd33d" />
              </TouchableOpacity>
            </Link>
          ),
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
        name="ai-chat"
        options={{
          title: 'AI Chat',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline'} color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
}
