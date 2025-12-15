import { HeaderIconButton } from '@/src/components/ui/navigation/HeaderIconButton';
import { DefaultHeaderOptions } from '@/src/components/ui/navigation/HeaderOptions';
import { Stack, useRouter } from 'expo-router';

export default function AIChatLayout() {
  const router = useRouter();

  const handleChatListPress = () => {
    router.push('/ai-chat/list');
  };

  return (
    <Stack screenOptions={DefaultHeaderOptions}>
      <Stack.Screen 
        name="index" 
        options={{
          title: 'AI Companion',
          headerLeft: ({ tintColor }) => (
            <HeaderIconButton
              name="menu"
              color={tintColor}
              onPress={handleChatListPress}
            />
          ),
        }}
      />
      <Stack.Screen 
        name="list" 
        options={{
          title: 'Conversations',
          headerTitleAlign: 'left',
        }}
      />
      <Stack.Screen 
        name="chat" 
        options={{
          title: 'AI Chat',
        }}
      />
    </Stack>
  );
}
