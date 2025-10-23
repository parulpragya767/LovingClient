import type { ChatMessageDTO } from '@/src/api/models/chat-message-dto';
import type { GetHistoryResponse } from '@/src/api/models/get-history-response';
import type { SamplePromptsResponse } from '@/src/api/models/sample-prompts-response';
import type { SendMessageRequest } from '@/src/api/models/send-message-request';
import type { SendMessageResponse } from '@/src/api/models/send-message-response';
import type { StartSessionRequest } from '@/src/api/models/start-session-request';
import type { StartSessionResponse } from '@/src/api/models/start-session-response';

export interface ChatMessage extends ChatMessageDTO {}
export interface ChatGetHistoryResponse extends GetHistoryResponse {}
export interface ChatSendMessageRequest extends SendMessageRequest {}
export interface ChatSendMessageResponse extends SendMessageResponse {}
export interface ChatStartSessionRequest extends StartSessionRequest {}
export interface ChatStartSessionResponse extends StartSessionResponse {}
export interface ChatSamplePromptsResponse extends SamplePromptsResponse {}

