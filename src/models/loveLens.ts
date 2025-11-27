import type { InfoBullet } from '@/src/api/models/info-bullet';
import type { InfoSection } from '@/src/api/models/info-section';
import type { LoveTypeInfo } from '@/src/api/models/love-type-info';

export interface LoveTypeDetail extends LoveTypeInfo {}
export interface LoveTypeInfoSection extends InfoSection {}
export interface LoveTypeInfoBullet extends InfoBullet {}

