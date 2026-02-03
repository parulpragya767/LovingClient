import type { CurrentRitualsDTO } from '@/src/api/models/current-rituals-dto';
import type { RitualHistoryDTO } from '@/src/api/models/ritual-history-dto';
import type { RitualHistoryUpdateRequest } from '@/src/api/models/ritual-history-update-request';
import type { UserRitualDTO } from '@/src/api/models/user-ritual-dto';
import type { UserRitualPackDTO } from '@/src/api/models/user-ritual-pack-dto';
import type { RitualPack } from '@/src/models/ritualPacks';
import { toRitualPack } from '@/src/models/ritualPacks';
import type { Ritual } from '@/src/models/rituals';
import { toRitual } from '@/src/models/rituals';

export interface RitualHistory extends RitualHistoryDTO {}
export interface RitualHistoryUpdate extends RitualHistoryUpdateRequest {}
export type { BulkRitualHistoryStatusUpdateRequest } from '@/src/api/models/bulk-ritual-history-status-update-request';
export type { RitualHistoryCreateRequest } from '@/src/api/models/ritual-history-create-request';
export type { StatusUpdateEntry } from '@/src/api/models/status-update-entry';

export interface UserRitual extends Omit<UserRitualDTO, 'ritual'> {
  ritual: Ritual;
}

export interface UserRitualPack extends Omit<UserRitualPackDTO, 'ritualPack' | 'rituals'> {
  ritualPack: RitualPack;
  rituals: UserRitual[];
}

export interface CurrentRituals extends Omit<CurrentRitualsDTO, 'ritualPacks' | 'individualRituals'> {
  ritualPacks: UserRitualPack[];
  individualRituals: UserRitual[];
}

export function toUserRitual(dto: UserRitualDTO): UserRitual {
  return {
    ...dto,
    ritual: toRitual(dto.ritual),
  };
}

export function toUserRitualPack(dto: UserRitualPackDTO): UserRitualPack {
  return {
    ...dto,
    ritualPack: toRitualPack(dto.ritualPack),
    rituals: (dto.rituals || []).map(toUserRitual),
  };
}

export function toCurrentRituals(dto: CurrentRitualsDTO): CurrentRituals {
  return {
    ritualPacks: (dto.ritualPacks || []).map(toUserRitualPack),
    individualRituals: (dto.individualRituals || []).map(toUserRitual),
  };
}
