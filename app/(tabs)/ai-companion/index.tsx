import { ChatMessage } from '@/components/ChatMessage';
import { ConversationDrawer } from '@/components/ConversationDrawer';
import { StarterPrompt } from '@/components/StarterPrompt';
import { ThemedText } from '@/components/themed-text';
import { chatService } from '@/src/services/chatService';
import { ChatMessage as ChatMessageType, Conversation, StarterPrompt as StarterPromptType } from '@/src/types/chat';
// Removed unused Drawer import
import { MaterialIcons } from '@expo/vector-icons';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function AICompanionScreen() {
  const router = useRouter();
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [starterPrompts, setStarterPrompts] = useState<StarterPromptType[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  // Load conversation and starter prompts on mount
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // Load starter prompts
        const prompts = await chatService.getStarterPrompts();
        setStarterPrompts(prompts);

        // Load or create conversation
        let convId = chatService.getCurrentConversationId();
        if (!convId) {
          convId = chatService.createNewConversation();
        }
        loadConversation(convId);
      } catch (error) {
        console.error('Failed to load initial data:', error);
      }
    };

    loadInitialData();
  }, []);

  // Load conversation by ID
  const loadConversation = async (conversationId: string) => {
    try {
      const conv = await chatService.getConversation(conversationId);
      if (conv) {
        setConversation(conv);
        setMessages(conv.messages);
        chatService.setCurrentConversation(conversationId);
      }
    } catch (error) {
      console.error('Failed to load conversation:', error);
    }
  };

  // Handle conversation selection from drawer
  const handleSelectConversation = (conversationId: string) => {
    loadConversation(conversationId);
    setIsDrawerOpen(false);
  };

  // Create a new conversation
  const handleNewConversation = () => {
    const newId = chatService.createNewConversation();
    loadConversation(newId);
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const handleSendMessage = useCallback(async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    // Add user message to UI immediately
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // Send message and get AI response
      const response = await chatService.sendMessage(inputText);
      
      // Update messages with AI response
      setMessages(prev => [...prev, response]);
      
      // Refresh conversation to get updated data
      const currentId = chatService.getCurrentConversationId();
      if (currentId) {
        const updatedConv = await chatService.getConversation(currentId);
        if (updatedConv) {
          setConversation(updatedConv);
        }
      }
    } catch (error) {
      console.error('Failed to send message:', error);
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
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
      <KeyboardAvoidingView 
        className="flex-1 bg-white"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 90}
      >
      {/* Conversation Drawer */}
      <ConversationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onConversationSelect={handleSelectConversation}
        currentConversationId={conversation?.id || null}
      />
      
      {/* Main Content */}
      <View className="flex-1">
        {/* Header */}
        <View className="flex-row items-center p-4 border-b border-gray-200">
          <TouchableOpacity 
            onPress={() => setIsDrawerOpen(!isDrawerOpen)}
            className="p-2 mr-2"
          >
            <MaterialIcons name="menu" size={24} color="#4B5563" />
          </TouchableOpacity>
          <ThemedText className="text-xl font-semibold text-gray-900">
            {conversation?.title || 'AI Companion'}
          </ThemedText>
        </View>

        {/* Chat messages */}
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          className="flex-1 px-4 pt-4"
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          ListFooterComponent={
            messages.length > 0 ? (
              <View className="mt-4 mb-24">
                <Pressable
                  onPress={() => router.push('/(modals)/rituals-suggestions')}
                  className="w-full"
                >
                  <View className="bg-purple-50 border border-purple-100 rounded-2xl p-4 flex-row items-center">
                    <View className="flex-1 mr-3">
                      <ThemedText className="text-purple-700 font-semibold text-base">Suggested Ritual Pack</ThemedText>
                      <ThemedText className="text-purple-600 text-sm mt-0.5">Open suggestions and add to your current rituals</ThemedText>
                    </View>
                    <View className="bg-white rounded-full px-3 py-1 border border-purple-200">
                      <ThemedText className="text-purple-700 text-sm font-medium">Open</ThemedText>
                    </View>
                  </View>
                </Pressable>
              </View>
            ) : null
          }
          ListEmptyComponent={
            <View className="flex-1 justify-center items-center pb-24">
              <ThemedText className="text-2xl font-bold text-gray-800 mb-2">Your AI Companion</ThemedText>
              <ThemedText className="text-base text-gray-500 mb-8">
                How can I help you today?
              </ThemedText>
              
              {starterPrompts.length > 0 && (
                <View className="w-full max-w-lg">
                  <ThemedText className="text-base font-semibold text-gray-600 mb-3 ml-2">
                    Try asking me...
                  </ThemedText>
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
        <View className="flex-row items-center p-4 border-t border-gray-200 bg-white">
          <TextInput
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
            className={`w-12 h-12 rounded-full bg-purple-600 justify-center items-center ${
              !inputText.trim() || isLoading ? 'opacity-50' : ''
            }`}
            onPress={handleSendMessage}
            disabled={!inputText.trim() || isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <MaterialIcons name="send" size={24} color="white" />
            )}
          </TouchableOpacity>
        </View>
      </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
