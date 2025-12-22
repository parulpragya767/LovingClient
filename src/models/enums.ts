
export { ChatMessageRole } from '@/src/api/models/chat-message-role';
export { Journey } from '@/src/api/models/journey';
export { LoveType } from '@/src/api/models/love-type';
export { PublicationStatus } from '@/src/api/models/publication-status';
export { RecommendationSource } from '@/src/api/models/recommendation-source';
export { RecommendationStatus } from '@/src/api/models/recommendation-status';
export { RelationalNeed } from '@/src/api/models/relational-need';
export { RelationshipStatus } from '@/src/api/models/relationship-status';
export { RitualHistoryStatus } from '@/src/api/models/ritual-history-status';
export { RitualMode } from '@/src/api/models/ritual-mode';
export { RitualTone } from '@/src/api/models/ritual-tone';
export { TimeTaken } from '@/src/api/models/time-taken';

export const FEEDBACK_CONFIG = {
  WARM: '❤️',
  JOYFUL: '😊',
  CALM: '😌',
  NEUTRAL: '😐',
  SAD: '😢',
  FRUSTRATED: '😠',
  ENERGIZED: '🔥',
} as const;

export type RitualFeedback = keyof typeof FEEDBACK_CONFIG;

export const feedbackToEmoji = (fb?: RitualFeedback) =>
  fb ? FEEDBACK_CONFIG[fb] : undefined;

export const emojiToFeedback = (emoji: string): RitualFeedback | undefined =>
  (Object.keys(FEEDBACK_CONFIG) as RitualFeedback[])
    .find(key => FEEDBACK_CONFIG[key] === emoji);