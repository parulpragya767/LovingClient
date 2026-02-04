import { RitualHistoryControllerApi } from '@/src/api/apis/ritual-history-controller-api';
import type { CurrentRituals, RitualHistory, RitualHistoryCreateRequest, RitualHistoryUpdate, UserRitual, UserRitualPack } from '@/src/models/ritualHistory';
import { toCurrentRituals, toUserRitualPack } from '@/src/models/ritualHistory';
import apiClient from '@/src/services/apiClient';

// Initialize the API with our configured axios instance
const api = new RitualHistoryControllerApi(undefined, '', apiClient);

export const ritualHistoryService = {
  async list(): Promise<UserRitual[]> {
    const res = await api.list();
    return (res.data || []) as UserRitual[];
  },

  async listCurrent(): Promise<CurrentRituals> {
    const res = await api.listCurrent();
    return toCurrentRituals(res.data);
  },

  async findByRecommendationId(recommendationId: string): Promise<UserRitualPack> {
    const res = await api.listByRecommendationId({ recommendationId });
    return toUserRitualPack(res.data);
  },

  async create(payload: RitualHistoryCreateRequest): Promise<RitualHistory> {
    const res = await api.create1({ ritualHistoryCreateRequest: payload });
    return res.data as RitualHistory;
  },

  async updateStatus(id: string, payload: RitualHistoryUpdate): Promise<void> {
    await api.updateStatus({ id, ritualHistoryUpdateRequest: payload });
  },

  async complete(id: string, payload: RitualHistoryUpdate): Promise<void> {
    await api.complete({ id, ritualHistoryUpdateRequest: payload });
  },

  async delete(id: string): Promise<void> {
    await api._delete({ id });
  },
};
