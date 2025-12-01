import { ChatListHeader } from '@/src/components/ai-chat/AIChatListHeader';
import { useChatActions } from '@/src/hooks/ai-chat/useChatActions';
import { MaterialIcons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';

export default function AIChatLayout() {
  const router = useRouter();
  const { currentSession } = useChatActions();

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
          headerLeft: () => (
            <TouchableOpacity 
              onPress={handleChatListPress}
              className="p-2 mr-2 ml-2"
            >
              <MaterialIcons name="menu" size={24} color="#4B5563" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen 
        name="list" 
        options={{
          headerShown: true,
          header: () => (
            <ChatListHeader />
          ),
        }}
      />
      <Stack.Screen 
        name="chat" 
        options={{
          title: currentSession?.title || 'AI Chat',
          headerShown: true,
        }}
      />
    </Stack>
  );
}
