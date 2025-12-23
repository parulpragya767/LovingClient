import { DefaultHeaderOptions } from '@/src/components/ui/navigation/HeaderOptions';
import { Stack } from 'expo-router';

export default function RitualsLayout() {
  return (
    <Stack screenOptions={DefaultHeaderOptions}>
      <Stack.Screen 
        name="(top-nav)" 
        options={{ 
          title: 'Rituals',
        }} 
      />
      <Stack.Screen 
        name="search"
        options={{
          title: "Filter rituals",
          headerBackTitle: 'Back',
          gestureEnabled: false,
        }}
      />
    </Stack>
  );
}
