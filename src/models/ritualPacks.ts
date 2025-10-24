import type { RitualDTO } from '@/src/api/models/ritual-dto';
import type { RitualPackDTO } from '@/src/api/models/ritual-pack-dto';
import type { Ritual as RitualType } from '@/src/models/rituals';
import { toRitual } from '@/src/models/rituals';

// Domain model for use across the app
export interface RitualPack {
  id: string;
  title: string;
  description: string;
  rituals: RitualType[];
}

export function toRitualPack(dto: RitualPackDTO): RitualPack {
  const rituals = (dto.rituals || []) as RitualDTO[];
  return {
    id: dto.id || '',
    title: dto.title || 'Unnamed Pack',
    description: dto.fullDescription || dto.shortDescription || '',
    rituals: rituals.map(ritual => toRitual(ritual)),
  };
}