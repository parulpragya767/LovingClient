import type { CurrentRitualDTO } from '@/src/api/models/current-ritual-dto';
import type { CurrentRitualPackDTO } from '@/src/api/models/current-ritual-pack-dto';
import type { CurrentRitualsDTO } from '@/src/api/models/current-rituals-dto';
import type { RitualHistoryDTO } from '@/src/api/models/ritual-history-dto';
import type { RitualHistoryUpdateRequest } from '@/src/api/models/ritual-history-update-request';
import type { RitualPack } from '@/src/models/ritualPacks';
import { toRitualPack } from '@/src/models/ritualPacks';
import type { Ritual } from '@/src/models/rituals';
import { toRitual } from '@/src/models/rituals';

export interface RitualHistory extends RitualHistoryDTO {}
export interface RitualHistoryUpdate extends RitualHistoryUpdateRequest {}
export type { BulkRitualHistoryStatusUpdateRequest } from '@/src/api/models/bulk-ritual-history-status-update-request';
export type { RitualHistoryCreateRequest } from '@/src/api/models/ritual-history-create-request';
export type { StatusUpdateEntry } from '@/src/api/models/status-update-entry';

export interface CurrentRitual extends Omit<CurrentRitualDTO, 'ritual'> {
  ritual: Ritual;
}

export interface CurrentRitualPack extends Omit<CurrentRitualPackDTO, 'ritualPack' | 'rituals'> {
  ritualPack: RitualPack;
  rituals: CurrentRitual[];
}

export interface CurrentRituals extends Omit<CurrentRitualsDTO, 'ritualPacks' | 'individualRituals'> {
  ritualPacks: CurrentRitualPack[];
  individualRituals: CurrentRitual[];
}

export function toCurrentRitual(dto: CurrentRitualDTO): CurrentRitual {
  return {
    ...dto,
    ritual: toRitual(dto.ritual),
  };
}

export function toCurrentRitualPack(dto: CurrentRitualPackDTO): CurrentRitualPack {
  return {
    ...dto,
    ritualPack: toRitualPack(dto.ritualPack),
    rituals: (dto.rituals || []).map(toCurrentRitual),
  };
}

export function toCurrentRituals(dto: CurrentRitualsDTO): CurrentRituals {
  return {
    ritualPacks: (dto.ritualPacks || []).map(toCurrentRitualPack),
    individualRituals: (dto.individualRituals || []).map(toCurrentRitual),
  };
}
