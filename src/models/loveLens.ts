import type { InfoBullet } from '@/src/api/models/info-bullet';
import type { InfoSection } from '@/src/api/models/info-section';
import type { LoveTypeInfo } from '@/src/api/models/love-type-info';
import { LoveType } from '@/src/models/enums';

export interface LoveTypeDetail extends LoveTypeInfo {}
export interface LoveTypeInfoSection extends InfoSection {}
export interface LoveTypeInfoBullet extends InfoBullet {}

export const LOVE_TYPE_ORDER = [
  LoveType.Spark,
  LoveType.Care,
  LoveType.Fire,
  LoveType.Belong,
  LoveType.Build,
  LoveType.Grow,
  LoveType.Self,
  LoveType.Grace,
  LoveType.Beyond,
];