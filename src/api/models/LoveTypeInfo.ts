/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InfoSection } from './InfoSection';
export type LoveTypeInfo = {
    id?: number;
    loveType?: LoveTypeInfo.loveType;
    title?: string;
    subtitle?: string;
    description?: string;
    sections?: Array<InfoSection>;
};
export namespace LoveTypeInfo {
    export enum loveType {
        BELONG = 'BELONG',
        FIRE = 'FIRE',
        SPARK = 'SPARK',
        CARE = 'CARE',
        SELF = 'SELF',
        BUILD = 'BUILD',
        GROW = 'GROW',
        BEYOND = 'BEYOND',
        GRACE = 'GRACE',
    }
}

