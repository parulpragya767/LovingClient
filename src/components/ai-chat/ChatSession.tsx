import { ThemedText } from '@/src/components/themes/themed-text';
import { useChatActions } from '@/src/hooks/ai-chat/useChatActions';
import { ChatSession as ChatSessionModel } from '@/src/models/chat';
import { useChatStore } from '@/src/store/useChatStore';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';
import Toast from "react-native-toast-message";

type ChatSessionProps = {
  session: ChatSessionModel;
};

export function ChatSession({ session }: ChatSessionProps) {
  const router = useRouter();
  const currentSessionId = useChatStore((s) => s.currentSessionId);
  const { selectConversation, deleteConversation } = useChatActions();

  const handleSelect = async () => {
    await selectConversation(session.id);
    router.push(`/ai-chat/chat?sessionId=${session.id}`);
  };

  const handleDelete = async (e: any) => {
    e.stopPropagation();
    try {
      await deleteConversation(session.id);
    } catch (error) {
      Toast.show({
        type: "error", 
        text1: "Failed to delete conversation",
        text2: "Please try again.",
      });
    }
  };

  const isActiveSession = session.id === currentSessionId;

  return (
    <TouchableOpacity 
      onPress={handleSelect}
      className={`p-4 border-b border-gray-100 flex-row items-center ${isActiveSession ? 'bg-purple-50' : 'bg-white'}`}
    >
      <View className="flex-1">
        <ThemedText className="font-medium text-gray-900" numberOfLines={1}>
          {session.title}
        </ThemedText>
        <ThemedText className="text-sm text-gray-500 mt-1" numberOfLines={1} ellipsizeMode="tail">
          {session.messages[0]?.content || 'No messages yet'}
        </ThemedText>
      </View>
      <TouchableOpacity 
        onPress={handleDelete}
        className="p-1 ml-2"
      >
        <MaterialIcons name="delete-outline" size={20} color="#EF4444" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
