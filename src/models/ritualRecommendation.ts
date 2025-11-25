import type { RitualRecommendationDTO } from '@/src/api/models/ritual-recommendation-dto';
import type { RitualRecommendationUpdateRequest } from '@/src/api/models/ritual-recommendation-update-request';
import type { RitualStatusUpdate as RitualStatusUpdateRequest } from '@/src/api/models/ritual-status-update';

export interface RitualRecommendation extends RitualRecommendationDTO {}

export interface RitualRecommendationUpdate extends RitualRecommendationUpdateRequest {}

export interface RitualStatusUpdate extends RitualStatusUpdateRequest {}
