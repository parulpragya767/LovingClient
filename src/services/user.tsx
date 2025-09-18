import { apiService } from './api';
import { LoveType, Ritual } from '../types/data-model';
import { loveTypesData } from '../data/loveTypes';

// Mocked user-focused data service. Replace with real backend when available.
export const userService = {
  async getCurrentRituals(): Promise<Ritual[]> {
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
  },

  async getCurrentLoveTypes(): Promise<LoveType[]> {
    // Mock: pick a few from loveTypesData as the user's current focus
    // In a real app, fetch from backend based on user profile
    return loveTypesData.slice(0, 3);
  },
};
