import { chatService } from "@/src/services/chatService";
import { useQuery } from "@tanstack/react-query";

const DEFAULT_PROMPTS = [
  "Help me reflect on my day",
  "Guide me through calming down",
  "Help me understand my emotions",
];

export const useSamplePrompts = () => {
    return useQuery<string[], Error>({
      queryKey: ["chat", "sample-prompts"],
      queryFn: async () => {
        try {
          const res = await chatService.getSamplePrompts();
          return res;
        } catch (e) {
          console.warn("Failed to fetch sample prompts, using defaults.");
          return DEFAULT_PROMPTS;
        }
      },
      staleTime: 0,
      gcTime: 5 * 60 * 1000,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchOnMount: true,
      retry: 1,
    });
};