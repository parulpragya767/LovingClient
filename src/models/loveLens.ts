import type { InfoBullet } from '@/src/api/models/info-bullet';
import type { InfoSection } from '@/src/api/models/info-section';
import type { LoveTypeInfo } from '@/src/api/models/love-type-info';

export interface LoveLensInfo extends LoveTypeInfo {}
export interface LoveLensInfoSection extends InfoSection {}
export interface LoveLensInfoBullet extends InfoBullet {}

