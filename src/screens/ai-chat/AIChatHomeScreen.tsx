import { ChatInput, ChatInputHandle } from '@/src/components/ai-chat/ChatInput';
import { StarterPrompt } from '@/src/components/ai-chat/StarterPrompt';
import { AppText } from '@/src/components/ui/AppText';
import { KeyboardSafeScreen } from '@/src/components/ui/KeyboardSafeScreen';
import { useChatActions } from '@/src/hooks/ai-chat/useChatActions';
import { useSamplePrompts } from '@/src/hooks/ai-chat/useSamplePrompts';
import { useKeyboardOffset } from '@/src/hooks/ui/useKeyboardOffset';
import { useToast } from '@/src/hooks/ui/useToast';
import { useRouter } from 'expo-router';
import { useCallback, useRef } from 'react';
import { FlatList, View } from 'react-native';

export const AIChatHomeScreen = () => {
  const router = useRouter();
  const chatInputRef = useRef<ChatInputHandle>(null);
  const { startNewConversation, sendMessageToSession } = useChatActions();
  const { data: samplePrompts } = useSamplePrompts();
  const keyboardOffset = useKeyboardOffset();
  const { showError } = useToast();

  const handleStarterPromptPress = useCallback((prompt: string) => {
    chatInputRef.current?.setText(prompt);
  }, []);

  const handleSendMessage = useCallback(async (message: string) => {
    try {
      const sessionId = await startNewConversation.mutateAsync();
      await sendMessageToSession.mutateAsync({ sessionId, content: message });
      router.push(`/ai-chat/chat?sessionId=${sessionId}`);
    } catch (error) {
      showError("Failed to send message");
    }
  }, [startNewConversation, sendMessageToSession]);

  return (
    <View className="flex-1 bg-surface-screen">
      <KeyboardSafeScreen>
        <View className="flex-1">
          {/* Sample prompts with FlatList */}
          <FlatList
            data={samplePrompts}
            keyExtractor={(item, index) => `prompt-${index}`}
            renderItem={({ item: prompt }) => (
              <View className="mb-5">
                <StarterPrompt 
                  prompt={prompt}
                  onPress={handleStarterPromptPress}
                />
              </View>
            )}
            className="px-8"
            ListHeaderComponent={
              <View className="items-center mt-10 mb-8">
                <AppText variant="heading" className="mb-1">What’s on your mind?</AppText>
                <AppText>Start with one of these, or ask anything.</AppText>
              </View>
            }
            ListFooterComponent={<View className="h-24" />}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          />
    
          {/* Input area */}
          <ChatInput
            ref={chatInputRef}
            placeholder="Tell me what’s on your mind…"
            onSend={handleSendMessage}
          />
        </View>
      </KeyboardSafeScreen>
    </View>
  );
};

