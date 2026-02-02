import { ChatSession } from '@/src/components/ai-chat/ChatSession';
import { EmptyState } from '@/src/components/states/EmptyState';
import ErrorState from '@/src/components/states/ErrorState';
import LoadingState from '@/src/components/states/LoadingState';
import { AppText } from '@/src/components/ui/AppText';
import { Button } from '@/src/components/ui/Button';
import { SideDrawer } from '@/src/components/ui/SideDrawer';
import { useChatActions } from '@/src/hooks/ai-chat/useChatActions';
import { useChatSessions } from '@/src/hooks/ai-chat/useChatSessions';
import { useToast } from '@/src/hooks/ui/useToast';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AIChatListScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { data: sessions, isLoading, error, refetch } = useChatSessions();
  const { startNewConversation } = useChatActions();
  const { showError } = useToast();

  const handleNewChat = async () => {
    try {
      const sessionId = await startNewConversation.mutateAsync();
      router.push(`/ai-chat/chat?sessionId=${sessionId}`);
    } catch (error) {
      showError("Failed to start conversation");
    }
  };

  return (
    <SideDrawer onClose={() => router.back()}>
      {/* Header */}
      <View className="flex-row items-center justify-between pl-4 pr-6 py-3 border-b border-border">
        <AppText variant="heading">Conversations</AppText>
        <Button variant="ghost" onPress={handleNewChat}>+ New Chat</Button>
      </View>

      {isLoading ? (
        <LoadingState text="Loading conversations..." />
      ) : error ? (
        <ErrorState message="Failed to load conversations." onButtonPress={() => refetch()} />
      ) : (
        <FlatList
          data={sessions}
          keyExtractor={(item) => item.id}
          renderItem={({ item: session }) => (
            <ChatSession session={session}/>
          )}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<EmptyState message={`No conversations yet.\nStart one to begin.`} />}
          contentContainerStyle={{ paddingBottom: insets.bottom + 16 }}
        />
      )}
    </SideDrawer>
  );
}
