import { create } from "zustand";

interface ChatStore {
  currentSessionId: string | null;
  ritualRecommendationId: string | null;
  isRitualRecommendationModalVisible: boolean | false;

  setCurrentSession: (id: string | null) => void;
  setRitualRecommendationId: (id: string | null) => void;
  setIsRitualRecommendationModalVisible: (visible: boolean) => void;
}

export const useChatStore = create<ChatStore>()(
  (set) => ({
    currentSessionId: null,
    ritualRecommendationId: null,
    isRitualRecommendationModalVisible: false,

    setCurrentSession: (id) => set({ currentSessionId: id }),
    setRitualRecommendationId: (id) => set({ ritualRecommendationId: id }),
    setIsRitualRecommendationModalVisible: (visible) => set({ isRitualRecommendationModalVisible: visible }),
  }));