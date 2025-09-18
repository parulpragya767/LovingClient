import { RitualPack } from '../types/data-model';

// Sample ritual packs referencing ritual IDs from ritualsData
export const ritualPacksData: RitualPack[] = [
  {
    id: 'pack-1',
    title: 'Daily Connection Pack',
    description: 'A set of daily rituals to increase connection and appreciation.',
    tags: ['daily', 'connection', 'gratitude'],
    ritualIds: ['1', '3', '5'],
    isCurrent: true,
  },
  {
    id: 'pack-2',
    title: 'Quality Time Essentials',
    description: 'Weekly and monthly rituals focused on quality time and shared experiences.',
    tags: ['quality-time', 'weekly', 'monthly'],
    ritualIds: ['2', '7'],
    isCurrent: false,
  },
];
