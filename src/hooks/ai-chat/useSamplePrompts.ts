import { chatService } from "@/src/services/chatService";
import { useQuery } from "@tanstack/react-query";

export const useSamplePrompts = () => {
    return useQuery<string[], Error>({
      queryKey: ["chat", "sample-prompts"],
      queryFn: () => chatService.getSamplePrompts(),
    });
};