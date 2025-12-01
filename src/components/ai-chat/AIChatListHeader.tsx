import { ThemedText } from '@/src/components/themes/themed-text';
import { useChatActions } from '@/src/hooks/ai-chat/useChatActions';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function ChatListHeader() {
  const router = useRouter();
  const {
    startNewConversation,
  } = useChatActions();

  const handleNewChat = async () => {
    await startNewConversation();
    router.push('/ai-chat/chat');
  };

  const navigateToChatHome = () => {
    router.push('/ai-chat');
  };

  return (
    <SafeAreaView className="bg-white" edges={['top', 'left', 'right']}>
      <View className="flex-row items-center justify-between px-4 py-2 border-b border-gray-200 bg-white">
        <ThemedText className="text-lg font-semibold">
          Conversations
        </ThemedText>
        
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={handleNewChat}
            className="flex-row items-center px-3 py-2 rounded-md bg-purple-50 mr-3"
          >
            <MaterialIcons name="add" size={20} color="#8B5CF6" />
            <ThemedText className="ml-1 text-purple-500 font-medium text-sm">New Chat</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={navigateToChatHome} 
            className="p-1"
          >
            <MaterialIcons name="close" size={24} color="#4B5563" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
