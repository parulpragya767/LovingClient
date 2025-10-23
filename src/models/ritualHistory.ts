import type { BulkRitualHistoryStatusUpdateRequest } from '@/src/api/models/bulk-ritual-history-status-update-request';
import type { RitualHistoryDTO } from '@/src/api/models/ritual-history-dto';
import type { RitualHistoryStatusUpdateRequest } from '@/src/api/models/ritual-history-status-update-request';
import type { RitualStatusUpdate as ApiRitualStatusUpdate } from '@/src/api/models/ritual-status-update';

export interface RitualHistory extends RitualHistoryDTO {}
export interface RitualHistoryStatusUpdate extends RitualHistoryStatusUpdateRequest {}
export interface BulkRitualHistoryStatusUpdate extends BulkRitualHistoryStatusUpdateRequest {}
export interface RitualStatusUpdate extends ApiRitualStatusUpdate {}

