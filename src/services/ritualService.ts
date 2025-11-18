import { RitualControllerApi } from '@/src/api/apis/ritual-controller-api';
import type { Pageable } from '@/src/api/models/pageable';
import { Ritual, toRitual } from '@/src/models/rituals';
import type { RitualFilter, RitualTags } from '@/src/models/ritualTags';
import { PageRitual, toPageRitual } from '../models/pagination';
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
  },

  async getAllTags(): Promise<RitualTags> {
    const res = await api.getAllTags();
    return res.data as RitualTags;
  },

  async search(pageable: Pageable, filter?: RitualFilter): Promise<PageRitual> {
    const res = await api.search({ pageable, ritualFilterDTO: filter });
    return toPageRitual(res.data);
  },
};
