import type { BulkRitualHistoryStatusUpdateRequest } from '@/src/api/models/bulk-ritual-history-status-update-request';
import type { CurrentRitualsDTO } from '@/src/api/models/current-rituals-dto';
import type { RitualHistoryDTO } from '@/src/api/models/ritual-history-dto';
import type { RitualHistoryStatusUpdateRequest } from '@/src/api/models/ritual-history-status-update-request';
import type { RitualStatusUpdate as ApiRitualStatusUpdate } from '@/src/api/models/ritual-status-update';
import type { RitualPack } from '@/src/models/ritualPacks';
import { toRitualPack } from '@/src/models/ritualPacks';
import type { Ritual } from '@/src/models/rituals';
import { toRitual } from '@/src/models/rituals';

export interface RitualHistory extends RitualHistoryDTO {}
export interface RitualHistoryStatusUpdate extends RitualHistoryStatusUpdateRequest {}
export interface BulkRitualHistoryStatusUpdate extends BulkRitualHistoryStatusUpdateRequest {}
export interface RitualStatusUpdate extends ApiRitualStatusUpdate {}
export interface CurrentRituals {
  ritualHistory: RitualHistory[];
  ritualPacks: RitualPack[];
  rituals: Ritual[];
}

export function toCurrentRituals(dto: CurrentRitualsDTO): CurrentRituals {
  return {
    ritualHistory: (dto.ritualHistory || []) as RitualHistory[],
    ritualPacks: (dto.ritualPacks || []).map(toRitualPack),
    rituals: (dto.rituals || []).map(toRitual),
  };
}
