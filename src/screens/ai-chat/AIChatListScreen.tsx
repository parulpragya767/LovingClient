import { ChatSession } from '@/src/components/ai-chat/ChatSession';
import { EmptyState } from '@/src/components/states/EmptyState';
import ErrorState from '@/src/components/states/ErrorState';
import LoadingState from '@/src/components/states/LoadingState';
import { AppText } from '@/src/components/ui/AppText';
import { useChatActions } from '@/src/hooks/ai-chat/useChatActions';
import { useChatSessions } from '@/src/hooks/ai-chat/useChatSessions';
import { MaterialIcons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Pressable, View } from 'react-native';
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

  const navigateToChatHome = () => {
    router.push('/ai-chat');
  };
  
  if (isLoading) return <LoadingState text="Loading conversations..." />;
  if (error) return <ErrorState message="Failed to load conversations." onButtonPress={() => refetch()} />;

  return (
    <>  
      <Stack.Screen
        options={{
          headerRight: () => (
            <View className="flex-row items-center">
              <Pressable
                onPress={handleNewChat}
                className="flex-row items-center px-3 py-2 rounded-md bg-purple-50 mr-3"
              >
                <MaterialIcons name="add" size={20}/>
                <AppText variant="small" className="ml-1 font-medium">New Chat</AppText>
              </Pressable>
    
              <Pressable 
                onPress={navigateToChatHome} 
                className="p-1"
              >
                <MaterialIcons name="close" size={24}/>
              </Pressable>
            </View>
          ),
        }}
      />
      <View className="flex-1 bg-surface-screen">
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
      </View>
    </>
  );
}
