import { ThemedText } from '@/components/themed-text';
import { ChatMessage as ChatMessageType } from '@/src/types/chat';
import { View } from 'react-native';

type ChatMessageProps = {
  message: ChatMessageType;
};

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === 'user';
  
  return (
    <View className={`my-1 max-w-[80%] ${isUser ? 'self-end ml-[20%]' : 'self-start mr-[20%]'}`}>
      <View 
        className={`rounded-2xl p-3 ${isUser 
          ? 'bg-purple-700 rounded-br-sm' 
          : 'bg-gray-100 rounded-bl-sm'}`}
      >
        <ThemedText 
          className={`text-base leading-[22px] ${isUser ? 'text-white' : 'text-gray-800'}`}
        >
          {message.text}
        </ThemedText>
      </View>
    </View>
  );
}
