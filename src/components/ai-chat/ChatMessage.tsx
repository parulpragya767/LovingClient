import { markdownRules } from "@/src/lib/markdown/markdownRules";
import type { ChatMessage as ChatMessageType } from '@/src/models/chat';
import { ChatMessageRole } from '@/src/models/enums';
import { View } from 'react-native';
import Markdown from 'react-native-markdown-display';
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
        <Markdown
          rules={markdownRules}
          style={{
            body: { color: isUser ? '#ffffff' : '#374151', fontSize: 15, lineHeight: 24 },
            text: { color: isUser ? '#ffffff' : '#374151', fontSize: 15, lineHeight: 24 },
            strong: { fontWeight: '600' }
          }}
          >
          {message.content}
        </Markdown>
    </View>
  );
}
