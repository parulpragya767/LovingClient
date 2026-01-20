import { PagedModelRitualDTO, RitualDTO } from "../api";
import { Ritual, toRitual } from "./rituals";

export interface PageRitual extends Omit<PagedModelRitualDTO, 'content'> {
    rituals: Ritual[];
}

export function toPageRitual(dto: PagedModelRitualDTO): PageRitual {
  const ritualDtos = (dto.content || []) as RitualDTO[];
  return {
    ...dto,
    rituals: ritualDtos.map(ritualDto => toRitual(ritualDto)),
  };
}

export type { PageMetadata } from '../api/models/page-metadata';
export type { Pageable } from '../api/models/pageable';

