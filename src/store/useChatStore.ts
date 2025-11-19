import { create } from "zustand";

interface ChatStore {
  currentSessionId: string | null;

  setCurrentSession: (id: string | null) => void;
}

export const useChatStore = create<ChatStore>()(
  (set) => ({
    currentSessionId: null,

    setCurrentSession: (id) => set({ currentSessionId: id }),
  }));