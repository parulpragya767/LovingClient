import type { RitualInPackDTO } from '@/src/api/models/ritual-in-pack-dto';
import type { RitualPackDTO } from '@/src/api/models/ritual-pack-dto';
import type { Ritual } from '@/src/models/rituals';
import { toRitual } from '@/src/models/rituals';

export interface RitualInPack {
  ritual: Ritual;
  position: number;
}

export interface RitualPack extends Omit<RitualPackDTO, 'description' | 'rituals'>{
  description: string;
  rituals: RitualInPack[];
}

export function toRitualPack(dto: RitualPackDTO): RitualPack {
  const rituals = (dto.rituals || []) as RitualInPackDTO[];
  return {
    ...dto,
    description: dto.description || '',
    rituals: rituals
      .map(ritualInPack => ({
        ritual: toRitual(ritualInPack.ritual),
        position: ritualInPack.position,
      }))
      .sort((a, b) => a.position - b.position),
  };
}