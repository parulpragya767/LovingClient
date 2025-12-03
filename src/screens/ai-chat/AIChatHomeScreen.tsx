import { ChatInput, ChatInputHandle } from '@/src/components/ai-chat/ChatInput';
import { StarterPrompt } from '@/src/components/ai-chat/StarterPrompt';
import { ThemedText } from '@/src/components/themes/themed-text';
import { useChatActions } from '@/src/hooks/ai-chat/useChatActions';
import { useSamplePrompts } from '@/src/hooks/ai-chat/useSamplePrompts';
import { useRouter } from 'expo-router';
import { useCallback, useRef } from 'react';
import { FlatList, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const AIChatHomeScreen = () => {
  const router = useRouter();
  const chatInputRef = useRef<ChatInputHandle>(null);
  const { startNewConversation, sendMessageToSession } = useChatActions();
  const { data: samplePrompts } = useSamplePrompts();

  const handleStarterPromptPress = useCallback((prompt: string) => {
    chatInputRef.current?.setText(prompt);
  }, []);

  const handleSendMessage = useCallback(async (message: string) => {
    const sessionId = await startNewConversation();
    await sendMessageToSession(sessionId, message);
    router.push(`/ai-chat/chat?sessionId=${sessionId}`);
  }, [startNewConversation, sendMessageToSession]);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["left", "right"]}>
      <KeyboardAvoidingView
        className="flex-1 bg-white"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 90}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1">
            {/* Sample prompts with FlatList */}
            <View className="flex-1 px-4">
                <FlatList
                  data={samplePrompts}
                  keyExtractor={(item, index) => `prompt-${index}`}
                  renderItem={({ item: prompt }) => (
                    <StarterPrompt 
                      prompt={prompt}
                      onPress={handleStarterPromptPress}
                    />
                  )}
                  ListHeaderComponent={
                    <View className="py-4">
                      <View className="items-center mb-4">
                        <ThemedText className="text-2xl font-bold text-gray-800 mb-2">
                          Your AI Companion
                        </ThemedText>
                        <ThemedText className="text-base text-gray-500">
                          How can I help you today?
                        </ThemedText>
                      </View>
                      <ThemedText className="text-base font-semibold text-gray-600 ml-2">
                        Try asking me...
                      </ThemedText>
                    </View>
                  }
                  ListFooterComponent={<View className="h-20" />}
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="handled"
                />
            </View>

            {/* Input area */}
            <ChatInput
              ref={chatInputRef}
              placeholder="Message your AI companion..."
              onSend={handleSendMessage}
            />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

