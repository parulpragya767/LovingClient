import { PageRitualDTO, RitualDTO } from "../api";
import { Ritual, toRitual } from "./rituals";

export interface PageRitual extends Omit<PageRitualDTO, 'content'> {
    rituals: Ritual[];
}

export function toPageRitual(dto: PageRitualDTO): PageRitual {
  const ritualDtos = (dto.content || []) as RitualDTO[];
  return {
    ...dto,
    rituals: ritualDtos.map(ritualDto => toRitual(ritualDto)),
  };
}

export type { Pageable } from '../api/models/pageable';
export type { PageableObject } from '../api/models/pageable-object';
export type { SortObject } from '../api/models/sort-object';

