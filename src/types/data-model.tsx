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
}