import type { MediaAsset as ApiMediaAsset } from '@/src/api/models/media-asset';
import type { RitualDTO } from '@/src/api/models/ritual-dto';
import type { RitualFilterRequest as ApiRitualFilterRequest } from '@/src/api/models/ritual-filter-request';
import type { RitualStep as ApiRitualStep } from '@/src/api/models/ritual-step';

export interface Ritual extends Omit<RitualDTO, 'id'> {
    id: string;
    tags: string[];
    isCurrent: boolean;
}

export function toRitual(dto: RitualDTO): Ritual {
  return {
    ...dto,
    id: dto.id || '',
    tags: [],
    isCurrent: true,
  };
}

export interface RitualStep extends ApiRitualStep {}
export interface MediaAsset extends ApiMediaAsset {}
export interface RitualFilter extends ApiRitualFilterRequest {}