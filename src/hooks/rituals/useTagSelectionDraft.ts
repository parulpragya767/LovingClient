import { Chip, SelectedTagState, TagValue } from '@/src/models/ritualTags';
import { useRitualFilterStore } from '@/src/store/useRitualFilterStore';
import { useCallback, useMemo, useState } from 'react';

export const useTagSelectionDraft = () => {
  const { selectedTags, setSelectedTags } = useRitualFilterStore();
  const [selectedDraft, setSelectedDraft] = useState(selectedTags);
  
  // Toggle selection
  const toggleDraft = useCallback(
    (category: keyof SelectedTagState, value: TagValue) => {
      setSelectedDraft({
        ...selectedDraft,
        [category]: selectedDraft[category].some(v => v.key === value.key)
          ? selectedDraft[category].filter(v => v.key !== value.key)
          : [...selectedDraft[category], value]
      });
    },
    [selectedDraft, setSelectedDraft]
  );

  // Remove chip
  const removeChipDraft = useCallback((chip: Chip) => {
    setSelectedDraft({
      ...selectedDraft,
      [chip.category]: selectedDraft[chip.category].filter(v => v.key !== chip.key)
    });
  }, [selectedDraft, setSelectedDraft]);

  // Clear all
  const clearAllDraft = useCallback(() => {
    setSelectedDraft({
        loveTypes: [],
        ritualModes: [],
        relationalNeeds: [],
        ritualTones: [],
        timeTaken: [],
      });
  }, [setSelectedDraft]);

  // Apply draft selection to store
  const applyDraft = useCallback(() => {
    setSelectedTags(selectedDraft);
  }, [selectedDraft, setSelectedTags]);

  // Build chips array for UI
  const chipsDraft = useMemo<Chip[]>(() => {
    return Object.entries(selectedDraft).flatMap(([category, list]) =>
      list.map(v => ({
        key: v.key,
        displayName: v.displayName,
        category: category as keyof SelectedTagState
      }))
    );
  }, [selectedDraft]);

  return {
    selectedDraft,
    chipsDraft,
    toggleDraft,
    removeChipDraft,
    clearAllDraft,
    applyDraft,
  };
};