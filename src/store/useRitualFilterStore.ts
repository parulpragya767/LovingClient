import { SelectedTagState } from "@/src/models/ritualTags";
import { create } from "zustand";

interface RitualFilterStore {
  selectedTags: SelectedTagState;
  keyword: string;
  setSelectedTags: (f: SelectedTagState) => void;
  clearSelectedTags: () => void;
  setKeyword: (keyword: string) => void;
  clearKeyword: () => void;
}

export const useRitualFilterStore = create<RitualFilterStore>((set) => ({
  selectedTags: {
    loveTypes: [],
    ritualModes: [],
    relationalNeeds: [],
    ritualTones: [],
    timeTaken: [],
  },

  keyword: "",

  setSelectedTags: (f) => set({ selectedTags: f }),

  setKeyword: (keyword) => set({ keyword }),

  clearSelectedTags: () =>
    set({
      selectedTags: {
        loveTypes: [],
        ritualModes: [],
        relationalNeeds: [],
        ritualTones: [],
        timeTaken: [],
      },
    }),

  clearKeyword: () => set({ keyword: "" }),
}));