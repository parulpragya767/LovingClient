/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RitualHistoryDTO } from '../models/RitualHistoryDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class RitualHistoryControllerService {
    /**
     * @param id
     * @returns RitualHistoryDTO OK
     * @throws ApiError
     */
    public static getById2(
        id: string,
    ): CancelablePromise<RitualHistoryDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/ritual-histories/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns RitualHistoryDTO OK
     * @throws ApiError
     */
    public static update2(
        id: string,
        requestBody: RitualHistoryDTO,
    ): CancelablePromise<RitualHistoryDTO> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/ritual-histories/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns any OK
     * @throws ApiError
     */
    public static delete2(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/ritual-histories/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param userId
     * @param ritualId
     * @returns RitualHistoryDTO OK
     * @throws ApiError
     */
    public static list(
        userId?: string,
        ritualId?: string,
    ): CancelablePromise<Array<RitualHistoryDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/ritual-histories',
            query: {
                'userId': userId,
                'ritualId': ritualId,
            },
        });
    }
    /**
     * @param requestBody
     * @returns RitualHistoryDTO OK
     * @throws ApiError
     */
    public static create2(
        requestBody: RitualHistoryDTO,
    ): CancelablePromise<RitualHistoryDTO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/ritual-histories',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
