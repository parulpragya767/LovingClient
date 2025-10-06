/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LoveTypeInfo } from '../models/LoveTypeInfo';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LoveTypeControllerService {
    /**
     * @param id
     * @returns LoveTypeInfo OK
     * @throws ApiError
     */
    public static getLoveTypeById(
        id: number,
    ): CancelablePromise<LoveTypeInfo> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/love-types/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns LoveTypeInfo OK
     * @throws ApiError
     */
    public static updateLoveType(
        id: number,
        requestBody: LoveTypeInfo,
    ): CancelablePromise<LoveTypeInfo> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/love-types/{id}',
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
    public static deleteLoveType(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/love-types/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns LoveTypeInfo OK
     * @throws ApiError
     */
    public static getAllLoveTypes(): CancelablePromise<Array<LoveTypeInfo>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/love-types',
        });
    }
    /**
     * @param requestBody
     * @returns LoveTypeInfo OK
     * @throws ApiError
     */
    public static createLoveType(
        requestBody: LoveTypeInfo,
    ): CancelablePromise<LoveTypeInfo> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/love-types',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
