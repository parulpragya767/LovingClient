import { ChatListHeader } from '@/src/components/ai-chat/AIChatListHeader';
import { AppTheme } from '@/src/components/themes/AppTheme';
import { defaultHeaderOptions } from '@/src/components/ui/navigation/headerOptions';
import { MaterialIcons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';

export default function AIChatLayout() {
  const router = useRouter();

  const handleChatListPress = () => {
    router.push('/ai-chat/list');
  };

  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{
          title: 'AI Companion',
          headerShown: true,
          ...defaultHeaderOptions,
          headerLeft: () => (
            <TouchableOpacity 
              onPress={handleChatListPress}
              className="p-2 mr-2 ml-2"
            >
              <MaterialIcons name="menu" size={24} color={AppTheme.colors.text.primary} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen 
        name="list" 
        options={{
          headerShown: true,
          ...defaultHeaderOptions,
          header: () => (
            <ChatListHeader />
          ),
        }}
      />
      <Stack.Screen 
        name="chat" 
        options={{
          headerShown: true,
          ...defaultHeaderOptions,
        }}
      />
    </Stack>
  );
}
