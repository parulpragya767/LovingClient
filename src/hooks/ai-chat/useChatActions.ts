import { chatService } from '@/src/services/chatService';

import { ChatMessage, ChatSession } from '@/src/models/chat';
import { ChatMessageRole } from '@/src/models/enums';
import type { RitualPack } from '@/src/models/ritualPacks';
import { useChatStore } from "@/src/store/useChatStore";
import { useQueryClient } from "@tanstack/react-query";
import { useChatSessions } from "./useChatSessions";

export const useChatActions = () => {
  const queryClient = useQueryClient();
  const { setCurrentSession } = useChatStore();
  const { data: sessions, invalidateQueries: invalidateSessions } = useChatSessions();
  
  const getSessionDetails = async (sessionId: string): Promise<ChatSession | null> => {
    if (!sessions || !sessionId) return null;
    return sessions.find(session => session.id === sessionId) || null;
  };

  const startNewConversation = async (): Promise<string> => {
    const session = await chatService.startSession();
    setCurrentSession(session.id);
    await invalidateSessions();
    return session.id;
  };

  const selectConversation = async (id: string) => {
    setCurrentSession(id);
  };

  const deleteConversation = async (id: string) => {
    await chatService.deleteSession(id);
    await invalidateSessions();
  };

  const appendMessageToStore = (sessionId: string, msg: ChatMessage) => {
    queryClient.setQueryData<ChatMessage[]>(
      ["chat", "messages", sessionId],
      (old = []) => [...old, msg]
    );
  };

  const sendMessageToSession = async (sessionId: string, content: string): Promise<boolean>=> {
    if (!sessionId || !content) return false;

    const userMsg: ChatMessage = {
      id: "id",
      sessionId,
      role: ChatMessageRole.User,
      content,
      createdAt: new Date().toISOString(),
    };

    appendMessageToStore(sessionId, userMsg);

    try {
      const resp = await chatService.sendMessage(sessionId, { content });

      if (resp.assistantResponse) {
        appendMessageToStore(sessionId, resp.assistantResponse);
      }

      return resp.readyForRitualPackRecommendation ?? false;
    } catch (err) {
      queryClient.invalidateQueries({ queryKey: ["chat", "messages", sessionId] });
      throw err;
    }
  };

  const recommendRitualPack = async (sessionId: string): Promise<RitualPack | null> => {
    if (!sessionId) return null;
    try {
      const response = await chatService.recommendRitualPack(sessionId);

      if (response.wrapUpResponse) {
        appendMessageToStore(sessionId, response.wrapUpResponse);
      }

      return response.ritualPack || null;
    } catch (err) {
      queryClient.invalidateQueries({ queryKey: ["chat", "messages", sessionId] });
      throw err;
    }
  };
  
  return { 
    getSessionDetails,
    startNewConversation,
    selectConversation,
    deleteConversation,
    sendMessageToSession,
    recommendRitualPack
  };
};
