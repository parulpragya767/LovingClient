import type { RitualTagDTO } from '@/src/api/models/ritual-tag-dto';
import type { RitualTagsDTO } from '@/src/api/models/ritual-tags-dto';
import type { TagValueDTO } from '@/src/api/models/tag-value-dto';

export interface RitualTag extends RitualTagDTO {}
export interface RitualTags extends RitualTagsDTO {}
export interface TagValue extends TagValueDTO {}

