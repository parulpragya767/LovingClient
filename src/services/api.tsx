import { ritualsData } from '../data/rituals';
import { Ritual } from '../types/data-model';

// Simulate API delay for realistic behavior
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const apiService = {
  async getRituals(): Promise<Ritual[]> {
    console.log('Fetching rituals from local data...');
    await delay(500); // Simulate network delay
    return ritualsData;
  },
};