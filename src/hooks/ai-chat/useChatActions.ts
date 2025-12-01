import type {
  ChatMessage
} from '@/src/models/chat';
import { chatService } from '@/src/services/chatService';
import { useMemo } from 'react';

import { ChatMessageRole } from '@/src/models/enums';
import type { RitualPack } from '@/src/models/ritualPacks';
import { useChatStore } from "@/src/store/useChatStore";
import { useChatMessages } from "./useChatMessages";
import { useChatSessions } from "./useChatSessions";

export const useChatActions = () => {
  const currentSessionId = useChatStore((s) => s.currentSessionId);
  const { setCurrentSession } = useChatStore();
  const { data: sessions, invalidateQueries: invalidateSessions } = useChatSessions();
  const { data: messages, sendMessage: sendMessageToStore, invalidateQueries: invalidateMessages } = useChatMessages(currentSessionId ?? '');

  const currentSession = useMemo(() => {
    if (!sessions || !currentSessionId) return null;
    return sessions.find(session => session.id === currentSessionId) || null;
  }, [sessions, currentSessionId]);

  const currentConversation = useMemo(
    () =>
      currentSessionId
        ? messages ?? []
        : [],
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

  const sendMessage = async (content: string): Promise<boolean> => {
    const sessionId = useChatStore.getState().currentSessionId;
    if (!sessionId) return false;

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

    return resp.readyForRitualPackRecommendation ?? false;
  };

  const deleteConversation = async (id: string) => {
    await chatService.deleteSession(id);

    await invalidateSessions();
  };

  const recommendRitualPack = async (): Promise<RitualPack | null> => {
    const sessionId = useChatStore.getState().currentSessionId;
    if (!sessionId) return null;

    try {
      const response = await chatService.recommendRitualPack(sessionId);
      
      // Send the wrap-up response to the chat if it exists
      if (response.wrapUpResponse) {
        sendMessageToStore(response.wrapUpResponse, sessionId);
      }
      
      return response.ritualPack || null;
    } catch (error) {
      console.error('Failed to recommend ritual pack:', error);
      return null;
    }
  };

  const refreshConversation = () => {
    invalidateMessages();
  };

  return { 
    currentSession,
    currentConversation,
    startNewConversation,
    selectConversation,
    sendMessage,
    deleteConversation,
    recommendRitualPack,
    refreshConversation
  };
};
