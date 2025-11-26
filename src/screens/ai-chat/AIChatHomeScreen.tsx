import { ChatInput, ChatInputHandle } from '@/src/components/ai-chat/ChatInput';
import { StarterPrompt } from '@/src/components/ai-chat/StarterPrompt';
import { ThemedText } from '@/src/components/themes/themed-text';
import { useSamplePrompts } from '@/src/hooks/ai-chat/useSamplePrompts';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCallback, useRef } from 'react';
import { KeyboardAvoidingView, Platform, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const AIChatHomeScreen = () => {
  const router = useRouter();
  const chatInputRef = useRef<ChatInputHandle>(null);

  const { data: samplePrompts } = useSamplePrompts();

  const handleStarterPromptPress = useCallback((prompt: string) => {
    chatInputRef.current?.setText(prompt);
  }, []);

  const handleChatListPress = useCallback(() => {
    router.push('/ai-chat/list');
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        className="flex-1 bg-white"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 90}
      >
        <View className="flex-1">
          {/* Header */}
          <View className="flex-row items-center p-4 border-b border-gray-200">
            <TouchableOpacity 
              onPress={handleChatListPress}
              className="p-2 mr-2"
            >
              <MaterialIcons name="menu" size={24} color="#4B5563" />
            </TouchableOpacity>
            <ThemedText className="text-xl font-semibold text-gray-900">
              AI Companion
            </ThemedText>
          </View>

          {/* Centered sample prompts */}
          <View className="flex-1 justify-center items-center pb-24 px-4">
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

          {/* Input area */}
          <ChatInput
            ref={chatInputRef}
            placeholder="Message your AI companion..."
            navigateToChatOnSend
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

