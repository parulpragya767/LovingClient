import { RitualRecommendationControllerApi } from '@/src/api/apis/ritual-recommendation-controller-api';
import type { RitualRecommendation, RitualRecommendationUpdate } from '@/src/models/ritualRecommendation';
import apiClient from '@/src/services/apiClient';

// Initialize the API with our configured axios instance
const api = new RitualRecommendationControllerApi(undefined, '', apiClient);

export const ritualRecommendationService = {
  async listAll(): Promise<RitualRecommendation[]> {
    const res = await api.listAll();
    return (res.data || []) as RitualRecommendation[];
  },

  async getById(id: string): Promise<RitualRecommendation> {
    const res = await api.listById({ id });
    return res.data as RitualRecommendation;
  },

  async update(id: string, payload: RitualRecommendationUpdate): Promise<void> {
    await api.updateRecommendationAndRitualHistoryStatus({ id, ritualRecommendationUpdateRequest: payload });
  },
};