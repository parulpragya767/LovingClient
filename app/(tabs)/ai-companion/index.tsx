import { ChatMessage } from '@/components/ChatMessage';
import { StarterPrompt } from '@/components/StarterPrompt';
import { ThemedText } from '@/components/themed-text';
import { chatService } from '@/src/services/chatService';
import { ChatMessage as ChatMessageType, StarterPrompt as StarterPromptType } from '@/src/types/chat';
import { MaterialIcons } from '@expo/vector-icons';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, KeyboardAvoidingView, Platform, TextInput as RNTextInput, TouchableOpacity, View } from 'react-native';

export default function AICompanionScreen() {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [starterPrompts, setStarterPrompts] = useState<StarterPromptType[]>([]);
  const flatListRef = useRef<FlatList>(null);

  // Load starter prompts on mount
  useEffect(() => {
    const loadStarterPrompts = async () => {
      try {
        const prompts = await chatService.getStarterPrompts();
        setStarterPrompts(prompts);
      } catch (error) {
        console.error('Failed to load starter prompts:', error);
      }
    };

    loadStarterPrompts();
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const handleSendMessage = useCallback(async () => {
    if (!inputText.trim()) return;

    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    // Add user message to chat
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // Get AI response
      const aiMessage = await chatService.sendMessage(inputText);
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      // Add error message
      const errorMessage: ChatMessageType = {
        id: `error-${Date.now()}`,
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [inputText]);

  const handleStarterPromptPress = useCallback((prompt: string) => {
    setInputText(prompt);
  }, []);

  const renderMessage = useCallback(({ item }: { item: ChatMessageType }) => (
    <ChatMessage message={item} />
  ), []);

  const renderStarterPrompt = useCallback(({ item }: { item: StarterPromptType }) => (
    <StarterPrompt prompt={item} onPress={handleStarterPromptPress} />
  ), [handleStarterPromptPress]);

  return (
    <View className="flex-1 bg-gray-50">
      {/* Chat messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        className="flex-1 px-4 pt-4"
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center pb-24">
            <ThemedText className="text-2xl font-bold text-gray-800 mb-2">Your AI Companion</ThemedText>
            <ThemedText className="text-base text-gray-500 mb-8">
              How can I help you today?
            </ThemedText>
            
            {starterPrompts.length > 0 && (
              <View className="w-full max-w-lg">
                <ThemedText className="text-base font-semibold text-gray-600 mb-3 ml-2">Try asking me...</ThemedText>
                {starterPrompts.map((prompt) => (
                  <StarterPrompt 
                    key={prompt.id}
                    prompt={prompt}
                    onPress={handleStarterPromptPress}
                  />
                ))}
              </View>
            )}
          </View>
        }
      />

      {/* Input area */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-row items-end px-3 pb-6 pt-3 bg-white border-t border-gray-200"
        keyboardVerticalOffset={90}
      >
        <RNTextInput
          className="flex-1 max-h-30 bg-gray-100 rounded-full px-4 py-3 text-base text-gray-800 mr-2"
          value={inputText}
          onChangeText={setInputText}
          placeholder="Message your AI companion..."
          placeholderTextColor="#9CA3AF"
          multiline
          onSubmitEditing={handleSendMessage}
          returnKeyType="send"
          blurOnSubmit={false}
        />
        <TouchableOpacity
          className={`w-12 h-12 rounded-full bg-purple-600 justify-center items-center ${!inputText.trim() || isLoading ? 'opacity-50' : ''}`}
          onPress={handleSendMessage}
          disabled={!inputText.trim() || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <MaterialIcons name="send" size={24} color="white" />
          )}
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}
