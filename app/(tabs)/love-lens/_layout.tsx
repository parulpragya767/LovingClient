import { DefaultHeaderOptions } from '@/src/components/ui/navigation/HeaderOptions';
import { Stack } from 'expo-router';

export default function LoveLensLayout() {
  return (
    <Stack screenOptions={DefaultHeaderOptions}>
      <Stack.Screen 
        name="index" 
        options={{
          title: 'Love Lens',
        }}
      />
    </Stack>
  );
}
