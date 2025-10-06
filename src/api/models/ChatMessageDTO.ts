/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ChatMessageDTO = {
    id?: string;
    sessionId?: string;
    role?: ChatMessageDTO.role;
    content?: string;
    createdAt?: string;
};
export namespace ChatMessageDTO {
    export enum role {
        USER = 'USER',
        ASSISTANT = 'ASSISTANT',
        SYSTEM = 'SYSTEM',
    }
}

