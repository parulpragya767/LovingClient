import type { BulkRitualHistoryStatusUpdateRequest } from '@/src/api/models/bulk-ritual-history-status-update-request';
import type { CurrentRitualDTO } from '@/src/api/models/current-ritual-dto';
import type { CurrentRitualPackDTO } from '@/src/api/models/current-ritual-pack-dto';
import type { CurrentRitualsDTO } from '@/src/api/models/current-rituals-dto';
import type { RitualHistoryDTO } from '@/src/api/models/ritual-history-dto';
import type { RitualHistoryUpdateRequest } from '@/src/api/models/ritual-history-update-request';
import type { StatusUpdateEntry as ApiStatusUpdateEntry } from '@/src/api/models/status-update-entry';
import type { RitualPack } from '@/src/models/ritualPacks';
import { toRitualPack } from '@/src/models/ritualPacks';
import type { Ritual } from '@/src/models/rituals';
import { toRitual } from '@/src/models/rituals';

export interface RitualHistory extends RitualHistoryDTO {}
export interface RitualHistoryUpdate extends RitualHistoryUpdateRequest {}
export interface BulkRitualHistoryStatusUpdate extends BulkRitualHistoryStatusUpdateRequest {}
export interface StatusUpdateEntry extends ApiStatusUpdateEntry {}

export interface CurrentRitual extends Omit<CurrentRitualDTO, 'ritual'> {
  ritual: Ritual;
}

export interface CurrentRitualPack extends Omit<CurrentRitualPackDTO, 'ritualPack' | 'rituals'> {
  ritualPack: RitualPack;
  rituals: CurrentRitual[];
}

export interface CurrentRituals {
  ritualPacks: CurrentRitualPack[];
  rituals: CurrentRitual[];
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
    rituals: (dto.individualRituals || []).map(toCurrentRitual),
  };
}
