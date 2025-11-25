import { useChatActions } from '@/src/hooks/ai-chat/useChatActions';
import { useChatStore } from '@/src/store/useChatStore';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, View } from 'react-native';

export type ChatInputHandle = {
  setText: (text: string) => void;
};

type ChatInputProps = {
  placeholder?: string;
  navigateToChatOnSend?: boolean;
  onSubmit?: (message: string) => Promise<unknown>;
};

export const ChatInput = forwardRef<ChatInputHandle, ChatInputProps>(
  ({ placeholder = 'Type your message...', navigateToChatOnSend = false, onSubmit }, ref) => {
    const router = useRouter();
    const { sendMessage: defaultSendMessage, startNewConversation } = useChatActions();
    const currentConversationId = useChatStore((s) => s.currentSessionId);
    const sendMessage = onSubmit || defaultSendMessage;

    const [inputText, setInputText] = useState('');
    const [isSending, setIsSending] = useState(false);

    useImperativeHandle(ref, () => ({
      setText: (text: string) => setInputText(text),
    }));

    const handleSend = useCallback(async () => {
      if (!inputText.trim() || isSending) return;
      const message = inputText;
      setInputText('');
      setIsSending(true);

      try {
        if (!currentConversationId && !onSubmit) {
          await startNewConversation();
        }
        await sendMessage(message);
        if (navigateToChatOnSend) {
          router.push('/ai-chat/chat');
        }
      } catch (error) {
        console.error('Failed to send message:', error);
      } finally {
        setIsSending(false);
      }
    }, [inputText, isSending, currentConversationId, startNewConversation, sendMessage, navigateToChatOnSend, router, onSubmit]);

    return (
      <KeyboardAvoidingView 
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              className="p-0"
          >
          <View className="flex-row w-full items-center p-4 border-t border-gray-200 bg-white">
            <TextInput
            className="flex-1 max-h-30 bg-gray-100 rounded-full px-4 py-3 text-base text-gray-800 mr-2"
            value={inputText}
            onChangeText={setInputText}
            placeholder={placeholder}
            placeholderTextColor="#9CA3AF"
            multiline
            onSubmitEditing={handleSend}
            returnKeyType="send"
            blurOnSubmit={false}
          />
          <TouchableOpacity
            className={`w-12 h-12 rounded-full bg-purple-600 justify-center items-center ${
              !inputText.trim() || isSending ? 'opacity-50' : ''
            }`}
            onPress={handleSend}
            disabled={!inputText.trim() || isSending}
          >
            {isSending ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <MaterialIcons name="send" size={24} color="white" />
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
);

export default ChatInput;
