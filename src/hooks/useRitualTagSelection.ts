import { useCallback, useMemo } from 'react';
import type { SelectedTagState } from '@/src/hooks/useRitualTags';
import type { RitualFilter } from '@/src/models/rituals';
import { useRitualTags } from '@/src/hooks/useRitualTags';
import { useRitualSearchStore } from '@/src/hooks/useRitualSearchStore';

export function useRitualTagSelection() {
  const { data: tagData } = useRitualTags();
  const { state, actions } = useRitualSearchStore();

  const valueToDisplayMaps = useMemo(() => ({
    loveTypes: new Map((tagData?.loveTypes?.values || []).map(v => [v.key || '', v.displayName || v.key || ''])),
    ritualTypes: new Map((tagData?.ritualTypes?.values || []).map(v => [v.key || '', v.displayName || v.key || ''])),
    ritualModes: new Map((tagData?.ritualModes?.values || []).map(v => [v.key || '', v.displayName || v.key || ''])),
    emotionalStates: new Map((tagData?.emotionalStates?.values || []).map(v => [v.key || '', v.displayName || v.key || ''])),
    relationalNeeds: new Map((tagData?.relationalNeeds?.values || []).map(v => [v.key || '', v.displayName || v.key || ''])),
  }), [tagData]);

  const displayToValueMaps = useMemo(() => ({
    loveTypes: new Map((tagData?.loveTypes?.values || []).map(v => [v.displayName || v.key || '', v.key || ''])),
    ritualTypes: new Map((tagData?.ritualTypes?.values || []).map(v => [v.displayName || v.key || '', v.key || ''])),
    ritualModes: new Map((tagData?.ritualModes?.values || []).map(v => [v.displayName || v.key || '', v.key || ''])),
    emotionalStates: new Map((tagData?.emotionalStates?.values || []).map(v => [v.displayName || v.key || '', v.key || ''])),
    relationalNeeds: new Map((tagData?.relationalNeeds?.values || []).map(v => [v.displayName || v.key || '', v.key || ''])),
  }), [tagData]);

  const buildFilter = (selected: SelectedTagState): RitualFilter | undefined => {
    const f: any = {};
    if (selected.loveTypes.length) f.loveTypes = selected.loveTypes;
    if (selected.ritualTypes.length) f.ritualTypes = selected.ritualTypes;
    if (selected.ritualModes.length) f.ritualModes = selected.ritualModes;
    if (selected.emotionalStates.length) f.emotionalStates = selected.emotionalStates;
    if (selected.relationalNeeds.length) f.relationalNeeds = selected.relationalNeeds;
    return Object.keys(f).length ? f : undefined;
  };

  const buildChips = (selected: SelectedTagState): string[] => {
    const toDisplay = (map: Map<string, string>, keys: string[]) => keys.map(k => map.get(k) || k);
    return [
      ...toDisplay(valueToDisplayMaps.loveTypes, selected.loveTypes),
      ...toDisplay(valueToDisplayMaps.ritualTypes, selected.ritualTypes),
      ...toDisplay(valueToDisplayMaps.ritualModes, selected.ritualModes),
      ...toDisplay(valueToDisplayMaps.emotionalStates, selected.emotionalStates),
      ...toDisplay(valueToDisplayMaps.relationalNeeds, selected.relationalNeeds),
    ];
  };

  const toggle = useCallback(async (category: keyof SelectedTagState, key: string) => {
    const exists = state.selected[category].includes(key);
    const nextSelected: SelectedTagState = {
      ...state.selected,
      [category]: exists
        ? state.selected[category].filter(v => v !== key)
        : [...state.selected[category], key],
    } as SelectedTagState;

    const nextFilter = buildFilter(nextSelected);
    const nextChips = buildChips(nextSelected);
    actions.setSelection({ selected: nextSelected, chips: nextChips, filter: nextFilter });
    await actions.runSearch(true);
  }, [actions, state.selected, valueToDisplayMaps]);

  const removeChip = useCallback(async (label: string) => {
    const nextSelected: SelectedTagState = { ...state.selected } as SelectedTagState;
    let removed = false;
    (Object.keys(displayToValueMaps) as Array<keyof typeof displayToValueMaps>).some(cat => {
      const key = displayToValueMaps[cat].get(label);
      if (key && nextSelected[cat].includes(key)) {
        nextSelected[cat] = nextSelected[cat].filter(k => k !== key);
        removed = true;
        return true;
      }
      return false;
    });
    if (!removed) return;

    const nextFilter = buildFilter(nextSelected);
    const nextChips = buildChips(nextSelected);
    actions.setSelection({ selected: nextSelected, chips: nextChips, filter: nextFilter });
    await actions.runSearch(true);
  }, [actions, state.selected, displayToValueMaps, valueToDisplayMaps]);

  const clearAll = useCallback(async () => {
    actions.clear();
    await actions.runSearch(true);
  }, [actions]);

  return {
    selected: state.selected,
    chips: state.chips,
    toggle,
    removeChip,
    clearAll,
  } as const;
}
