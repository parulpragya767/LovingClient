import { RitualRecommendationControllerApi } from '@/src/api/apis/ritual-recommendation-controller-api';
import type { RitualRecommendation, RitualRecommendationUpdate } from '@/src/models/ritualRecommendation';
import apiClient from './apiClient';

// Initialize the API with our configured axios instance
const api = new RitualRecommendationControllerApi(undefined, '', apiClient);

export const ritualRecommendationService = {
  /**
   * List all ritual recommendations
   */
  async listAll(): Promise<RitualRecommendation[]> {
    const res = await api.listAll();
    return res.data as RitualRecommendation[];
  },

  /**
   * Get a specific ritual recommendation by ID
   * @param id The ID of the ritual recommendation to retrieve
   */
  async getById(id: string): Promise<RitualRecommendation> {
    const res = await api.listById({ id });
    return res.data as RitualRecommendation;
  },

  /**
   * Update the status of a ritual recommendation
   * @param id The ID of the ritual recommendation to update
   * @param payload The update payload containing the new status
   */
  async update(id: string, payload: RitualRecommendationUpdate): Promise<void> {
    await api.updateRecommendationAndRitualHistoryStatus({ 
      id, 
      ritualRecommendationUpdateRequest: payload 
    });
  },
};