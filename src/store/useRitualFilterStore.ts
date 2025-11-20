import { SelectedTagState } from "@/src/models/ritualTags";
import { create } from "zustand";

interface RitualFilterStore {
  selectedTags: SelectedTagState;
  setSelectedTags: (f: SelectedTagState) => void;
  clearSelectedTags: () => void;
}

export const useRitualFilterStore = create<RitualFilterStore>((set) => ({
  selectedTags: {
    loveTypes: [],
    ritualModes: [],
    relationalNeeds: [],
    ritualTones: [],
    timeTaken: [],
  },

  setSelectedTags: (f) => set({ selectedTags: f }),

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
}));