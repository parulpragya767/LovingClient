import { Stack } from 'expo-router';

export default function RitualsLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="[id]" 
        options={{
          title: 'Ritual Details',
          headerBackTitle: 'Back',
        }}
      />
    </Stack>
  );
}
