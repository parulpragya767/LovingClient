import type {
  ChatMessage
} from '@/src/models/chat';
import { chatService } from '@/src/services/chatService';
import { useMemo } from 'react';

import { ChatMessageRole } from '@/src/models/enums';
import { useChatStore } from "@/src/store/useChatStore";
import { useChatMessages } from "./useChatMessages";
import { useChatSessions } from "./useChatSessions";

export const useChatActions = () => {
  const currentSessionId = useChatStore((s) => s.currentSessionId);
  const { setCurrentSession } = useChatStore();
  const { invalidateQueries: invalidateSessions } = useChatSessions();
  const { data: messages, sendMessage: sendMessageToStore, invalidateQueries: invalidateMessages } = useChatMessages(currentSessionId ?? '');

  const currentConversation = useMemo(
    () =>
      currentSessionId
        ? messages ?? null
        : null,
    [currentSessionId, messages]
  );

  const startNewConversation = async () => {
    const session = await chatService.startSession();
    setCurrentSession(session.id);

    // refresh sessions list
    await invalidateSessions();
    await invalidateMessages();
  };

  const selectConversation = async (id: string) => {
    setCurrentSession(id);
    await invalidateMessages();
  };

  const sendMessage = async (content: string) => {
    const sessionId = useChatStore.getState().currentSessionId;
    if (!sessionId) return;

    const userMsg: ChatMessage = {
      sessionId: sessionId,
      role: ChatMessageRole.User,
      content,
      createdAt: new Date().toISOString(),
    };

    sendMessageToStore(userMsg, sessionId);

    const resp = await chatService.sendMessage(sessionId, {
      content,
    });

    if (resp.assistantResponse) {
      sendMessageToStore(resp.assistantResponse, sessionId);
    }
  };

  const deleteConversation = async (id: string) => {
    await chatService.deleteSession(id);

    await invalidateSessions();
  };

  return { 
    currentConversation,
    startNewConversation,
    selectConversation,
    sendMessage,
    deleteConversation
  };
};
