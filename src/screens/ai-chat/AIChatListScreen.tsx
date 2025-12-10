import { ChatSession } from '@/src/components/ai-chat/ChatSession';
import { EmptyState } from '@/src/components/states/EmptyState';
import ErrorState from '@/src/components/states/ErrorState';
import LoadingState from '@/src/components/states/LoadingState';
import { Screen } from '@/src/components/ui/Screen';
import { useChatSessions } from '@/src/hooks/ai-chat/useChatSessions';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AIChatListScreen() {
  const { data: sessions, isLoading, error, refetch } = useChatSessions();

  if (isLoading) return <LoadingState text="Loading conversations..." />;
  if (error) return <ErrorState message="Failed to load conversations." onButtonPress={() => refetch()} />;

  return (
    <SafeAreaView className="flex-1" edges={['left', 'right']}>  
      <Screen className="px-0 pt-0">
        <FlatList
          data={sessions}
          keyExtractor={(item) => item.id}
          renderItem={({ item: session }) => (
            <ChatSession session={session}/>
          )}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View className="h-20" />}
          ListEmptyComponent={<EmptyState message="No conversations yet." />}
        />
      </Screen>
    </SafeAreaView>
  );
}
