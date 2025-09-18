export interface LoveType {
  id: string;
  name: string;
  description: string;
}

export interface Ritual {
  id: string;
  name: string;
  title: string;
  description: string;
  howTo?: string;
  benefits?: string;
  tags: string[];
  isCurrent: boolean;
}

export interface RitualPack {
  id: string;
  title: string;
  description: string;
  tags: string[];
  ritualIds: string[]; // references to Ritual ids contained in this pack
  isCurrent: boolean; // whether this pack is currently active for the user
}