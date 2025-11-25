import type { RitualRecommendationDTO } from '@/src/api/models/ritual-recommendation-dto';
import type { RitualRecommendationUpdateStatusRequest } from '@/src/api/models/ritual-recommendation-update-status-request';

export interface RitualRecommendation extends RitualRecommendationDTO {}

export interface RitualRecommendationUpdate extends RitualRecommendationUpdateStatusRequest {}
