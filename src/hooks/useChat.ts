import type {
  ChatMessage,
  ChatSession
} from '@/src/models/chat';
import { chatService } from '@/src/services/chatService';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo } from 'react';

import { ChatMessageRole } from '@/src/models/enums';
import { useReducer } from "react";

interface ChatState {
  conversations: ChatSession[];
  currentId: string | null;
}

type ChatAction =
  | { type: "SET_SESSIONS"; sessions: ChatSession[] }
  | { type: "SET_CURRENT"; id: string | null }
  | { type: "ENSURE_SESSION"; session: ChatSession }
  | { type: "SET_MESSAGES"; id: string; messages: ChatMessage[] }
  | { type: "ADD_MESSAGE"; id: string; message: ChatMessage }
  | { type: "DELETE_SESSION"; id: string };

//
// -------------------- Reducer --------------------
//
function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case "SET_SESSIONS":
      return { ...state, conversations: action.sessions };

    case "SET_CURRENT":
      return { ...state, currentId: action.id };

    case "ENSURE_SESSION": {
      const exists = state.conversations.some(
        (c) => c.id === action.session.id
      );
      if (exists) return state;
      return {
        ...state,
        conversations: [action.session, ...state.conversations],
      };
    }

    case "SET_MESSAGES":
      return {
        ...state,
        conversations: state.conversations.map((c) =>
          c.id === action.id
            ? { ...c, messages: action.messages }
            : c
        ),
      };

    case "ADD_MESSAGE":
      return {
        ...state,
        conversations: state.conversations.map((c) =>
          c.id === action.id
            ? {
                ...c,
                messages: [...c.messages, action.message]
              }
            : c
        ),
      };

    case "DELETE_SESSION": {
      const filtered = state.conversations.filter(
        (c) => c.id !== action.id
      );
      const next =
        state.currentId === action.id ? filtered[0]?.id ?? null : state.currentId;
      return { conversations: filtered, currentId: next };
    }

    default:
      return state;
  }
}

//
// -------------------- Hook --------------------
//
export const useChat = () => {
  const [state, dispatch] = useReducer(chatReducer, {
    conversations: [],
    currentId: null,
  });

  const currentConversation = useMemo(
    () =>
      state.currentId
        ? state.conversations.find((c) => c.id === state.currentId) ?? null
        : null,
    [state.currentId, state.conversations]
  );

  //
  // ------------- Sample Prompts -------------
  //
  const samplePromptsQuery = useQuery({
    queryKey: ["chat", "sample-prompts"],
    queryFn: () => chatService.getSamplePrompts(),
    staleTime: 5 * 60 * 1000,
  });

  const hydrateSessions = useCallback(async () => {
    const sessions = await chatService.listSessions();
    dispatch({ type: "SET_SESSIONS", sessions: sessions });
  }, []);

  useEffect(() => {
    hydrateSessions();
  }, []);

  const startNewConversation = useCallback(async () => {
    const session = await chatService.startSession();

    dispatch({ type: "ENSURE_SESSION", session });
    dispatch({ type: "SET_CURRENT", id: session.id});
    return session.id;
  }, []);

  const selectConversation = useCallback(async (id: string) => {
    dispatch({ type: "SET_CURRENT", id });

    // load history
    const history = await chatService.getHistory(id);
    dispatch({
      type: "SET_MESSAGES",
      id,
      messages: history.messages ?? [],
    });
  }, []);

  const sendMessage = useCallback(
    async (content: string, opts?: { readyForRitualSuggestion?: boolean }) => {
      if (!state.currentId) return null;
      const id = state.currentId;

      const userMsg: ChatMessage = {
        sessionId: id,
        role: ChatMessageRole.User,
        content,
        createdAt: new Date().toISOString(),
      };

      dispatch({ type: "ADD_MESSAGE", id, message: userMsg });

      // actual API call
      const resp = await chatService.sendMessage(id, {
        content,
      });

      if (resp.assistantResponse) {
        dispatch({
          type: "ADD_MESSAGE",
          id,
          message: resp.assistantResponse,
        });
      }

      return resp;
    },
    [state.currentId]
  );

  const deleteConversation = useCallback(
    async (id: string) => {
      dispatch({ type: "DELETE_SESSION", id });
    },
    [state.conversations]
  );

  return {
    conversations: state.conversations,
    currentConversation,
    currentConversationId: state.currentId,
    samplePromptsQuery,

    startNewConversation,
    selectConversation,
    sendMessage,
    deleteConversation,
  };
};
