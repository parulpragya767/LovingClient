import { chatService } from '@/src/services/chatService';
import { useMemo } from 'react';

import { useChatStore } from "@/src/store/useChatStore";
import { useChatSessions } from "./useChatSessions";

export const useChatActions = () => {
  const currentSessionId = useChatStore((s) => s.currentSessionId);
  const { setCurrentSession } = useChatStore();
  const { data: sessions, invalidateQueries: invalidateSessions } = useChatSessions();

  const currentSession = useMemo(() => {
    if (!sessions || !currentSessionId) return null;
    return sessions.find(session => session.id === currentSessionId) || null;
  }, [sessions, currentSessionId]);

  const startNewConversation = async () => {
    const session = await chatService.startSession();
    console.log("session created - ", session);
    setCurrentSession(session.id);
    await invalidateSessions();
  };

  const selectConversation = async (id: string) => {
    setCurrentSession(id);
  };

  const deleteConversation = async (id: string) => {
    await chatService.deleteSession(id);
    await invalidateSessions();
  };

  return { 
    currentSession,
    startNewConversation,
    selectConversation,
    deleteConversation
  };
};
