import { Stack } from 'expo-router';

export default function AICHatModalLayout() {
  return (
    <Stack
      screenOptions={{
        presentation: 'transparentModal',
        animation: 'slide_from_left',
        headerShown: false,
      }}
    >
      <Stack.Screen name="list" />
    </Stack>
  );
}
