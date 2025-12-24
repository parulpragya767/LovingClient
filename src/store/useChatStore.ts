import { create } from "zustand";

interface ChatStore {
  currentSessionId: string | null;
  ritualRecommendationId: string | null;
  recommendationChatSessionId: string | null;
  isRitualRecommendationModalVisible: boolean | false;

  setCurrentSession: (id: string | null) => void;
  setRitualRecommendationId: (id: string | null) => void;
  setRecommendationChatSessionId: (id: string | null) => void;
  setIsRitualRecommendationModalVisible: (visible: boolean) => void;
}

export const useChatStore = create<ChatStore>()(
  (set) => ({
    currentSessionId: null,
    ritualRecommendationId: null,
    recommendationChatSessionId: null,
    isRitualRecommendationModalVisible: false,

    setCurrentSession: (id) => set({ currentSessionId: id }),
    setRitualRecommendationId: (id) => set({ ritualRecommendationId: id }),
    setRecommendationChatSessionId: (id) => set({ recommendationChatSessionId: id }),
    setIsRitualRecommendationModalVisible: (visible) => set({ isRitualRecommendationModalVisible: visible }),
  }));