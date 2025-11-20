import type { MediaAsset as ApiMediaAsset } from '@/src/api/models/media-asset';
import type { RitualDTO } from '@/src/api/models/ritual-dto';

export interface Ritual extends Omit<RitualDTO, 'id'> {
    id: string;
}

export function toRitual(dto: RitualDTO): Ritual {
  return {
    ...dto,
    id: dto.id || ''
  };
}

export interface MediaAsset extends ApiMediaAsset {}
