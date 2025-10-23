import { RitualHistoryControllerApi } from '@/src/api/apis/ritual-history-controller-api';
import apiClient from './apiClient';
import type { RitualHistory, RitualHistoryStatusUpdate, BulkRitualHistoryStatusUpdate } from '@/src/models/ritualHistory';

// Initialize the API with our configured axios instance
const api = new RitualHistoryControllerApi(undefined, '', apiClient);

export const ritualHistoryService = {
  async list(): Promise<RitualHistory[]> {
    const res = await api.list();
    return res.data as RitualHistory[];
  },

  async create(payload: RitualHistory): Promise<RitualHistory> {
    const res = await api.create({ ritualHistoryDTO: payload });
    return res.data as RitualHistory;
  },

  async updateStatus(id: string, payload: RitualHistoryStatusUpdate): Promise<RitualHistory> {
    const res = await api.updateStatus({ id, ritualHistoryStatusUpdateRequest: payload });
    return res.data as RitualHistory;
  },

  async complete(id: string, payload: RitualHistoryStatusUpdate): Promise<RitualHistory> {
    const res = await api.complete({ id, ritualHistoryStatusUpdateRequest: payload });
    return res.data as RitualHistory;
  },

  async bulkCreate(items: RitualHistory[]): Promise<RitualHistory[]> {
    const res = await api.bulkCreate({ ritualHistoryDTO: items });
    return res.data as RitualHistory[];
  },

  async bulkUpdateStatus(payload: BulkRitualHistoryStatusUpdate): Promise<RitualHistory[]> {
    const res = await api.bulkUpdateStatus({ bulkRitualHistoryStatusUpdateRequest: payload });
    return res.data as RitualHistory[];
  },
};
