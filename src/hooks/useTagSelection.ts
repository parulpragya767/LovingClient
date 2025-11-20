import { LoveType, RelationalNeed, RitualMode, RitualTone, TimeTaken } from '@/src/models/enums';
import { Chip, RitualFilter, SelectedTagState, TagValue } from '@/src/models/ritualTags';
import { useRitualFilterStore } from '@/src/store/useRitualFilterStore';
import { useCallback, useMemo } from 'react';

export const useTagSelection = () => {
  const { selectedTags: selected, setSelectedTags, clearSelectedTags } = useRitualFilterStore();

  // Toggle selection
  const toggle = useCallback(
    (category: keyof SelectedTagState, value: TagValue) => {
      setSelectedTags({
        ...selected,
        [category]: selected[category].some(v => v.key === value.key)
          ? selected[category].filter(v => v.key !== value.key)
          : [...selected[category], value]
      });
    },
    [selected, setSelectedTags]
  );

  // Remove chip
  const removeChip = useCallback((chip: Chip) => {
    setSelectedTags({
      ...selected,
      [chip.category]: selected[chip.category].filter(v => v.key !== chip.key)
    });
  }, [selected, setSelectedTags]);

  // Clear all
  const clearAll = useCallback(() => {
    clearSelectedTags();
  }, [clearSelectedTags]);

  // Build chips array for UI
  const chips = useMemo<Chip[]>(() => {
    return Object.entries(selected).flatMap(([category, list]) =>
      list.map(v => ({
        key: v.key,
        displayName: v.displayName,
        category: category as keyof SelectedTagState
      }))
    );
  }, [selected]);

  // Build filter for API
  const filter = useMemo<RitualFilter>(() => {
    const filter: RitualFilter = {};

    if (selected.loveTypes.length)
      filter.loveTypes = selected.loveTypes.map(v => v.key as LoveType);

    if (selected.ritualModes.length)
      filter.ritualModes = selected.ritualModes.map(v => v.key as RitualMode);

    if (selected.timeTaken.length)
      filter.timeTaken = selected.timeTaken.map(v => v.key as TimeTaken);

    if (selected.relationalNeeds.length)
      filter.relationalNeeds = selected.relationalNeeds.map(v => v.key as RelationalNeed);

    if (selected.ritualTones.length)
      filter.ritualTones = selected.ritualTones.map(v => v.key as RitualTone);

    return filter;
  }, [selected]);

  return {
    selected,
    toggle,
    removeChip,
    clearAll,
    chips,
    filter
  };
};