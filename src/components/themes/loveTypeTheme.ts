import { LoveType } from '@/src/models/enums';

export const loveTypeTheme: Record<LoveType, { gradient: [string, string] }> = {
  [LoveType.Spark]: {
    gradient: ['#D78F9A', '#F6E1E5'], // romantic rose
  },
  [LoveType.Care]: {
    gradient: ['#E2A184', '#F8E8E0'], // warm nurturing peach
  },
  [LoveType.Fire]: {
    gradient: ['#7A3029', '#D1847C'], // deep maroon → warm rose
  },
  [LoveType.Belong]: {
    gradient: ['#B89372', '#F2E3D6'], // earthy sand
  },
  [LoveType.Grow]: {
    gradient: ['#687F65', '#D2DECF'], // sage growth
  },
  [LoveType.Build]: {
    gradient: ['#875740', '#E2C3B1'], // terracotta structure
  },
  [LoveType.Self]: {
    gradient: ['#887C96', '#E5E0EB'], // reflective lavender
  },
  [LoveType.Beyond]: {
    gradient: ['#3F4868', '#B0B7D6'], // quiet indigo
  },
  [LoveType.Grace]: {
    gradient: ['#B49655', '#F3E8C9'], // warm gold
  },
};