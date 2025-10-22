import { RitualControllerApi } from '@/src/api/apis/ritual-controller-api';
import { Ritual, toRitual } from '@/src/models/ritual';

const api = new RitualControllerApi();

export const ritualService = {
  async getAll(): Promise<Ritual[]> {
    const res = await api.getAll();
    return res.data.map(toRitual);
  },

  async getById(id: string): Promise<Ritual> {
    const res = await api.getById({ id });
    return toRitual(res.data);
  }
};
