import { chatService } from '@/src/services/chatService';

import { chatKeys } from '@/src/lib/reactQuery/queryKeys';
import { ChatMessage, ChatSession } from '@/src/models/chat';
import { ChatMessageRole } from '@/src/models/enums';
import type { RitualPack } from '@/src/models/ritualPacks';
import { useChatStore } from "@/src/store/useChatStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useChatSessions } from "./useChatSessions";

export const useChatActions = () => {
  const queryClient = useQueryClient();
  const { setCurrentSession } = useChatStore();
  const { data: sessions } = useChatSessions();
  
  const getSessionDetails = async (sessionId: string): Promise<ChatSession | null> => {
    if (!sessions || !sessionId) return null;
    return sessions.find(session => session.id === sessionId) || null;
  };

  const startNewConversation = useMutation({
    mutationFn: async (): Promise<string> => {
      const session = await chatService.startSession();
      setCurrentSession(session.id);
      return session.id;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: chatKeys.sessions() })
    },
    
    onError: (error) => {
      console.error('Failed to start new conversation', error);
    },
  });

  const selectConversation = async (id: string) => {
    setCurrentSession(id);
  };

  const deleteConversation = useMutation({
    mutationFn: async (id: string) => await chatService.deleteSession(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: chatKeys.sessions() })
    },

    onError: (error) => {
      console.error('Failed to delete conversation', error);
    },
  });

  const appendMessageToStore = (sessionId: string, msg: ChatMessage) => {
    queryClient.setQueryData<ChatMessage[]>(
      chatKeys.messages(sessionId),
      (old = []) => [...old, msg]
    );
  };

  const sendMessageToSession = useMutation({
    mutationFn: async ({
      sessionId,
      content,
    }: {
      sessionId: string;
      content: string;
    }): Promise<boolean> => {
      if (!sessionId || !content) return false;

      const userMsg: ChatMessage = {
        id: "id",
        sessionId,
        role: ChatMessageRole.User,
        content,
        createdAt: new Date().toISOString(),
      };

      appendMessageToStore(sessionId, userMsg);

      const resp = await chatService.sendMessage(sessionId, { content });

      if (resp.assistantResponse) {
        appendMessageToStore(sessionId, resp.assistantResponse);
      }

      return resp.readyForRitualPackRecommendation ?? false;
    },

    onError: (error, variables) => {
      const { sessionId } = variables;
      queryClient.invalidateQueries({ queryKey: chatKeys.messages(sessionId) });
      console.error('Failed to send message', error);
    },
  });

  const recommendRitualPack = useMutation({
    mutationFn: async (sessionId: string): Promise<RitualPack | null> => {
      if (!sessionId) return null;

      const response = await chatService.recommendRitualPack(sessionId);
      if (response.wrapUpResponse) {
        appendMessageToStore(sessionId, response.wrapUpResponse);
      }

      return response.ritualPack || null;
    },

    onSuccess: (_data, sessionId) => {
      queryClient.invalidateQueries({ queryKey: chatKeys.messages(sessionId) });
    },

    onError: (error, sessionId) => {
      queryClient.invalidateQueries({ queryKey: chatKeys.messages(sessionId) });
      console.error('Failed to recommend ritual pack', error);
    },
  });
  
  return { 
    getSessionDetails,
    startNewConversation,
    selectConversation,
    deleteConversation,
    sendMessageToSession,
    recommendRitualPack
  };
};
