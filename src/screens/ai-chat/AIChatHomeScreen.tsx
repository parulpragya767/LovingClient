import { ChatMessage } from '@/components/ai-chat/ChatMessage';
import { StarterPrompt } from '@/components/ai-chat/StarterPrompt';
import { ThemedText } from '@/components/themes/themed-text';
import { useChatActions } from '@/src/hooks/ai-chat/useChatActions';
import { useChatMessages } from '@/src/hooks/ai-chat/useChatMessages';
import { useSamplePrompts } from '@/src/hooks/ai-chat/useSamplePrompts';
import { AIChatListScreen } from '@/src/screens/ai-chat/AIChatListScreen';
import { useChatStore } from '@/src/store/useChatStore';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, KeyboardAvoidingView, Platform, Pressable, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const AIChatHomeScreen = () => {
  const router = useRouter();

  const currentSessionId = useChatStore((s) => s.currentSessionId);
  const { data: messages } = useChatMessages(currentSessionId ?? '');
  const {
    startNewConversation,
    sendMessage,
  } = useChatActions();
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const { data: samplePrompts } = useSamplePrompts();

  const handleSendMessage = useCallback(async () => {
    if (!inputText.trim() || isSending) return;
    const message = inputText;
    setInputText('');
    setIsSending(true);

    try {
      if (!currentSessionId) {
        await startNewConversation();
      }
      await sendMessage(message);
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsSending(false);
    }
  }, [inputText, isSending, currentSessionId, startNewConversation, sendMessage]);

  const handleStarterPromptPress = useCallback((prompt: string) => {
    setInputText(prompt);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
      <KeyboardAvoidingView 
        className="flex-1 bg-white"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 90}
      >
        {/* Conversation Drawer */}
        <AIChatListScreen
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
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
              { currentSessionId ?? 'AI Companion'}
            </ThemedText>
          </View>

          {/* Chat messages */}
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={({ item }) => <ChatMessage message={item} />}
            keyExtractor={(item, index) => item.id ?? `${index}-${item.createdAt}`}
            className="flex-1 px-4 pt-4"
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            ListFooterComponent={
              messages!= undefined && messages.length > 0 ? (
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
                
                {samplePrompts && samplePrompts.length > 0 && (
                  <View className="w-full max-w-lg">
                    <ThemedText className="text-base font-semibold text-gray-600 mb-3 ml-2">
                      Try asking me...
                    </ThemedText>
                    {samplePrompts.map((prompt, idx) => (
                      <StarterPrompt 
                        key={`${idx}-${prompt}`}
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
                !inputText.trim() || isSending ? 'opacity-50' : ''
              }`}
              onPress={handleSendMessage}
              disabled={!inputText.trim() || isSending}
            >
              {isSending ? (
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
};
