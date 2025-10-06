/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GetHistoryResponse } from '../models/GetHistoryResponse';
import type { SendMessageRequest } from '../models/SendMessageRequest';
import type { SendMessageResponse } from '../models/SendMessageResponse';
import type { StartSessionRequest } from '../models/StartSessionRequest';
import type { StartSessionResponse } from '../models/StartSessionResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AiChatControllerService {
    /**
     * @param requestBody
     * @returns StartSessionResponse OK
     * @throws ApiError
     */
    public static startSession(
        requestBody: StartSessionRequest,
    ): CancelablePromise<StartSessionResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/ai-chat/sessions',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param sessionId
     * @param requestBody
     * @returns SendMessageResponse OK
     * @throws ApiError
     */
    public static sendMessage(
        sessionId: string,
        requestBody: SendMessageRequest,
    ): CancelablePromise<SendMessageResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/ai-chat/sessions/{sessionId}/messages',
            path: {
                'sessionId': sessionId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param sessionId
     * @returns GetHistoryResponse OK
     * @throws ApiError
     */
    public static getChatHistory(
        sessionId: string,
    ): CancelablePromise<GetHistoryResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/ai-chat/sessions/{sessionId}/history',
            path: {
                'sessionId': sessionId,
            },
        });
    }
}
