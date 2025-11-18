import { useRitualSearchStore } from '@/src/hooks/useRitualSearch';
import type { SelectedTagState } from '@/src/hooks/useRitualTags';
import { useRitualTags } from '@/src/hooks/useRitualTags';
import type { RitualFilter } from '@/src/models/rituals';
import { useCallback, useMemo } from 'react';

export function useRitualTagSelection() {
  const { data: tagData } = useRitualTags();
  const { state, actions } = useRitualSearchStore();

  const valueToDisplayMaps = useMemo(() => ({
    loveTypes: new Map((tagData?.loveTypes?.values || []).map(v => [v.key || '', v.displayName || v.key || ''])),
    ritualModes: new Map((tagData?.ritualModes?.values || []).map(v => [v.key || '', v.displayName || v.key || ''])),
    timeTaken: new Map((tagData?.timeTaken?.values || []).map(v => [v.key || '', v.displayName || v.key || ''])),
    relationalNeeds: new Map((tagData?.relationalNeeds?.values || []).map(v => [v.key || '', v.displayName || v.key || ''])),
    ritualTones: new Map((tagData?.ritualTones?.values || []).map(v => [v.key || '', v.displayName || v.key || ''])),
  }), [tagData]);

  const displayToValueMaps = useMemo(() => ({
    loveTypes: new Map((tagData?.loveTypes?.values || []).map(v => [v.displayName || v.key || '', v.key || ''])),
    ritualModes: new Map((tagData?.ritualModes?.values || []).map(v => [v.displayName || v.key || '', v.key || ''])),
    timeTaken: new Map((tagData?.timeTaken?.values || []).map(v => [v.displayName || v.key || '', v.key || ''])),
    relationalNeeds: new Map((tagData?.relationalNeeds?.values || []).map(v => [v.displayName || v.key || '', v.key || ''])),
    ritualTones: new Map((tagData?.ritualTones?.values || []).map(v => [v.displayName || v.key || '', v.key || ''])),
  }), [tagData]);

  const buildFilter = (selected: SelectedTagState): RitualFilter | undefined => {
    const f: any = {};
    if (selected.loveTypes.length) f.loveTypes = selected.loveTypes;
    if (selected.ritualModes.length) f.ritualModes = selected.ritualModes;
    if (selected.timeTaken.length) f.timeTaken = selected.timeTaken;
    if (selected.relationalNeeds.length) f.relationalNeeds = selected.relationalNeeds;
    if (selected.ritualTones.length) f.ritualTones = selected.ritualTones;
    return Object.keys(f).length ? f : undefined;
  };

  const buildChips = (selected: SelectedTagState): string[] => {
    const toDisplay = (map: Map<string, string>, keys: readonly string[] | string[]) => keys.map(k => map.get(k) || k);
    return [
      ...toDisplay(valueToDisplayMaps.loveTypes, selected.loveTypes),
      ...toDisplay(valueToDisplayMaps.ritualModes, selected.ritualModes),
      ...toDisplay(valueToDisplayMaps.timeTaken, selected.timeTaken),
      ...toDisplay(valueToDisplayMaps.relationalNeeds, selected.relationalNeeds),
      ...toDisplay(valueToDisplayMaps.ritualTones, selected.ritualTones),
    ];
  };

  const toggle = useCallback(async (category: keyof SelectedTagState, key: string) => {
    const exists = (state.selected[category] as unknown as string[]).includes(key);
    const nextSelected: SelectedTagState = {
      ...state.selected,
      [category]: exists
        ? (state.selected[category] as unknown as string[]).filter(v => v !== key) as any
        : ([...state.selected[category], key] as any),
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
      if (key && (nextSelected[cat] as unknown as string[]).includes(key)) {
        nextSelected[cat] = (nextSelected[cat] as unknown as string[]).filter(k => k !== key) as any;
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
