import { defaultHeaderOptions } from '@/src/components/ui/navigation/headerOptions';
import { Stack } from 'expo-router';

export default function LoveLensLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{
          headerShown: true,
          title: 'Love Lens',
          ...defaultHeaderOptions,
        }}
      />
    </Stack>
  );
}
