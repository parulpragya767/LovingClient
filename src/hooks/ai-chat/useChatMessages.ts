import { ChatMessage } from "@/src/models/chat";
import { ChatMessageRole } from '@/src/models/enums';
import type { RitualPack } from '@/src/models/ritualPacks';
import { chatService } from "@/src/services/chatService";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useChatMessages = (sessionId: string) => {
  const queryClient = useQueryClient();

  const query = useQuery<ChatMessage[], Error>({
    queryKey: ["chat", "messages", sessionId],
    queryFn: async () => {
      const response = await chatService.getHistory(sessionId);
      return response.messages ?? [];
    },
    enabled: !!sessionId,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: 1,
  });

  const appendMessage = (message: ChatMessage) => {
    queryClient.setQueryData<ChatMessage[]>(
      ["chat", "messages", sessionId],
      (old = []) => [...old, message]
    );
  };

  const sendMessage = async (content: string): Promise<boolean> => {
    console.log("currentSessionId : content - ", sessionId, content);
    if (!sessionId) return false;

    const userMsg: ChatMessage = {
      id: 'id',
      sessionId: sessionId,
      role: ChatMessageRole.User,
      content,
      createdAt: new Date().toISOString(),
    };

    appendMessage(userMsg);

    const resp = await chatService.sendMessage(sessionId, {
      content,
    });

    if (resp.assistantResponse) {
      appendMessage(resp.assistantResponse);
    }

    return resp.readyForRitualPackRecommendation ?? false;
  };

  const recommendRitualPack = async (): Promise<RitualPack | null> => {
    if (!sessionId) return null;
    const response = await chatService.recommendRitualPack(sessionId);
      
      // Send the wrap-up response to the chat if it exists
      if (response.wrapUpResponse) {
        appendMessage(response.wrapUpResponse);
      }
      
      return response.ritualPack || null;
  };
  
  const invalidateQueries = () => {
    return Promise.all([
      queryClient.invalidateQueries({ queryKey: ['chat', 'messages', sessionId] })
    ]);
  };

  return {
    ...query,
    sendMessage,
    recommendRitualPack,
    invalidateQueries,
  };
};