import { AppTheme } from "@/src/components/themes/AppTheme";
import { AppText } from '@/src/components/ui/AppText';
import { ConfirmationModal } from '@/src/components/ui/ConfirmationModal';
import { useChatActions } from '@/src/hooks/ai-chat/useChatActions';
import { useToast } from '@/src/hooks/ui/useToast';
import { ChatSession as ChatSessionModel } from '@/src/models/chat';
import { useChatStore } from '@/src/store/useChatStore';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

type ChatSessionProps = {
  session: ChatSessionModel;
};

export function ChatSession({ session }: ChatSessionProps) {
  const router = useRouter();
  const currentSessionId = useChatStore((s) => s.currentSessionId);
  const { selectConversation, deleteConversation } = useChatActions();
  const { showError, showSuccess } = useToast();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleSelect = async () => {
    await selectConversation(session.id);
    router.replace(`/ai-chat/chat?sessionId=${session.id}`);
  };

  const handleDelete = (e: any) => {
    e.stopPropagation();
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteConversation.mutateAsync(session.id);
      showSuccess("Conversation deleted successfully!");
    } catch (error) {
      showError("Failed to delete conversation");
    }
  };

  const isActiveSession = session.id === currentSessionId;

  return (
    <>
      <TouchableOpacity 
        onPress={handleSelect}
        className={`px-4 py-3 border-b border-border-strong flex-row items-center ${isActiveSession ? 'bg-surface-sunken' : 'bg-surface-elevated'}`}
      >
        <View className="flex-1">
          <AppText variant="body" numberOfLines={1}>
            {session.title}
          </AppText>
          <AppText variant="small" color="text-text-muted" className="mt-1" numberOfLines={1} ellipsizeMode="tail">
            {session.lastMessagePreview || 'No messages yet'}
          </AppText>
        </View>
        <TouchableOpacity onPress={handleDelete} className="p-1 ml-2">
          <MaterialIcons name="delete-outline" size={18} color={AppTheme.colors.text.muted} />
        </TouchableOpacity>
      </TouchableOpacity>
      
      <ConfirmationModal
        visible={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Conversation"
        message={`Are you sure you want to delete "${session.title}"?`}
        description="This action cannot be undone."
        confirmText="Delete"
      />
    </>
  );
}
