import { HeaderIconButton } from '@/src/components/ui/navigation/HeaderIconButton';
import { DefaultHeaderOptions } from '@/src/components/ui/navigation/HeaderOptions';
import { Stack, useRouter } from 'expo-router';

export default function RitualsLayout() {
  const router = useRouter();
  
  return (
    <Stack screenOptions={DefaultHeaderOptions}>
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
          gestureEnabled: false,
          headerLeft: ({ tintColor }) => (
            <HeaderIconButton
              name="chevron-back"
              color={tintColor}
              onPress={() => router.back()}
            />
          ),
        }}
      />
    </Stack>
  );
}
