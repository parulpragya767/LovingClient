import { Ritual, toRitual } from '@/src/models/ritual';
import { ritualService } from '@/src/services/ritualService';

export const apiService = {
  async getRituals(): Promise<Ritual[]> {
    console.log('Fetching rituals from backend...');
    const response = await ritualService.getAll();
    return response.map(toRitual);
  },

  async getRitualById(id: string): Promise<Ritual | undefined> {
    console.log(`Fetching ritual with id: ${id} from backend...`);
    try {
      const response = await ritualService.getById(id);
      return toRitual(response);
    } catch (error) {
      console.error(`Error fetching ritual ${id}:`, error);
      return undefined;
    }
  },

  // Note: The following methods will be updated when we implement ritual packs from the backend
  async getRitualPacks(): Promise<any[]> {
    console.log('Fetching ritual packs from backend...');
    // TODO: Implement actual API call when backend is ready
    return [];
  },

  async getRitualPackById(id: string): Promise<any | undefined> {
    console.log(`Fetching ritual pack with id: ${id}...`);
    // TODO: Implement actual API call when backend is ready
    return undefined;
  },
};