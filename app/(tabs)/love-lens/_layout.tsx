import { defaultHeaderOptions } from '@/src/components/ui/navigation/headerOptions';
import { Stack } from 'expo-router';

export default function LoveLensLayout() {
  return (
    <Stack screenOptions={defaultHeaderOptions}>
      <Stack.Screen 
        name="index" 
        options={{
          title: 'Love Lens',
        }}
      />
    </Stack>
  );
}
