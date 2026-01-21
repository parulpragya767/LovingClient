import { chatKeys } from "@/src/lib/reactQuery/queryKeys";
import { chatService } from "@/src/services/chatService";
import { useQuery } from "@tanstack/react-query";

const DEFAULT_PROMPTS = [
  "Help me reflect on my day",
  "Guide me through calming down",
  "Help me understand my emotions",
];

export const useSamplePrompts = () => {
    return useQuery<string[], Error>({
      queryKey: chatKeys.samplePrompts(),
      queryFn: async () => {
        try {
          const res = await chatService.getSamplePrompts();
          return res;
        } catch (e) {
          console.warn("Failed to fetch sample prompts, using defaults.");
          return DEFAULT_PROMPTS;
        }
      },
    });
};