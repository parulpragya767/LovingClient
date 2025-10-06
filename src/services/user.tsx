import { LoveTypeInfo } from '../api/models/love-type-info';
import { useLoveTypes } from '../hooks/useLoveTypes';
import { LoveType, Ritual } from '../types/data-model';
import { apiService } from './api';

export const useUserService = () => {
  const { data: allLoveTypes = [], isLoading: isLoadingLoveTypes } = useLoveTypes();

  const getCurrentRituals = async (): Promise<Ritual[]> => {
    const [rituals, packs] = await Promise.all([
      apiService.getRituals(),
      apiService.getRitualPacks(),
    ]);

    const currentPackRitualIds = new Set(
      packs.filter(p => p.isCurrent).flatMap(p => p.ritualIds)
    );

    // Combine: all rituals from current packs + current individual rituals not in packs
    const ritualsById: Record<string, Ritual> = {};
    rituals.forEach(r => { ritualsById[r.id] = r; });

    const packRituals: Ritual[] = Array.from(currentPackRitualIds)
      .map(id => ritualsById[id])
      .filter((r): r is Ritual => Boolean(r));

    const individualCurrent = rituals.filter(r => r.isCurrent && !currentPackRitualIds.has(r.id));

    return [...packRituals, ...individualCurrent];
  };

  const mapToLoveType = (loveTypeInfo: LoveTypeInfo): LoveType => {
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
  };

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

  const getCurrentLoveTypes = (): LoveType[] => {
    // Return first 3 love types as the user's current focus
    // In a real app, we would filter based on user preferences
    return allLoveTypes.slice(0, 3).map(mapToLoveType);
  };

  return {
    getCurrentRituals,
    getCurrentLoveTypes,
    isLoadingLoveTypes
  };
};
