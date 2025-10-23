import { RitualControllerApi } from '@/src/api/apis/ritual-controller-api';
import { Ritual, toRitual } from '@/src/models/rituals';
import apiClient from './apiClient';

// Initialize the API with our configured axios instance
const api = new RitualControllerApi(undefined, '', apiClient);

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
