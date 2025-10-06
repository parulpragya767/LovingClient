/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserContextDTO } from '../models/UserContextDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserContextControllerService {
    /**
     * @param id
     * @returns UserContextDTO OK
     * @throws ApiError
     */
    public static getUserContext(
        id: string,
    ): CancelablePromise<UserContextDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user-contexts/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns UserContextDTO OK
     * @throws ApiError
     */
    public static updateUserContext(
        id: string,
        requestBody: UserContextDTO,
    ): CancelablePromise<UserContextDTO> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/user-contexts/{id}',
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
    public static deleteUserContext(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/user-contexts/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param userId
     * @returns UserContextDTO OK
     * @throws ApiError
     */
    public static getUserContexts(
        userId: string,
    ): CancelablePromise<Array<UserContextDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user-contexts',
            query: {
                'userId': userId,
            },
        });
    }
    /**
     * @param requestBody
     * @returns UserContextDTO OK
     * @throws ApiError
     */
    public static createUserContext(
        requestBody: UserContextDTO,
    ): CancelablePromise<UserContextDTO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user-contexts',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param userId
     * @returns UserContextDTO OK
     * @throws ApiError
     */
    public static getActiveUserContext(
        userId: string,
    ): CancelablePromise<UserContextDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user-contexts/active',
            query: {
                'userId': userId,
            },
        });
    }
}
