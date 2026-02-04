import { Card } from '@/src/components/ui/Card';
import { MarkdownText } from "@/src/components/ui/MarkdownText";
import { createMarkdownRules } from '@/src/lib/markdown/markdownRules';
import type { ChatMessage as ChatMessageType } from '@/src/models/chat';
import { ChatMessageRole } from '@/src/models/enums';
import { useRef, useState } from 'react';
import {
  Pressable,
  View,
} from 'react-native';
import { ChatMessageActionsModal } from './ChatMessageActionsModal';
import { ChatRecommendationMessage } from './ChatRecommendationMessage';

type ChatMessageProps = {
  message: ChatMessageType;
};

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === ChatMessageRole.User;
  const isSystem = message.role === ChatMessageRole.System;
  const hasRecommendation = isSystem && message.metadata?.recommendationId;

  const messageRef = useRef<View>(null);
  const [actionsVisible, setActionsVisible] = useState(false);
  const [anchor, setAnchor] = useState<{ x: number; y: number } | null>(null);

  const openActions = () => {
    if (!message.content) return;

    messageRef.current?.measureInWindow((x, y, _w, h) => {
      setAnchor({ x, y: y + h });
      setActionsVisible(true);
    });
  };

  const closeActions = () => {
    setActionsVisible(false);
  };

  if (hasRecommendation) {
    const recommendationId = message.metadata!.recommendationId!;
    return <ChatRecommendationMessage recommendationId={recommendationId}/>
  }

  return (
    <>
      <Pressable onLongPress={openActions} delayLongPress={250}>
        <Card className={`max-w-[80%]
          ${isUser 
            ? 'self-end bg-surface-sunken rounded-br-sm' 
            : 'self-start bg-surface-base rounded-bl-sm'}`}
          >
            <View ref={messageRef}>
              <MarkdownText 
                rules={createMarkdownRules({})}>
                {message.content ?? ''}
              </MarkdownText>
            </View>
        </Card>
      </Pressable>

      <ChatMessageActionsModal
        visible={actionsVisible}
        anchor={anchor}
        onRequestClose={closeActions}
        messageContent={message.content ?? ""}
      />
    </>
  );
}
