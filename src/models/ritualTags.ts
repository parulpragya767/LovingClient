import type { RitualFilterDTO } from '@/src/api/models/ritual-filter-dto';
import type { RitualTag as ApiRitualTag } from '@/src/api/models/ritual-tag';
import type { RitualTags as ApiRitualTags } from '@/src/api/models/ritual-tags';
import type { TagValue as ApiTagValue } from '@/src/api/models/tag-value';

export interface RitualTag extends ApiRitualTag {}
export interface RitualTags extends ApiRitualTags {}
export interface TagValue extends ApiTagValue {}
export interface RitualFilter extends RitualFilterDTO {}

export type SelectedTagState = {
  loveTypes: TagValue[];
  ritualModes: TagValue[];
  timeTaken: TagValue[];
  relationalNeeds: TagValue[];
  ritualTones: TagValue[];
};

export type Chip = {
  key: string;
  displayName: string;
  category: keyof SelectedTagState;
};