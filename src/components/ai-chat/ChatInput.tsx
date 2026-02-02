import { AppTheme } from "@/src/components/themes/AppTheme";
import { MaterialIcons } from '@expo/vector-icons';
import clsx from "clsx";
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { ActivityIndicator, LayoutAnimation, TextInput, TouchableOpacity, View } from 'react-native';
import Toast from "react-native-toast-message";

const SINGLE_LINE_HEIGHT = 48;
const MAX_INPUT_HEIGHT = 120;

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
    const [contentHeight, setContentHeight] = useState(0);

    const isMultiline = contentHeight > SINGLE_LINE_HEIGHT;

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
      <View className="flex-row w-full items-center p-3 gap-2 border-t border-border-strong">
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          placeholder={placeholder}
          placeholderTextColor={AppTheme.colors.action.secondary.text}
          multiline
          returnKeyType="go"
          scrollEnabled
          style={{ maxHeight: MAX_INPUT_HEIGHT }}
          textAlignVertical="top"
          onContentSizeChange={(e) => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setContentHeight(e.nativeEvent.contentSize.height);
          }}
          className={clsx(
            'flex-1 px-3 py-2 bg-surface-sunken text-body text-text-primary',
            isMultiline ? 'rounded-card' : 'rounded-full'
          )}
        />
        <TouchableOpacity
          className={`w-9 h-9 rounded-full bg-action-primary-bg justify-center items-center ${!inputText.trim() || isSending ? 'opacity-50' : ''}`}
          onPress={handleSendMessage}
          disabled={!inputText.trim() || isSending}
        >
          {isSending ? (
            <ActivityIndicator size="small" color={AppTheme.colors.action.primary.text} />
          ) : (
            <MaterialIcons name="send" size={16} color={AppTheme.colors.action.primary.text} />
          )}
        </TouchableOpacity>
      </View>
    );
  }
);
