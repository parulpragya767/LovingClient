import type { RitualDTO } from '@/src/api/models/ritual-dto';

export interface Ritual extends RitualDTO {
    tags: string[];
}

export function toRitual(dto: RitualDTO): Ritual {
  return {
    ...dto,
    tags: [],
  };
}