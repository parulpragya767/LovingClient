import { Card } from '@/src/components/ui/Card';
import { MarkdownText } from "@/src/components/ui/MarkdownText";
import { createMarkdownRules } from '@/src/lib/markdown/markdownRules';
import type { ChatMessage as ChatMessageType } from '@/src/models/chat';
import { ChatMessageRole } from '@/src/models/enums';
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
    <Card className={`max-w-[80%]
      ${isUser 
        ? 'self-end ml-[20%] bg-surface-sunken rounded-br-sm' 
        : 'self-start mr-[20%] bg-surface-base rounded-bl-sm'}`}
      >
        <MarkdownText 
          rules={createMarkdownRules({})}>
          {message.content ?? ''}
        </MarkdownText>
    </Card>
  );
}
