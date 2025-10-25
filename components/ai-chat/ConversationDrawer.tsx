import { ThemedText } from '@/components/themes/themed-text';
import { chatService } from '@/src/services/chatServiceOld';
import { Conversation } from '@/src/types/chat';
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Modal, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

type ConversationDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  onConversationSelect: (conversationId: string) => void;
  currentConversationId: string | null;
};

export function ConversationDrawer({ 
  isOpen, 
  onClose, 
  onConversationSelect, 
  currentConversationId 
}: ConversationDrawerProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const insets = useSafeAreaInsets();

  const loadConversations = async () => {
    try {
      setIsLoading(true);
      const convs = await chatService.getConversations();
      setConversations(convs);
    } catch (error) {
      console.error('Failed to load conversations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadConversations();
  }, [currentConversationId]);

  const handleDeleteConversation = async (id: string) => {
    try {
      await chatService.deleteConversation(id);
      loadConversations();
    } catch (error) {
      console.error('Failed to delete conversation:', error);
    }
  };

  const handleNewChat = () => {
    const newId = chatService.createNewConversation();
    onConversationSelect(newId);
  };

  return (
    <Modal
      visible={isOpen}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <SafeAreaProvider>
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
          <View style={[styles.header, { paddingTop: 16 + insets.top }]}>
            <ThemedText className="text-xl font-bold text-gray-900">Conversations</ThemedText>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <MaterialIcons name="close" size={24} color="#4B5563" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.content}>
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <ThemedText>Loading conversations...</ThemedText>
              </View>
            ) : conversations.length === 0 ? (
              <View style={styles.emptyContainer}>
                <ThemedText className="text-gray-500">No conversations yet</ThemedText>
              </View>
            ) : (
              conversations.map((conversation) => (
                <Pressable
                  key={conversation.id}
                  onPress={() => onConversationSelect(conversation.id)}
                  style={[
                    styles.conversationItem,
                    conversation.id === currentConversationId && styles.activeConversation
                  ]}
                >
                  <View style={styles.conversationContent}>
                    <ThemedText className="font-medium text-gray-900" numberOfLines={1}>
                      {conversation.title}
                    </ThemedText>
                    <ThemedText 
                      className="text-sm text-gray-500 mt-1"
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {conversation.messages[0]?.text || 'No messages yet'}
                    </ThemedText>
                  </View>
                  <Pressable 
                    onPress={(e) => {
                      e.stopPropagation();
                      handleDeleteConversation(conversation.id);
                    }}
                    style={styles.deleteButton}
                  >
                    <MaterialIcons name="delete-outline" size={20} color="#EF4444" />
                  </Pressable>
                </Pressable>
              ))
            )}
          </View>
          
          <TouchableOpacity
            onPress={handleNewChat}
            style={[styles.newChatButton, { paddingBottom: 16 + insets.bottom }]}
          >
            <MaterialIcons name="add" size={24} color="#8B5CF6" />
            <ThemedText className="ml-2 text-purple-500 font-medium">New Chat</ThemedText>
          </TouchableOpacity>
        </SafeAreaView>
      </SafeAreaProvider>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  closeButton: {
    padding: 4,
  },
  content: {
    flex: 1,
  },
  loadingContainer: {
    padding: 16,
  },
  emptyContainer: {
    padding: 16,
  },
  conversationItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeConversation: {
    backgroundColor: '#F5F3FF',
  },
  conversationContent: {
    flex: 1,
  },
  deleteButton: {
    padding: 4,
    marginLeft: 8,
  },
  newChatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#fff',
  },
});
