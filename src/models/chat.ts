import type { ChatMessageDTO } from '@/src/api/models/chat-message-dto';
import type { ChatSessionDTO } from '@/src/api/models/chat-session-dto';
import type { RecommendRitualPackResponse as ApiRecommendRitualPackResponse } from '@/src/api/models/recommend-ritual-pack-response';
import type { SendMessageRequest } from '@/src/api/models/send-message-request';
import type { SendMessageResponse } from '@/src/api/models/send-message-response';
import type { RitualPack } from './ritualPacks';
import { toRitualPack } from './ritualPacks';

export interface ChatMessage extends ChatMessageDTO {}

export interface ChatSession extends Omit<ChatSessionDTO, 'messages' | 'title' > {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: ChatMessage[];
}

export function toChatMessage(dto: ChatMessageDTO): ChatMessage {
  return {
    ...dto,
    id: dto.id || '',
    sessionId: dto.sessionId || '',
    content: dto.content || '',
  };
}

export function toChatSession(dto: ChatSessionDTO): ChatSession {
  const messages = (dto.messages || []) as ChatMessageDTO[];
  return {
    ...dto,
    title: dto.title || 'New Chat',
    createdAt: dto.createdAt || '',
    updatedAt: dto.updatedAt || '',
    messages: messages.map(m => toChatMessage(m)),
  };
}

export interface ChatSendMessageRequest extends SendMessageRequest {}

export interface ChatSendMessageResponse extends Omit<SendMessageResponse, 'assistantResponse'> {
  assistantResponse?: ChatMessage;
}

export function toChatSendMessageResponse(dto: SendMessageResponse): ChatSendMessageResponse {
  return {
    ...dto,
    assistantResponse: dto.assistantResponse ? toChatMessage(dto.assistantResponse) : undefined,
  };
}

export interface RecommendRitualPackResponse extends Omit<ApiRecommendRitualPackResponse, 'ritualPack' | 'wrapUpResponse'> {
  ritualPack?: RitualPack;
  wrapUpResponse?: ChatMessage;
}

export function toRecommendRitualPackResponse(
  dto: ApiRecommendRitualPackResponse
): RecommendRitualPackResponse {
  return {
    ...dto,
    ritualPack: dto.ritualPack ? toRitualPack(dto.ritualPack) : undefined,
    wrapUpResponse: dto.wrapUpResponse ? toChatMessage(dto.wrapUpResponse) : undefined,
  };
}
