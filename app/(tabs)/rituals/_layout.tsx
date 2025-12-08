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
        name="(top-nav)" 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="[id]" 
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen 
        name="search"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
