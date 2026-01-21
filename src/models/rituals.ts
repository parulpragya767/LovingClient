import type { MediaAsset as ApiMediaAsset } from '@/src/api/models/media-asset';
import type { RitualDTO } from '@/src/api/models/ritual-dto';

export interface Ritual extends RitualDTO {}

export function toRitual(dto: RitualDTO): Ritual {
  return {
    ...dto
  };
}

export interface MediaAsset extends ApiMediaAsset {}
