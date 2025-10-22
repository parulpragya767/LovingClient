export interface LoveType {
  id: string;
  name: string;
  description: string;
  emoji: string;
  longDescription?: string;
  importance?: string;
  howToExpress?: string[];
}

export interface RitualPack {
  id: string;
  title: string;
  description: string;
  tags: string[];
  ritualIds: string[]; // references to Ritual ids contained in this pack
  isCurrent: boolean; // whether this pack is currently active for the user
}