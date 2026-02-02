import { ChatMessageRole } from "@/src/api/models/chat-message-role";
import { chatKeys } from "@/src/lib/reactQuery/queryKeys";
import { ChatMessage } from "@/src/models/chat";
import { chatService } from "@/src/services/chatService";
import { useQuery } from "@tanstack/react-query";

export const useChatMessages = (sessionId: string) => {
  return useQuery<ChatMessage[], Error>({
    queryKey: chatKeys.messages(sessionId),
    queryFn: async () => {
      const response = await chatService.getChatSessionWithHistory(sessionId);
      const messages = response.messages ?? [];
      return messages.filter(m =>
        m.role !== ChatMessageRole.System ||
        m.metadata?.recommendationId
      );
    },
    enabled: !!sessionId,
  });
};