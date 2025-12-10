import { AppTheme } from "@/src/components/themes/AppTheme";
import { MaterialIcons } from '@expo/vector-icons';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { ActivityIndicator, TextInput, TouchableOpacity, View } from 'react-native';
import Toast from "react-native-toast-message";

export type ChatInputHandle = {
  setText: (text: string) => void;
};

type ChatInputProps = {
  placeholder?: string;
  onSend?: (message: string) => Promise<any>;
};

export const ChatInput = forwardRef<ChatInputHandle, ChatInputProps>(({ 
    placeholder = 'Type your message...', 
    onSend 
  }, ref) => {
    const [inputText, setInputText] = useState('');
    const [isSending, setIsSending] = useState(false);

    useImperativeHandle(ref, () => ({
      setText: (text: string) => setInputText(text),
    }));

    const handleSendMessage = async () => {
      if (!inputText.trim() || isSending) return;
      const message = inputText;
      setIsSending(true);

      try {
        await onSend?.(message);
        setInputText('');
      } catch (error) {
        Toast.show({
          type: "error", 
          text1: "Failed to send message",
        });
      } finally {
        setIsSending(false);
      }
    };

    return (
      <View className="flex-row w-full items-center py-4 border-t border-border-strong">
        <TextInput
          className="flex-1 max-h-30 rounded-full px-4 py-3 mr-3 bg-action-secondary-bg text-body text-action-secondary-text"
          value={inputText}
          onChangeText={setInputText}
          placeholder={placeholder}
          placeholderTextColor={AppTheme.colors.action.secondary.text}
          multiline
          returnKeyType="send"
        />
        <TouchableOpacity
          className={`w-12 h-12 rounded-full bg-action-primary-bg justify-center items-center ${!inputText.trim() || isSending ? 'opacity-50' : ''}`}
          onPress={handleSendMessage}
          disabled={!inputText.trim() || isSending}
        >
          {isSending ? (
            <ActivityIndicator size="small" color={AppTheme.colors.action.primary.text} />
          ) : (
            <MaterialIcons name="send" size={24} color={AppTheme.colors.action.primary.text} />
          )}
        </TouchableOpacity>
      </View>
    );
  }
);
