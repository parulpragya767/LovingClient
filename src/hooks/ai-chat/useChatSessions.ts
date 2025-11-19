import { ChatSession } from "@/src/models/chat";
import { chatService } from "@/src/services/chatService";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useChatSessions = () => {
  const queryClient = useQueryClient();
  const query = useQuery<ChatSession[], Error>({
    queryKey: ["chat", "sessions"],
    queryFn: () => chatService.listSessions(),
  });

  const invalidateQueries = () => {
    return Promise.all([
      queryClient.invalidateQueries({ queryKey: ['chat', 'sessions'] })
    ]);
  };

  return {
    ...query,
    invalidateQueries
  };
};