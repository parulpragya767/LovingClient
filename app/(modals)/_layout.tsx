import { Stack } from 'expo-router';

export default function ModalGroupLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        presentation: 'modal',
      }}
    />
  );
}
