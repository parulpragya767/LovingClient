import { ThemedText } from '@/src/components/themes/themed-text';
import type { ChatMessage as ChatMessageType } from '@/src/models/chat';
import { ChatMessageRole } from '@/src/models/enums';
import { View } from 'react-native';
import { RitualRecommendationHandler } from './RitualRecommendationHandler';

type ChatMessageProps = {
  message: ChatMessageType;
};

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === ChatMessageRole.User;
  const isSystem = message.role === ChatMessageRole.System;
  const hasRecommendation = isSystem && message.metadata?.recommendationId;
  
  if (isSystem && !hasRecommendation) {
    return null; // Don't render system messages without recommendations
  }
  
  if (hasRecommendation) {
    const recommendationId = message.metadata!.recommendationId!;
    return <RitualRecommendationHandler recommendationId={recommendationId}/>
  }

  return (
    <View className={`my-1 p-2.5 rounded-2xl max-w-[80%] 
      ${isUser 
        ? 'self-end ml-[20%] bg-purple-700 rounded-br-sm' 
        : 'self-start mr-[20%] bg-gray-100 rounded-bl-sm'}`}
      >
      <ThemedText className={`text-base leading-relaxed ${isUser ? 'text-white' : 'text-gray-800'}`}>
        {message.content}
      </ThemedText>
    </View>
  );
}
