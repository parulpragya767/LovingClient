import type { ChatMessageDTO } from '@/src/api/models/chat-message-dto';
import type { ChatSessionDTO } from '@/src/api/models/chat-session-dto';
import type { RecommendRitualPackResponse as ApiRecommendRitualPackResponse } from '@/src/api/models/recommend-ritual-pack-response';
import type { SendMessageRequest } from '@/src/api/models/send-message-request';
import type { SendMessageResponse } from '@/src/api/models/send-message-response';

export interface ChatMessage extends ChatMessageDTO {}
export interface ChatSession extends ChatSessionDTO {}
export interface ChatSendMessageRequest extends SendMessageRequest {}
export interface ChatSendMessageResponse extends SendMessageResponse {}
export interface RecommendRitualPackResponse extends ApiRecommendRitualPackResponse {}

