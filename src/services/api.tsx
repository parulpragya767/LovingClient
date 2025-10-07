import { RitualControllerApi } from '../api/apis/ritual-controller-api';
import { RitualDTO } from '../api/models/ritual-dto';
import { Ritual } from '../types/data-model';

const ritualApi = new RitualControllerApi();

export const apiService = {
  async getRituals(): Promise<Ritual[]> {
    console.log('Fetching rituals from backend...');
    const response = await ritualApi.getAll();
    return response.data.map((r: RitualDTO): Ritual => ({
      id: r.id || '',
      name: r.title || 'Unnamed Ritual',
      title: r.title || '',
      description: r.fullDescription || r.shortDescription || '',
      howTo: '',
      benefits: '',
      tags: [],
      isCurrent: false
    }));
  },

  async getRitualById(id: string): Promise<Ritual | undefined> {
    console.log(`Fetching ritual with id: ${id} from backend...`);
    try {
      const response = await ritualApi.getById({ id });
      const r = response.data;
      return {
        id: r.id || '',
        name: r.title || 'Unnamed Ritual',
        title: r.title || '',
        description: r.fullDescription || r.shortDescription || '',
        howTo: '',
        benefits: '',
        tags: [],
        isCurrent: false
      };
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