import { defaultHeaderOptions, defaultStackOptions } from '@/src/components/ui/navigation/headerOptions';
import { Stack } from 'expo-router';

export default function RitualsLayout() {
  return (
    <Stack screenOptions={defaultStackOptions}>
      <Stack.Screen 
        name="(top-nav)" 
        options={{ 
          headerShown: true,
          title: 'Rituals',
          ...defaultHeaderOptions 
        }} 
      />
      <Stack.Screen 
        name="search"
        options={{
          headerShown: true,
          title: "Filter rituals",
          headerBackTitle: 'Back',
          ...defaultHeaderOptions,
        }}
      />
    </Stack>
  );
}
