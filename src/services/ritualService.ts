import { RitualControllerApi } from '@/src/api/apis/ritual-controller-api';
import type { Pageable } from '@/src/api/models/pageable';
import type { RitualFilter } from '@/src/models/rituals';
import { Ritual, toRitual } from '@/src/models/rituals';
import type { RitualTags } from '@/src/models/ritualTags';
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

  async search(pageable: Pageable, filter?: RitualFilter): Promise<{
    items: Ritual[];
    page: number;
    size: number;
    totalPages: number;
    totalElements: number;
    last: boolean;
  }> {
    const res = await api.search({ pageable, ritualFilterDTO: filter });
    const data = res.data;
    return {
      items: (data.content || []).map(toRitual),
      page: data.number ?? 0,
      size: data.size ?? pageable.size ?? 0,
      totalPages: data.totalPages ?? 0,
      totalElements: data.totalElements ?? 0,
      last: data.last ?? true,
    };
  },
};
