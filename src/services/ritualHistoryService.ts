import { RitualHistoryControllerApi } from '@/src/api/apis/ritual-history-controller-api';
import type { BulkRitualHistoryStatusUpdate, CurrentRituals, RitualHistory, RitualHistoryCreateRequest, RitualHistoryUpdate } from '@/src/models/ritualHistory';
import { toCurrentRituals } from '@/src/models/ritualHistory';
import apiClient from './apiClient';

// Initialize the API with our configured axios instance
const api = new RitualHistoryControllerApi(undefined, '', apiClient);

export const ritualHistoryService = {
  async list(): Promise<RitualHistory[]> {
    const res = await api.list();
    return res.data as RitualHistory[];
  },

  async listCurrent(): Promise<CurrentRituals> {
    const res = await api.listCurrent();
    return toCurrentRituals(res.data);
  },

  async create(payload: RitualHistoryCreateRequest): Promise<RitualHistory> {
    const res = await api.create1({ ritualHistoryCreateRequest: payload });
    return res.data as RitualHistory;
  },

  async updateStatus(id: string, payload: RitualHistoryUpdate): Promise<RitualHistory> {
    const res = await api.updateStatus({ id, ritualHistoryUpdateRequest: payload });
    return res.data as RitualHistory;
  },

  async complete(id: string, payload: RitualHistoryUpdate): Promise<RitualHistory> {
    const res = await api.complete({ id, ritualHistoryUpdateRequest: payload });
    return res.data as RitualHistory;
  },

  async delete(id: string): Promise<void> {
    await api._delete({ id });
  },

  async bulkCreate(items: RitualHistoryCreateRequest[]): Promise<RitualHistory[]> {
    const res = await api.bulkCreate({ ritualHistoryCreateRequest: items });
    return res.data as RitualHistory[];
  },

  async bulkUpdateStatus(payload: BulkRitualHistoryStatusUpdate): Promise<RitualHistory[]> {
    const res = await api.bulkUpdateStatus({ bulkRitualHistoryStatusUpdateRequest: payload });
    return res.data as RitualHistory[];
  },
};
