/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class RitualTagsControllerService {
    /**
     * @returns string OK
     * @throws ApiError
     */
    public static allTags(): CancelablePromise<Record<string, Array<string>>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tags',
        });
    }
    /**
     * @returns string OK
     * @throws ApiError
     */
    public static sensitivityLevels(): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tags/sensitivity-levels',
        });
    }
    /**
     * @returns string OK
     * @throws ApiError
     */
    public static ritualTypes(): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tags/ritual-types',
        });
    }
    /**
     * @returns string OK
     * @throws ApiError
     */
    public static ritualTones(): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tags/ritual-tones',
        });
    }
    /**
     * @returns string OK
     * @throws ApiError
     */
    public static ritualModes(): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tags/ritual-modes',
        });
    }
    /**
     * @returns string OK
     * @throws ApiError
     */
    public static rhythms(): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tags/rhythms',
        });
    }
    /**
     * @returns string OK
     * @throws ApiError
     */
    public static relationalNeeds(): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tags/relational-needs',
        });
    }
    /**
     * @returns string OK
     * @throws ApiError
     */
    public static publicationStatuses(): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tags/publication-statuses',
        });
    }
    /**
     * @returns string OK
     * @throws ApiError
     */
    public static loveTypes(): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tags/love-types',
        });
    }
    /**
     * @returns string OK
     * @throws ApiError
     */
    public static lifeContexts(): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tags/life-contexts',
        });
    }
    /**
     * @returns string OK
     * @throws ApiError
     */
    public static emotionalStates(): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tags/emotional-states',
        });
    }
    /**
     * @returns string OK
     * @throws ApiError
     */
    public static effortLevels(): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tags/effort-levels',
        });
    }
}
