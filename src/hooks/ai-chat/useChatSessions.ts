import { chatKeys } from "@/src/lib/reactQuery/queryKeys";
import { ChatSession } from "@/src/models/chat";
import { chatService } from "@/src/services/chatService";
import { useQuery } from "@tanstack/react-query";

export const useChatSessions = () => {
  const query = useQuery<ChatSession[], Error>({
    queryKey: chatKeys.sessions(),
    queryFn: chatService.listSessions,
  });

  return {
    ...query,
  };
};