import { useRitualPacks } from '@/src/hooks/useRitualPacks';
import { useRituals } from '@/src/hooks/useRituals';
import { useCallback } from 'react';
import { useLoveTypes } from '../hooks/useLoveTypes';
import { Ritual } from '../models/rituals';
import { LoveLensInfo } from '../models/loveLens';

export const useUserService = () => {
  const { data: allLoveTypes = [], isLoading: isLoadingLoveTypes } = useLoveTypes();
  const { data: ritualsData = [] } = useRituals();
  const { data: packsData = [] } = useRitualPacks();

  const getCurrentRituals = useCallback(async (): Promise<Ritual[]> => {
    const rituals = ritualsData;
    const packs = packsData as unknown as { ritualIds?: string[]; isCurrent?: boolean }[];

    const currentPackRitualIds = new Set(
      packs.filter(p => p?.isCurrent).flatMap(p => p.ritualIds || [])
    );

    const ritualsById: Record<string, Ritual> = {};
    rituals.forEach(r => { ritualsById[r.id] = r; });

    const packRituals: Ritual[] = Array.from(currentPackRitualIds)
      .map(id => ritualsById[id])
      .filter((r): r is Ritual => Boolean(r));

    const individualCurrent = rituals.filter(r => r.isCurrent && !currentPackRitualIds.has(r.id));

    return [...packRituals, ...individualCurrent];
  }, [ritualsData, packsData]);

  const getCurrentLoveTypes = useCallback((): LoveLensInfo[] => {
    // Return first 3 love types as the user's current focus
    // In a real app, we would filter based on user preferences
    return allLoveTypes.slice(0, 3);
  }, [allLoveTypes]);

  return {
    getCurrentRituals,
    getCurrentLoveTypes,
    isLoadingLoveTypes
  };
};
