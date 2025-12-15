import { defaultHeaderOptions } from '@/src/components/ui/navigation/headerOptions';
import { Stack } from 'expo-router';

export default function RitualsLayout() {
  return (
    <Stack screenOptions={defaultHeaderOptions}>
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
        }}
      />
    </Stack>
  );
}
