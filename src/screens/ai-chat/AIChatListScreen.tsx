import { ThemedText } from '@/components/themes/themed-text';
import { useChatActions } from '@/src/hooks/ai-chat/useChatActions';
import { useChatSessions } from '@/src/hooks/ai-chat/useChatSessions';
import { useChatStore } from "@/src/store/useChatStore";
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Modal, Pressable, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

type ConversationDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function AIChatListScreen({ 
  isOpen, 
  onClose, 
}: ConversationDrawerProps) {
  const [isLoading, setIsLoading] = useState(false);
  const insets = useSafeAreaInsets();

  const { data: sessions } = useChatSessions();

  const currentSessionId = useChatStore((s) => s.currentSessionId);
  const setCurrentSession = useChatStore((s) => s.setCurrentSession);

  const {
    selectConversation,
    deleteConversation,
    startNewConversation,
  } = useChatActions();

  useEffect(() => {
    // placeholder for potential loading indicator when prop changes
    setIsLoading(false);
  }, [currentSessionId, sessions]);

  const handleDeleteConversation = async (id: string) => {
    try {
      await deleteConversation(id);
    } catch (error) {
      console.error('Failed to delete conversation:', error);
    }
  };

  const handleNewChat = async () => {
    await startNewConversation();
  };

  return (
    <Modal
      visible={isOpen}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <SafeAreaProvider>
        <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
          <View
            className="flex-row justify-between items-center p-4 border-b border-gray-200"
            style={{ paddingTop: 16 + insets.top }}
          > 
            <ThemedText className="text-xl font-bold text-gray-900">Conversations</ThemedText>
            <TouchableOpacity onPress={onClose} className="p-1">
              <MaterialIcons name="close" size={24} color="#4B5563" />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity
            onPress={async () => {
              await handleNewChat();
              onClose();
            }}
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
            ) : sessions?.length === 0 ? (
              <View className="p-4">
                <ThemedText className="text-gray-500">No conversations yet</ThemedText>
              </View>
            ) : (
              sessions?.map((session) => (
                <Pressable
                  key={session.id}
                  onPress={() => {
                    setCurrentSession(session.id);
                    selectConversation(session.id);
                    onClose();
                  }}
                  className={`p-4 border-b border-gray-100 flex-row items-center ${
                    session.id === currentSessionId ? 'bg-purple-50' : 'bg-white'
                  }`}
                >
                  <View className="flex-1">
                    <ThemedText className="font-medium text-gray-900" numberOfLines={1}>
                      {session.title}
                    </ThemedText>
                    <ThemedText 
                      className="text-sm text-gray-500 mt-1"
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {session.messages[0]?.content || 'No messages yet'}
                    </ThemedText>
                  </View>
                  <Pressable 
                    onPress={(e) => {
                      e.stopPropagation();
                      handleDeleteConversation(session.id);
                    }}
                    className="p-1 ml-2"
                  >
                    <MaterialIcons name="delete-outline" size={20} color="#EF4444" />
                  </Pressable>
                </Pressable>
              ))
            )}
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </Modal>
  );
}
