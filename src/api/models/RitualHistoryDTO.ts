/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type RitualHistoryDTO = {
    id?: string;
    userId?: string;
    ritualId?: string;
    status?: RitualHistoryDTO.status;
    feedback?: RitualHistoryDTO.feedback;
    occurredAt?: string;
    createdAt?: string;
    updatedAt?: string;
};
export namespace RitualHistoryDTO {
    export enum status {
        SUGGESTED = 'SUGGESTED',
        STARTED = 'STARTED',
        COMPLETED = 'COMPLETED',
        SKIPPED = 'SKIPPED',
        ABANDONED = 'ABANDONED',
    }
    export enum feedback {
        HEART = 'HEART',
        SMILE = 'SMILE',
        NEUTRAL = 'NEUTRAL',
        SAD = 'SAD',
        ANGRY = 'ANGRY',
        FIRE = 'FIRE',
        THUMBS_UP = 'THUMBS_UP',
        THUMBS_DOWN = 'THUMBS_DOWN',
    }
}

