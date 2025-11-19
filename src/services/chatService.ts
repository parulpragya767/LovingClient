import { AiChatControllerApi } from '@/src/api/apis/ai-chat-controller-api';
import type {
  ChatSendMessageRequest,
  ChatSendMessageResponse,
  ChatSession,
  RecommendRitualPackResponse
} from '@/src/models/chat';
import { toChatSendMessageResponse, toChatSession } from '@/src/models/chat';
import apiClient from './apiClient';

// Initialize the API with our configured axios instance (same pattern as ritualService)
const api = new AiChatControllerApi(undefined, '', apiClient);

export const chatService = {
  async startSession(): Promise<ChatSession> {
    const res = await api.createSession();
    return toChatSession(res.data);
  },

  async getHistory(sessionId: string): Promise<ChatSession> {
    const res = await api.getChatHistory({ sessionId });
    return toChatSession(res.data);
  },

  async sendMessage(
    sessionId: string,
    payload: ChatSendMessageRequest
  ): Promise<ChatSendMessageResponse> {
    const res = await api.sendMessage({ sessionId, sendMessageRequest: payload });
    return toChatSendMessageResponse(res.data);
  },

  async recommendRitualPack(
    sessionId: string,
  ): Promise<RecommendRitualPackResponse> {
    const res = await api.recommendRitualPack({ sessionId });
    return res.data;
  },

  async getSamplePrompts(): Promise<string[]> {
    const res = await api.getSamplePrompts();
    return res.data;
  },

  async listSessions(): Promise<ChatSession[]> {
    const res = await api.listSessions();
    return (res.data || []).map(s => toChatSession(s));
  },

  async deleteSession(sessionId: string): Promise<void> {
    await api.deleteSession({ sessionId });
  },
};


