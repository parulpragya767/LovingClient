import { ChatSession } from "@/src/models/chat";
import { chatService } from "@/src/services/chatService";
import { useQuery } from "@tanstack/react-query";

export const useChatSessions = () => {
  const query = useQuery<ChatSession[], Error>({
    queryKey: ["chat", "sessions"],
    queryFn: () => chatService.listSessions(),
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