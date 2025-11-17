import type { BulkRitualHistoryStatusUpdateRequest } from '@/src/api/models/bulk-ritual-history-status-update-request';
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
export interface CurrentRituals {
  ritualHistoryMap: Map<string, RitualHistory[]>;
  ritualPacks: RitualPack[];
  rituals: Ritual[];
}

export function toCurrentRituals(dto: CurrentRitualsDTO): CurrentRituals {
  return {
    ritualHistoryMap: new Map(Object.entries(dto.ritualHistoryMap || {})),
    ritualPacks: (dto.ritualPacks || []).map(toRitualPack),
    rituals: (dto.rituals || []).map(toRitual),
  };
}
