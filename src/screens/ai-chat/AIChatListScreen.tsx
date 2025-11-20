import { ChatSession } from '@/components/ai-chat/ChatSession';
import { ThemedText } from '@/components/themes/themed-text';
import { useChatActions } from '@/src/hooks/ai-chat/useChatActions';
import { useChatSessions } from '@/src/hooks/ai-chat/useChatSessions';
import { useChatStore } from "@/src/store/useChatStore";
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AIChatListScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const { data: sessions } = useChatSessions();

  const currentSessionId = useChatStore((s) => s.currentSessionId);

  const {
    selectConversation,
    deleteConversation,
    startNewConversation,
  } = useChatActions();

  useEffect(() => {
    // placeholder for potential loading indicator when prop changes
    setIsLoading(false);
  }, [currentSessionId, sessions]);

  const handleSelectConversation = async (id: string) => {
    await selectConversation(id);
    router.push('/ai-chat/chat');
  };

  const handleDeleteConversation = async (id: string) => {
    try {
      await deleteConversation(id);
    } catch (error) {
      console.error('Failed to delete conversation:', error);
    }
  };

  const handleNewChat = async () => {
    await startNewConversation();
    router.push('/ai-chat/chat');
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
      <View
        className="flex-row justify-between items-center p-4 border-b border-gray-200"
        style={{ paddingTop: 16 + insets.top }}
      > 
        <ThemedText className="text-xl font-bold text-gray-900">Conversations</ThemedText>
        <TouchableOpacity onPress={() => router.back()} className="p-1">
          <MaterialIcons name="close" size={24} color="#4B5563" />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity
        onPress={handleNewChat}
        className="flex-row items-center p-4 border-t border-gray-200 bg-white"
        style={{ paddingBottom: 16 + insets.bottom }}
      >
        <MaterialIcons name="add" size={24} color="#8B5CF6" />
        <ThemedText className="ml-2 text-purple-500 font-medium">New Chat</ThemedText>
      </TouchableOpacity>
      
      <View className="flex-1">
        {isLoading ? (
          <View className="p-4">
            <ThemedText>Loading conversations...</ThemedText>
          </View>
        ) : (
          <FlatList
            data={sessions}
            keyExtractor={(item) => item.id}
            renderItem={({ item: session }) => (
              <ChatSession
                id={session.id}
                title={session.title}
                preview={session.messages[0]?.content || 'No messages yet'}
                isActive={session.id === currentSessionId}
                onSelect={handleSelectConversation}
                onDelete={handleDeleteConversation}
              />
            )}
            contentContainerStyle={{ flexGrow: 1 }}
            ListEmptyComponent={
              <View className="p-4">
                <ThemedText className="text-gray-500">No conversations yet</ThemedText>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}
