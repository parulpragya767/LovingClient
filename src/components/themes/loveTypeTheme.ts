import { LoveType } from '@/src/models/enums';

export const loveTypeTheme: Record<LoveType, { gradient: [string, string] }> = {
  [LoveType.Spark]: {
    gradient: ['#FFD6E0', '#FFEDE5'],
  },
  [LoveType.Care]: {
    gradient: ['#FFE0D6', '#FFF1EA'],
  },
  [LoveType.Fire]: {
    gradient: ['#C75C74', '#F1A1B2'],
  },
  [LoveType.Belong]: {
    gradient: ['#D9C1A4', '#F3E6D8'],
  },
  [LoveType.Grow]: {
    gradient: ['#7D8F69', '#C7D3B4'],
  },
  [LoveType.Build]: {
    gradient: ['#8C5A3C', '#C79A7A'],
  },
  [LoveType.Self]: {
    gradient: ['#A08CB5', '#DDD2EA'],
  },
  [LoveType.Beyond]: {
    gradient: ['#3E4A89', '#7A86C7'],
  },
  [LoveType.Grace]: {
    gradient: ['#D9C27A', '#F5E7B8'],
  },
};
