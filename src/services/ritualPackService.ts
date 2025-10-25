import { RitualPackControllerApi } from '@/src/api/apis/ritual-pack-controller-api';
import { RitualPack, toRitualPack } from '@/src/models/ritualPacks';
import apiClient from './apiClient';

// Initialize the API with our configured axios instance
const api = new RitualPackControllerApi(undefined, '', apiClient);

export const ritualPackService = {
  async getAll(): Promise<RitualPack[]> {
    const res = await api.getAll1();
    return res.data.map(toRitualPack);
  },

  async getById(id: string): Promise<RitualPack> {
    const res = await api.getById1({ id });
    return toRitualPack(res.data);
  },
};
