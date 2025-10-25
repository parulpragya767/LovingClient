import type { RitualTags, TagValue } from '@/src/models/ritualTags';
import type { RitualFilter } from '@/src/models/rituals';
import { ritualService } from '@/src/services/ritualService';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

export type SelectedTagState = {
  loveTypes: string[];
  ritualTypes: string[];
  ritualModes: string[];
  emotionalStates: string[];
  relationalNeeds: string[];
};

const emptySelected: SelectedTagState = {
  loveTypes: [],
  ritualTypes: [],
  ritualModes: [],
  emotionalStates: [],
  relationalNeeds: [],
};

export const useRitualTags = () => {
  const { data, isLoading, error } = useQuery<RitualTags, Error>({
    queryKey: ['ritual-tags'],
    queryFn: ritualService.getAllTags,
    staleTime: 10 * 60 * 1000,
  });

  const [selected, setSelected] = useState<SelectedTagState>(emptySelected);

  const toggle = (category: keyof SelectedTagState, value: string) => {
    setSelected((prev) => {
      const exists = prev[category].includes(value);
      const nextVals = exists
        ? prev[category].filter((v) => v !== value)
        : [...prev[category], value];
      return { ...prev, [category]: nextVals } as SelectedTagState;
    });
  };

  const clearAll = () => setSelected(emptySelected);

  const buildFilter = useMemo(() => {
    const f: Partial<RitualFilter> = {};
    if (selected.loveTypes.length) f.loveTypes = selected.loveTypes as any;
    if (selected.ritualTypes.length) f.ritualTypes = selected.ritualTypes as any;
    if (selected.ritualModes.length) f.ritualModes = selected.ritualModes as any;
    if (selected.emotionalStates.length) f.emotionalStates = selected.emotionalStates as any;
    if (selected.relationalNeeds.length) f.relationalNeeds = selected.relationalNeeds as any;
    return f as RitualFilter;
  }, [selected]);

  const selectedChips = useMemo(() => {
    const chips: string[] = [];
    const pushDisplayNames = (values?: TagValue[], keys: string[] = []) => {
      const map = new Map((values || []).map((v) => [v.key, v.displayName || v.key || '']));
      keys.forEach((k) => chips.push(map.get(k) || k));
    };
    pushDisplayNames(data?.loveTypes?.values, selected.loveTypes);
    pushDisplayNames(data?.ritualTypes?.values, selected.ritualTypes);
    pushDisplayNames(data?.ritualModes?.values, selected.ritualModes);
    pushDisplayNames(data?.emotionalStates?.values, selected.emotionalStates);
    pushDisplayNames(data?.relationalNeeds?.values, selected.relationalNeeds);
    return chips;
  }, [data, selected]);

  return {
    data,
    isLoading,
    error,
    selected,
    setSelected,
    toggle,
    clearAll,
    filter: buildFilter,
    selectedChips,
  };
};
