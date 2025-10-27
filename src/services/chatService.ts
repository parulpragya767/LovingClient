import { AiChatControllerApi } from '@/src/api/apis/ai-chat-controller-api';
import type {
  ChatGetHistoryResponse,
  ChatSamplePromptsResponse,
  ChatSendMessageRequest,
  ChatSendMessageResponse,
  ChatStartSessionRequest,
  ChatStartSessionResponse,
} from '@/src/models/chat';
import apiClient from './apiClient';

// Initialize the API with our configured axios instance (same pattern as ritualService)
const api = new AiChatControllerApi(undefined, '', apiClient);

export const chatService = {
  async startSession(req: ChatStartSessionRequest): Promise<ChatStartSessionResponse> {
    const res = await api.startSession({ startSessionRequest: req });
    return res.data;
  },

  async getHistory(sessionId: string): Promise<ChatGetHistoryResponse> {
    const res = await api.getChatHistory({ sessionId });
    return res.data;
  },

  async sendMessage(
    sessionId: string,
    payload: Omit<ChatSendMessageRequest, 'readyForRitualSuggestion'> & { readyForRitualSuggestion?: boolean }
  ): Promise<ChatSendMessageResponse> {
    const req: ChatSendMessageRequest = {
      content: payload.content,
      readyForRitualSuggestion: payload.readyForRitualSuggestion ?? false,
    };
    const res = await api.sendMessage({ sessionId, sendMessageRequest: req });
    return res.data;
  },

  async recommendRitualPack(
    sessionId: string,
    payload: ChatSendMessageRequest
  ): Promise<ChatSendMessageResponse> {
    const res = await api.recommendRitualPack({ sessionId, sendMessageRequest: payload });
    return res.data;
  },

  async getSamplePrompts(): Promise<ChatSamplePromptsResponse> {
    const res = await api.getSamplePrompts();
    return res.data;
  },
};
