import { AppTheme } from "@/src/components/themes/AppTheme";
import { AppText } from '@/src/components/ui/AppText';
import { useChatActions } from '@/src/hooks/ai-chat/useChatActions';
import { useToast } from '@/src/hooks/ui/useToast';
import { ChatSession as ChatSessionModel } from '@/src/models/chat';
import { useChatStore } from '@/src/store/useChatStore';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';

type ChatSessionProps = {
  session: ChatSessionModel;
};

export function ChatSession({ session }: ChatSessionProps) {
  const router = useRouter();
  const currentSessionId = useChatStore((s) => s.currentSessionId);
  const { selectConversation, deleteConversation } = useChatActions();
  const { showError } = useToast();

  const handleSelect = async () => {
    await selectConversation(session.id);
    router.replace(`/ai-chat/chat?sessionId=${session.id}`);
  };

  const handleDelete = async (e: any) => {
    e.stopPropagation();
    try {
      await deleteConversation.mutateAsync(session.id);
    } catch (error) {
      showError("Failed to delete conversation");
    }
  };

  const isActiveSession = session.id === currentSessionId;

  return (
    <TouchableOpacity 
      onPress={handleSelect}
      className={`p-4 border-b border-border-strong flex-row items-center ${isActiveSession ? 'bg-surface-sunken' : 'bg-surface-elevated'}`}
    >
      <View className="flex-1">
        <AppText variant="subtitle" numberOfLines={1}>
          {session.title}
        </AppText>
        <AppText variant="small" className="mt-1" numberOfLines={1} ellipsizeMode="tail">
          {session.messages[0]?.content || 'No messages yet'}
        </AppText>
      </View>
      <TouchableOpacity 
        onPress={handleDelete}
        className="p-1 ml-2"
      >
        <MaterialIcons name="delete-outline" size={20} color={AppTheme.colors.state.error} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
