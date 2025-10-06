/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MediaAsset } from './MediaAsset';
import type { RitualStep } from './RitualStep';
export type RitualDTO = {
    id?: string;
    title?: string;
    shortDescription?: string;
    fullDescription?: string;
    ritualTypes?: Array<'Reflection' | 'Conversation' | 'Play' | 'Appreciation' | 'Gratitude' | 'Physical Connection' | 'Quality Time' | 'Adventure' | 'Relaxation' | 'Self-Improvement'>;
    ritualMode?: RitualDTO.ritualMode;
    ritualTones?: Array<'Romantic' | 'Playful' | 'Serious' | 'Lighthearted' | 'Intimate' | 'Adventurous' | 'Calm' | 'Energetic' | 'Thoughtful' | 'Spontaneous'>;
    sensitivityLevel?: RitualDTO.sensitivityLevel;
    effortLevel?: RitualDTO.effortLevel;
    estimatedDurationMinutes?: number;
    ritualSteps?: Array<RitualStep>;
    mediaAssets?: Array<MediaAsset>;
    loveTypesSupported?: Array<'BELONG' | 'FIRE' | 'SPARK' | 'CARE' | 'SELF' | 'BUILD' | 'GROW' | 'BEYOND' | 'GRACE'>;
    emotionalStatesSupported?: Array<'Happy' | 'Sad' | 'Anxious' | 'Peaceful' | 'Excited' | 'Tired' | 'Stressed' | 'Loving' | 'Grateful' | 'Frustrated' | 'Overwhelmed'>;
    relationalNeedsServed?: Array<'Connection' | 'Appreciation' | 'Respect' | 'Trust' | 'Intimacy' | 'Support' | 'Acceptance' | 'Space' | 'Security' | 'Adventure'>;
    lifeContextsRelevant?: Array<'Morning Routine' | 'Evening Routine' | 'Weekend' | 'Holiday' | 'Anniversary' | 'Date Night' | 'Long Distance' | 'Stressful Period' | 'New Relationship' | 'Long-term Relationship'>;
    rhythm?: RitualDTO.rhythm;
    preparationRequirements?: Array<string>;
    semanticSummary?: string;
    status?: RitualDTO.status;
    createdBy?: string;
    createdAt?: string;
    updatedAt?: string;
};
export namespace RitualDTO {
    export enum ritualMode {
        SOLO = 'SOLO',
        PARTNER = 'PARTNER',
        PAIR = 'PAIR',
    }
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
    export enum rhythm {
        DAILY = 'DAILY',
        WEEKLY = 'WEEKLY',
        OCCASIONAL = 'OCCASIONAL',
        EVENT_TRIGGERED = 'EVENT_TRIGGERED',
    }
    export enum status {
        PUBLISHED = 'PUBLISHED',
        DRAFT = 'DRAFT',
        ARCHIVED = 'ARCHIVED',
    }
}

