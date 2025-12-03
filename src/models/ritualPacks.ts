import type { RitualDTO } from '@/src/api/models/ritual-dto';
import type { RitualPackDTO } from '@/src/api/models/ritual-pack-dto';
import type { Ritual } from '@/src/models/rituals';
import { toRitual } from '@/src/models/rituals';

export interface RitualPack extends Omit<RitualPackDTO, 'id' | 'title' | 'description' | 'rituals'>{
  id: string;
  title: string;
  description: string;
  rituals: Ritual[];
}

export function toRitualPack(dto: RitualPackDTO): RitualPack {
  const rituals = (dto.rituals || []) as RitualDTO[];
  return {
    ...dto,
    id: dto.id || '',
    title: dto.title || 'Unnamed Pack',
    description: dto.description || '',
    rituals: rituals.map(ritual => toRitual(ritual)),
  };
}