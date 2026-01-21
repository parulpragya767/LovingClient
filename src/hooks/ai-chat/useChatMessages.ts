import { chatKeys } from "@/src/lib/reactQuery/queryKeys";
import { ChatMessage } from "@/src/models/chat";
import { chatService } from "@/src/services/chatService";
import { useQuery } from "@tanstack/react-query";

export const useChatMessages = (sessionId: string) => {
  return useQuery<ChatMessage[], Error>({
    queryKey: chatKeys.messages(sessionId),
    queryFn: async () => {
      const response = await chatService.getChatSessionWithHistory(sessionId);
      return response.messages ?? [];
    },
    enabled: !!sessionId,
  });
};