import { RitualFilter } from '@/src/models/ritualTags';

// loveType.keys.ts
export const loveTypeKeys = {
  all: ['loveType'] as const,
  list: () => [...loveTypeKeys.all, 'list'] as const,
};

// ritual.keys.ts
export const ritualKeys = {
  all: ['ritual'] as const,

  list: () => [...ritualKeys.all, 'list'] as const,
  byId: (id: string) => [...ritualKeys.all, 'detail', id] as const,

  tags: () => [...ritualKeys.all, 'tags'] as const,

  search: (filter: RitualFilter) =>
    [...ritualKeys.all, 'search', filter] as const,

  history: () => [...ritualKeys.all, 'history'] as const,

  userRitualPackByRecommendationId: (recommendationId: string) => 
    [...ritualKeys.all, 'history', 'recommendation', recommendationId] as const,

  current: () => [...ritualKeys.all, 'current'] as const,

  packs: () => [...ritualKeys.all, 'packs'] as const,
  packById: (id: string) =>
    [...ritualKeys.all, 'packs', id] as const,

  recommendations: () =>
    [...ritualKeys.all, 'recommendations'] as const,
  recommendationsById: (id: string) =>
    [...ritualKeys.all, 'recommendations', id] as const,
};

export const chatKeys = {
  all: ['chat'] as const,
  sessions: () => [...chatKeys.all, 'sessions'] as const,
  messages: (sessionId: string) => [...chatKeys.all, 'messages', sessionId] as const,
  samplePrompts: () => [...chatKeys.all, 'sample-prompts'] as const,
};
