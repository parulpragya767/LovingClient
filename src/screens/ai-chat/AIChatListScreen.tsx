import { ChatSession } from '@/src/components/ai-chat/ChatSession';
import { EmptyState } from '@/src/components/states/EmptyState';
import ErrorState from '@/src/components/states/ErrorState';
import LoadingState from '@/src/components/states/LoadingState';
import { AppTheme } from '@/src/components/themes/AppTheme';
import { AppText } from '@/src/components/ui/AppText';
import { Button } from '@/src/components/ui/Button';
import { useChatActions } from '@/src/hooks/ai-chat/useChatActions';
import { useChatSessions } from '@/src/hooks/ai-chat/useChatSessions';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, TouchableWithoutFeedback, View } from 'react-native';
import Toast from "react-native-toast-message";

export default function AIChatListScreen() {
  const router = useRouter();
  const { data: sessions, isLoading, error, refetch } = useChatSessions();
  const { startNewConversation } = useChatActions();

  const handleNewChat = async () => {
    try {
      const sessionId = await startNewConversation();
      router.push(`/ai-chat/chat?sessionId=${sessionId}`);
    } catch (error) {
      Toast.show({
        type: "error", 
        text1: "Failed to start conversation",
      });
    }
  };

  if (isLoading) return <LoadingState text="Loading conversations..." />;
  if (error) return <ErrorState message="Failed to load conversations." onButtonPress={() => refetch()} />;

  return (
    <View className="flex-1 flex-row bg-black/40">
      <View className="w-[85%] max-w-[320px] bg-surface-screen h-full">
        {/* Drawer Header */}
        <View className="flex-row items-center justify-between px-4 py-3 border-b border-border">
          <AppText variant="subtitle">Conversations</AppText>

          <Button
            variant="secondary"
            icon={<MaterialIcons name="add" size={24} color={AppTheme.colors.action.secondary.text} />}
            onPress={handleNewChat}
          >
            New Chat
          </Button>
        </View>

        <FlatList
          data={sessions}
          keyExtractor={(item) => item.id}
          renderItem={({ item: session }) => (
            <ChatSession session={session}/>
          )}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<EmptyState message="No conversations yet." />}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      </View>

      {/* Backdrop */}
      <TouchableWithoutFeedback onPress={() => router.back()}>
        <View className="flex-1" />
      </TouchableWithoutFeedback>
    </View>
  );
}
