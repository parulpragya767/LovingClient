import type { RitualDTO } from '@/src/api/models/ritual-dto';

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