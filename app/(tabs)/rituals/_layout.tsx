import { Stack } from 'expo-router';
import { Platform } from 'react-native';

export default function RitualsLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FFFFFF',
        },
        headerTintColor: '#4B5563',
        headerTitleStyle: {
          fontWeight: '600',
        },
        headerBackTitle: 'Back',
        ...(Platform.OS === 'ios' ? { headerBackTitleVisible: true } : {}),
      }}
    >
      <Stack.Screen 
        name="index"
        options={{ 
          title: 'Current Rituals',
          headerShown: false,
        }} 
      />
      <Stack.Screen 
        name="current"
        options={{ 
          title: 'Current',
          headerShown: false,
        }} 
      />
      <Stack.Screen 
        name="all-rituals"
        options={{
          title: 'All Rituals',
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="history"
        options={{
          title: 'History',
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="[id]" 
        options={{
          title: 'Ritual Details',
        }}
      />
      <Stack.Screen 
        name="pack/[id]" 
        options={{
          title: 'Ritual Pack',
        }}
      />
      <Stack.Screen 
        name="suggestions" 
        options={{ 
          title: 'Suggestions',
        }} 
      />
      <Stack.Screen name="search" options={{ title: 'Search' }} />
    </Stack>
  );
}
