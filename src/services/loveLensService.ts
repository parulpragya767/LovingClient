import { LoveTypeControllerApi } from '@/src/api/apis/love-type-controller-api';
import type { LoveTypeDetail } from '@/src/models/loveLens';
import apiClient from './apiClient';

// Initialize the API with our configured axios instance
const api = new LoveTypeControllerApi(undefined, '', apiClient);

export const loveLensService = {
  async getAll(): Promise<LoveTypeDetail[]> {
    const res = await api.getAllLoveTypes();
    return res.data as LoveTypeDetail[];
  },

  async getById(id: number): Promise<LoveTypeDetail> {
    const res = await api.getLoveTypeById({ id });
    return res.data as LoveTypeDetail;
  }
};
