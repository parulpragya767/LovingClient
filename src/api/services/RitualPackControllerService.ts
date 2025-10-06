/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RitualPackDTO } from '../models/RitualPackDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class RitualPackControllerService {
    /**
     * @param id
     * @returns RitualPackDTO OK
     * @throws ApiError
     */
    public static getById1(
        id: string,
    ): CancelablePromise<RitualPackDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/ritual-packs/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns RitualPackDTO OK
     * @throws ApiError
     */
    public static update1(
        id: string,
        requestBody: RitualPackDTO,
    ): CancelablePromise<RitualPackDTO> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/ritual-packs/{id}',
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
    public static delete1(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/ritual-packs/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns RitualPackDTO OK
     * @throws ApiError
     */
    public static getAll1(): CancelablePromise<Array<RitualPackDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/ritual-packs',
        });
    }
    /**
     * @param requestBody
     * @returns RitualPackDTO OK
     * @throws ApiError
     */
    public static create1(
        requestBody: RitualPackDTO,
    ): CancelablePromise<RitualPackDTO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/ritual-packs',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
