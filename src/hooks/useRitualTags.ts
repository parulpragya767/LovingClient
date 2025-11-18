import type { RitualTags, TagValue } from '@/src/models/ritualTags';
import type { RitualFilter } from '@/src/models/rituals';
import { ritualService } from '@/src/services/ritualService';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

export type SelectedTagState = {
  loveTypes: string[];
  ritualModes: string[];
  timeTaken: string[];
  relationalNeeds: string[];
  ritualTones: string[];
};

const emptySelected: SelectedTagState = {
  loveTypes: [],
  ritualModes: [],
  timeTaken: [],
  relationalNeeds: [],
  ritualTones: [],
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
      const list = prev[category] as unknown as string[];
      const exists = list.includes(value);
      const nextVals = exists ? list.filter((v) => v !== value) : [...list, value];
      return { ...prev, [category]: nextVals } as SelectedTagState;
    });
  };

  const clearAll = () => setSelected(emptySelected);

  const buildFilter = useMemo((): RitualFilter | undefined => {
    const f: Partial<RitualFilter> = {};
    if (selected.loveTypes.length) f.loveTypes = selected.loveTypes as any;
    if (selected.ritualModes.length) f.ritualModes = selected.ritualModes as any;
    if (selected.timeTaken.length) f.timeTaken = selected.timeTaken as any;
    if (selected.relationalNeeds.length) f.relationalNeeds = selected.relationalNeeds as any;
    if (selected.ritualTones.length) f.ritualTones = selected.ritualTones as any;
    return Object.keys(f).length ? (f as RitualFilter) : undefined;
  }, [selected]);

  const selectedChips = useMemo(() => {
    const chips: string[] = [];
    const pushDisplayNames = (values?: TagValue[], keys: string[] = []) => {
      const map = new Map((values || []).map((v) => [v.key, v.displayName || v.key || '']));
      keys.forEach((k) => chips.push(map.get(k) || k));
    };
    pushDisplayNames(data?.loveTypes?.values, selected.loveTypes as unknown as string[]);
    pushDisplayNames(data?.ritualModes?.values, selected.ritualModes as unknown as string[]);
    pushDisplayNames(data?.timeTaken?.values, selected.timeTaken as unknown as string[]);
    pushDisplayNames(data?.relationalNeeds?.values, selected.relationalNeeds as unknown as string[]);
    pushDisplayNames(data?.ritualTones?.values, selected.ritualTones as unknown as string[]);
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
