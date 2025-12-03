import { ChatMessage } from "@/src/models/chat";
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

  const invalidateQueries = () => {
    return Promise.all([
      queryClient.invalidateQueries({ queryKey: ['chat', 'messages', sessionId] })
    ]);
  };

  return {
    ...query,
    invalidateQueries,
  };
};