import type {
  ChatGetHistoryResponse,
  ChatMessage,
  ChatSendMessageRequest,
  ChatSendMessageResponse,
} from '@/src/models/chat';
import { ChatMessageRole } from '@/src/models/enums';
import { chatService } from '@/src/services/chatService';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export interface ConversationState {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export const useChat = () => {
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [conversations, setConversations] = useState<ConversationState[]>([]);
  const isInitRef = useRef(false);

  // Sample prompts
  const samplePromptsQuery = useQuery<string[], Error>({
    queryKey: ['chat', 'sample-prompts'],
    queryFn: async () => {
      const resp = await chatService.getSamplePrompts();
      return resp.prompts || [];
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: 1,
  });

  const currentConversation = useMemo(() => {
    if (!currentConversationId) return null;
    return conversations.find((c) => c.id === currentConversationId) || null;
  }, [conversations, currentConversationId]);

  const ensureConversation = useCallback((id: string, title?: string) => {
    setConversations((prev) => {
      const exists = prev.find((c) => c.id === id);
      if (exists) return prev;
      const created: ConversationState = {
        id,
        title: title || 'New Chat',
        messages: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return [created, ...prev];
    });
  }, []);

  const setConversationMessages = useCallback((id: string, messages: ChatMessage[]) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, messages, updatedAt: new Date() } : c))
    );
  }, []);

  const updateConversationTitleIfNeeded = useCallback((id: string) => {
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        if (c.title && c.title !== 'New Chat') return c;
        const firstUser = c.messages.find((m) => m.role === ChatMessageRole.User);
        const text = firstUser?.content || 'New Chat';
        const title = text.length > 30 ? `${text.substring(0, 30)}...` : text;
        return { ...c, title };
      })
    );
  }, []);

  const startNewConversation = useCallback(async (title?: string) => {
    const resp = await chatService.startSession({ conversationTitle: title });
    const sessionId = resp.sessionId || '';
    ensureConversation(sessionId, title);
    setCurrentConversationId(sessionId);
    return sessionId;
  }, [ensureConversation]);

  const selectConversation = useCallback(async (id: string) => {
    ensureConversation(id);
    setCurrentConversationId(id);
    // Load history when selecting
    const history = await chatService.getHistory(id);
    setConversationMessages(id, history.messages || []);
    updateConversationTitleIfNeeded(id);
  }, [ensureConversation, setConversationMessages, updateConversationTitleIfNeeded]);

  const loadSessions = useCallback(async () => {
    const resp = await chatService.listSessions(0, 50);
    const sessions = resp.sessions ?? [];
    if (sessions.length === 0) {
      const id = await startNewConversation();
      await selectConversation(id);
      return;
    }
    const mapped: ConversationState[] = sessions.map((s) => ({
      id: s.id || '',
      title: s.conversationTitle || 'New Chat',
      messages: [],
      createdAt: s.createdAt ? new Date(s.createdAt) : new Date(),
      updatedAt: s.updatedAt ? new Date(s.updatedAt) : new Date(),
    }));
    setConversations(mapped);
    const firstId = mapped[0]?.id;
    if (firstId) {
      setCurrentConversationId(firstId);
      const history = await chatService.getHistory(firstId);
      setConversationMessages(firstId, history.messages || []);
      updateConversationTitleIfNeeded(firstId);
    }
  }, [selectConversation, setConversationMessages, startNewConversation, updateConversationTitleIfNeeded]);

  // Initial setup: fetch sessions and hydrate state; create one if none exists
  useEffect(() => {
    if (isInitRef.current) return;
    isInitRef.current = true;
    (async () => {
      await loadSessions();
    })();
  }, [loadSessions]);

  const sendMessage = useCallback(
    async (
      content: string,
      options?: { readyForRitualSuggestion?: boolean }
    ): Promise<ChatSendMessageResponse | null> => {
      if (!currentConversationId) return null;
      const sessionId = currentConversationId;

      // Optimistic update: add user message
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        sessionId,
        role: ChatMessageRole.User,
        content,
        createdAt: new Date().toISOString(),
      };
      setConversations((prev) =>
        prev.map((c) =>
          c.id === sessionId
            ? { ...c, messages: [...c.messages, userMessage], updatedAt: new Date() }
            : c
        )
      );

      const resp = await chatService.sendMessage(sessionId, {
        content,
        readyForRitualSuggestion: options?.readyForRitualSuggestion ?? false,
      } as ChatSendMessageRequest);

      if (resp.assistantMessage) {
        setConversations((prev) =>
          prev.map((c) =>
            c.id === sessionId
              ? { ...c, messages: [...c.messages, resp.assistantMessage!], updatedAt: new Date() }
              : c
          )
        );
      }

      updateConversationTitleIfNeeded(sessionId);
      return resp;
    },
    [currentConversationId, updateConversationTitleIfNeeded]
  );

  const deleteConversation = useCallback(async (id: string) => {
    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (currentConversationId === id) {
      const next = conversations.find((c) => c.id !== id)?.id || null;
      setCurrentConversationId(next);
      if (next) await selectConversation(next);
    }
  }, [currentConversationId, conversations, selectConversation]);

  const clearAllConversations = useCallback(async () => {
    setConversations([]);
    setCurrentConversationId(null);
  }, []);

  const refreshCurrent = useCallback(async () => {
    if (!currentConversationId) return;
    const history: ChatGetHistoryResponse = await chatService.getHistory(currentConversationId);
    setConversationMessages(currentConversationId, history.messages || []);
    updateConversationTitleIfNeeded(currentConversationId);
  }, [currentConversationId, setConversationMessages, updateConversationTitleIfNeeded]);

  return {
    // state
    conversations,
    currentConversation,
    currentConversationId,
    samplePromptsQuery,

    // actions
    startNewConversation,
    selectConversation,
    sendMessage,
    deleteConversation,
    clearAllConversations,
    refreshCurrent,
  };
};
