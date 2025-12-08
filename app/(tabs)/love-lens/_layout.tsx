import { Stack } from 'expo-router';

export default function LoveLensLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{
          headerShown: false,
          title: 'Love Lens',
        }}
      />
    </Stack>
  );
}
