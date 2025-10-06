/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RitualDTO } from '../models/RitualDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class RitualControllerService {
    /**
     * @param id
     * @returns RitualDTO OK
     * @throws ApiError
     */
    public static getById(
        id: string,
    ): CancelablePromise<RitualDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/rituals/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns RitualDTO OK
     * @throws ApiError
     */
    public static update(
        id: string,
        requestBody: RitualDTO,
    ): CancelablePromise<RitualDTO> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/rituals/{id}',
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
    public static delete(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/rituals/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns RitualDTO OK
     * @throws ApiError
     */
    public static getAll(): CancelablePromise<Array<RitualDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/rituals',
        });
    }
    /**
     * @param requestBody
     * @returns RitualDTO OK
     * @throws ApiError
     */
    public static create(
        requestBody: RitualDTO,
    ): CancelablePromise<RitualDTO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/rituals',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
