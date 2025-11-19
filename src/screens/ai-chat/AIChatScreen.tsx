import { ThemedText } from '@/components/themes/themed-text';
import { ThemedView } from '@/components/themes/themed-view';
import { useChatActions } from '@/src/hooks/ai-chat/useChatActions';
import { useChatMessages } from '@/src/hooks/ai-chat/useChatMessages';
import { ChatMessageRole } from '@/src/models/enums';
import { useChatStore } from '@/src/store/useChatStore';
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, View } from 'react-native';

export default function AIChatScreen() {
  const router = useRouter();
  const { topic } = useLocalSearchParams<{ topic?: string }>();
  const {
    sendMessage,
    startNewConversation,
  } = useChatActions();
  const [inputText, setInputText] = useState('');
  // const messages = currentConversation?.messages || [];

  const currentConversationId = useChatStore((s) => s.currentSessionId);
  const { data: messages } = useChatMessages(currentConversationId ?? '');

  useEffect(() => {
    // If there's a topic but no conversation, start a new one
    if (topic && !currentConversationId) {
      startNewConversation();
    }
  }, [topic, currentConversationId, startNewConversation]);

  const handleSend = async () => {
    if (!inputText.trim()) return;
    const message = inputText;
    setInputText('');
    
    try {
      if (!currentConversationId) {
        await startNewConversation();
      }
      await sendMessage(message);
    } catch (error) {
      console.error('Failed to send message:', error);
      // Optionally show error to user
    }
  };

  return (
    <ThemedView className="flex-1">
      {/* Header */}
      <View className="flex-row items-center p-4 border-b border-gray-200 bg-white">
        <TouchableOpacity onPress={() => router.back()} className="p-2 mr-2">
          <MaterialIcons name="arrow-back" size={24} color="#4B5563" />
        </TouchableOpacity>
        <View>
          <ThemedText className="text-lg font-semibold">AI Chat</ThemedText>
          <ThemedText className="text-sm text-gray-500">Online</ThemedText>
        </View>
      </View>

      {/* Messages */}
      <FlatList
        data={messages}
        keyExtractor={(item, index) => item.id || `${index}-${item.createdAt}`}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View 
            className={`mb-4 max-w-[80%] ${item.role === ChatMessageRole.User ? 'self-end bg-blue-100' : 'self-start bg-gray-100'} rounded-2xl p-4`}
          >
            <ThemedText>{item.content}</ThemedText>
            <ThemedText className="text-xs text-gray-500 mt-1">
              {item.createdAt ? new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
            </ThemedText>
          </View>
        )}
      />

      {/* Input */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="p-4 border-t border-gray-200 bg-white"
      >
        <View className="flex-row items-center">
          <TextInput
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-full py-3 px-4 mr-2"
            onSubmitEditing={handleSend}
          />
          <TouchableOpacity 
            onPress={handleSend}
            className="bg-blue-600 p-3 rounded-full"
            disabled={!inputText.trim()}
          >
            <MaterialIcons name="send" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}
