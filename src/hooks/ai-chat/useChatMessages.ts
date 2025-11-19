import { ChatMessage } from "@/src/models/chat";
import { chatService } from "@/src/services/chatService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useChatMessages = (sessionId: string) => {
  const queryClient = useQueryClient();

  const query = useQuery<ChatMessage[], Error>({
    queryKey: ["chat", "messages", sessionId],
    queryFn: async () => {
      const response = await chatService.getHistory(sessionId);
      return response.messages ?? [];
    },
    enabled: !!sessionId,
  });

  // Mutation for sending messages
  const mutation = useMutation<
    ChatMessage[],
    Error,
    { message: ChatMessage; sessionId: string },
    { previousMessages?: ChatMessage[] }
  >({
    mutationFn: async ({ message, sessionId }) => {
      const currentMessages =
        queryClient.getQueryData<ChatMessage[]>(["chat", "messages", sessionId]) ?? [];
      return [...currentMessages, message];
    },
    onMutate: async ({ message, sessionId }) => {
      await queryClient.cancelQueries({ queryKey: ["chat", "messages", sessionId] });

      const previousMessages = queryClient.getQueryData<ChatMessage[]>([
        "chat",
        "messages",
        sessionId,
      ]);

      queryClient.setQueryData<ChatMessage[]>(["chat", "messages", sessionId], (old) => {
        const current = old ?? [];
        return [...current, message];
      });

      return { previousMessages };
    },
    onError: (_error, { sessionId }, context) => {
      if (context?.previousMessages !== undefined) {
        queryClient.setQueryData<ChatMessage[]>(
          ["chat", "messages", sessionId],
          context.previousMessages,
        );
      }
    },
    onSettled: (_data, _error, { sessionId }) => {
      queryClient.invalidateQueries({ queryKey: ["chat", "messages", sessionId] });
    },
  });

  const sendMessage = (message: ChatMessage, sessionId: string) =>
    mutation.mutateAsync({ message, sessionId });

  const invalidateQueries = () => {
    return Promise.all([
      queryClient.invalidateQueries({ queryKey: ['chat', 'messages', sessionId] })
    ]);
  };

  return {
    ...query,
    sendMessage,
    invalidateQueries
  };
};