/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UserContextDTO = {
    id?: string;
    userId?: string;
    conversationId?: string;
    emotionalStates?: Array<'Happy' | 'Sad' | 'Anxious' | 'Peaceful' | 'Excited' | 'Tired' | 'Stressed' | 'Loving' | 'Grateful' | 'Frustrated' | 'Overwhelmed'>;
    relationalNeeds?: Array<'Connection' | 'Appreciation' | 'Respect' | 'Trust' | 'Intimacy' | 'Support' | 'Acceptance' | 'Space' | 'Security' | 'Adventure'>;
    preferredLoveLanguages?: Array<'BELONG' | 'FIRE' | 'SPARK' | 'CARE' | 'SELF' | 'BUILD' | 'GROW' | 'BEYOND' | 'GRACE'>;
    preferredRitualTypes?: Array<'Reflection' | 'Conversation' | 'Play' | 'Appreciation' | 'Gratitude' | 'Physical Connection' | 'Quality Time' | 'Adventure' | 'Relaxation' | 'Self-Improvement'>;
    preferredTones?: Array<'Romantic' | 'Playful' | 'Serious' | 'Lighthearted' | 'Intimate' | 'Adventurous' | 'Calm' | 'Energetic' | 'Thoughtful' | 'Spontaneous'>;
    availableTimeMinutes?: number;
    preferredEffortLevel?: UserContextDTO.preferredEffortLevel;
    preferredIntensity?: UserContextDTO.preferredIntensity;
    currentContexts?: Array<'Morning Routine' | 'Evening Routine' | 'Weekend' | 'Holiday' | 'Anniversary' | 'Date Night' | 'Long Distance' | 'Stressful Period' | 'New Relationship' | 'Long-term Relationship'>;
    timeContext?: UserContextDTO.timeContext;
    relationshipStatus?: UserContextDTO.relationshipStatus;
    semanticQuery?: string;
    lastInteractionAt?: string;
    createdAt?: string;
    updatedAt?: string;
};
export namespace UserContextDTO {
    export enum preferredEffortLevel {
        LOW = 'LOW',
        MODERATE = 'MODERATE',
        HIGH = 'HIGH',
    }
    export enum preferredIntensity {
        LOW = 'LOW',
        MODERATE = 'MODERATE',
        HIGH = 'HIGH',
        INTENSE = 'INTENSE',
    }
    export enum timeContext {
        MORNING = 'MORNING',
        AFTERNOON = 'AFTERNOON',
        EVENING = 'EVENING',
        NIGHT = 'NIGHT',
        WEEKDAY = 'WEEKDAY',
        WEEKEND = 'WEEKEND',
        HOLIDAY = 'HOLIDAY',
        ANYTIME = 'ANYTIME',
    }
    export enum relationshipStatus {
        NEW = 'NEW',
        ESTABLISHED = 'ESTABLISHED',
        COMMITTED = 'COMMITTED',
        ENGAGED = 'ENGAGED',
        MARRIED = 'MARRIED',
        REKINDLING = 'REKINDLING',
        LONG_DISTANCE = 'LONG_DISTANCE',
        CASUAL = 'CASUAL',
        EXPLORING = 'EXPLORING',
        OTHER = 'OTHER',
    }
}

