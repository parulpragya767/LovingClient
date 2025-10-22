import { Ritual } from '../models/ritual';

// Mock suggestions service - replace logic with backend later
export const suggestionsService = {
  getWeeklyRitualSuggestions(rituals: Ritual[]): Ritual[] {
    // Simple heuristic: suggest up to 4 non-current rituals with diverse tags
    const nonCurrent = rituals.filter(r => !r.isCurrent);
    const seen = new Set<string>();
    const picked: Ritual[] = [];
    for (const r of nonCurrent) {
      const key = r.tags.slice(0, 2).sort().join('|');
      if (!seen.has(key)) {
        picked.push(r);
        seen.add(key);
      }
      if (picked.length >= 4) break;
    }
    // Fallback if not enough unique tag combos
    while (picked.length < 4 && picked.length < nonCurrent.length) {
      const next = nonCurrent[picked.length];
      if (next && !picked.find(p => p.id === next.id)) picked.push(next);
    }
    return picked;
  }
};
