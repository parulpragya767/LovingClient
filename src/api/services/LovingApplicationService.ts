/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LovingApplicationService {
    /**
     * @param name
     * @returns string OK
     * @throws ApiError
     */
    public static sayHello(
        name: string = 'World',
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/sayHello',
            query: {
                'name': name,
            },
        });
    }
}
