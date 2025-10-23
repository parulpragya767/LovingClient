import { useRitualPacks } from '@/src/hooks/useRitualPacks';
import { useRituals } from '@/src/hooks/useRituals';
import { useCallback } from 'react';
import { LoveTypeInfo } from '../api/models/love-type-info';
import { useLoveTypes } from '../hooks/useLoveTypes';
import { Ritual } from '../models/rituals';
import { LoveType } from '../types/data-model';

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

  const mapToLoveType = useCallback((loveTypeInfo: LoveTypeInfo): LoveType => {
    // Map LoveTypeInfo to LoveType
    const howToSection = loveTypeInfo.sections?.find(s => s.title === 'How to Express');
    const howToExpress = (howToSection?.bullets || [])
      .map(bullet => bullet.text)
      .filter((text): text is string => text !== undefined);
      
    return {
      id: loveTypeInfo.id?.toString() || '',
      name: loveTypeInfo.title || '',
      description: loveTypeInfo.description || '',
      emoji: getEmojiForLoveType(loveTypeInfo.loveType || ''),
      longDescription: loveTypeInfo.subtitle,
      howToExpress
    };
  }, []);

  const getEmojiForLoveType = (loveType: string): string => {
    // Map love type to emoji
    const emojiMap: Record<string, string> = {
      'BELONG': '🤝',
      'FIRE': '🔥',
      'SPARK': '⚡',
      // Add more mappings as needed
    };
    return emojiMap[loveType] || '❤️';
  };

  const getCurrentLoveTypes = useCallback((): LoveType[] => {
    // Return first 3 love types as the user's current focus
    // In a real app, we would filter based on user preferences
    return allLoveTypes.slice(0, 3).map(mapToLoveType);
  }, [allLoveTypes, mapToLoveType]);

  return {
    getCurrentRituals,
    getCurrentLoveTypes,
    isLoadingLoveTypes
  };
};
