import { loveTypesData } from '../data/loveTypes';
import { ritualsData } from '../data/rituals';
import { ritualPacksData } from '../data/ritualPacks';
import { LoveType, Ritual, RitualPack } from '../types/data-model';

// Simulate API delay for realistic behavior
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const apiService = {
  async getLoveTypes(): Promise<LoveType[]> {
    console.log('Fetching love types from local data...');
    await delay(500); // Simulate network delay
    return loveTypesData;
  },

  async getLoveTypeById(id: string): Promise<LoveType | undefined> {
    console.log(`Fetching love type with id: ${id}...`);
    await delay(300); // Simulate network delay
    return loveTypesData.find(type => type.id === id);
  },

  async getRituals(): Promise<Ritual[]> {
    console.log('Fetching rituals from local data...');
    await delay(500); // Simulate network delay
    return ritualsData;
  },

  async getRitualById(id: string): Promise<Ritual | undefined> {
    console.log(`Fetching ritual with id: ${id}...`);
    await delay(300); // Simulate network delay
    return ritualsData.find(ritual => ritual.id === id);
  },

  async getRitualPacks(): Promise<RitualPack[]> {
    console.log('Fetching ritual packs from local data...');
    await delay(500);
    return ritualPacksData;
  },

  async getRitualPackById(id: string): Promise<RitualPack | undefined> {
    console.log(`Fetching ritual pack with id: ${id}...`);
    await delay(300);
    return ritualPacksData.find(pack => pack.id === id);
  },
};