/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type RitualPackDTO = {
    id?: string;
    title?: string;
    shortDescription?: string;
    fullDescription?: string;
    ritualIds?: Array<string>;
    ritualTypes?: Array<'Reflection' | 'Conversation' | 'Play' | 'Appreciation' | 'Gratitude' | 'Physical Connection' | 'Quality Time' | 'Adventure' | 'Relaxation' | 'Self-Improvement'>;
    ritualTones?: Array<'Romantic' | 'Playful' | 'Serious' | 'Lighthearted' | 'Intimate' | 'Adventurous' | 'Calm' | 'Energetic' | 'Thoughtful' | 'Spontaneous'>;
    sensitivityLevel?: RitualPackDTO.sensitivityLevel;
    effortLevel?: RitualPackDTO.effortLevel;
    loveTypesSupported?: Array<'BELONG' | 'FIRE' | 'SPARK' | 'CARE' | 'SELF' | 'BUILD' | 'GROW' | 'BEYOND' | 'GRACE'>;
    emotionalStatesSupported?: Array<'Happy' | 'Sad' | 'Anxious' | 'Peaceful' | 'Excited' | 'Tired' | 'Stressed' | 'Loving' | 'Grateful' | 'Frustrated' | 'Overwhelmed'>;
    relationalNeedsServed?: Array<'Connection' | 'Appreciation' | 'Respect' | 'Trust' | 'Intimacy' | 'Support' | 'Acceptance' | 'Space' | 'Security' | 'Adventure'>;
    lifeContextsRelevant?: Array<'Morning Routine' | 'Evening Routine' | 'Weekend' | 'Holiday' | 'Anniversary' | 'Date Night' | 'Long Distance' | 'Stressful Period' | 'New Relationship' | 'Long-term Relationship'>;
    semanticSummary?: string;
    status?: RitualPackDTO.status;
    createdBy?: string;
    createdAt?: string;
    updatedAt?: string;
};
export namespace RitualPackDTO {
    export enum sensitivityLevel {
        LOW = 'LOW',
        MODERATE = 'MODERATE',
        HIGH = 'HIGH',
    }
    export enum effortLevel {
        LOW = 'LOW',
        MODERATE = 'MODERATE',
        HIGH = 'HIGH',
    }
    export enum status {
        PUBLISHED = 'PUBLISHED',
        DRAFT = 'DRAFT',
        ARCHIVED = 'ARCHIVED',
    }
}

