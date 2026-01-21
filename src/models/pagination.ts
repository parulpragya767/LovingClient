import { PagedModelRitualDTO, RitualDTO } from "@/src/api";
import { Ritual, toRitual } from "@/src/models/rituals";

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

export type { PageMetadata } from '@/src/api/models/page-metadata';
export type { Pageable } from '@/src/api/models/pageable';

