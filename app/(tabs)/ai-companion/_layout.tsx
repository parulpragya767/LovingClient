import { Stack } from 'expo-router';

export default function AICompanionLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{
          title: 'AI Companion',
          headerShown: false,
        }}
      />
    </Stack>
  );
}
