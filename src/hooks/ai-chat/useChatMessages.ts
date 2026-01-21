import { ChatMessage } from "@/src/models/chat";
import { chatService } from "@/src/services/chatService";
import { useQuery } from "@tanstack/react-query";

export const useChatMessages = (sessionId: string) => {
  const query = useQuery<ChatMessage[], Error>({
    queryKey: ["chat", "messages", sessionId],
    queryFn: async () => {
      const response = await chatService.getChatSessionWithHistory(sessionId);
      return response.messages ?? [];
    },
    enabled: !!sessionId,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: 1,
  });

  return {
    ...query,
  };
};