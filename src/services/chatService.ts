import { ChatMessage, Conversation, StarterPrompt } from '@/src/types/chat';

// Mock data for starter prompts
const STARTER_PROMPTS: StarterPrompt[] = [
  { id: '1', text: 'How can I improve my relationship?', category: 'General' },
  { id: '2', text: 'What are some fun date ideas?', category: 'Dates' },
  { id: '3', text: 'How to handle conflicts better?', category: 'Conflict' },
  { id: '4', text: 'Ways to show appreciation', category: 'Appreciation' },
];

// In-memory storage for conversations
let conversations: Conversation[] = [];
let currentConversationId: string | null = null;

// Mock function to simulate AI response
const getAIResponse = async (message: string): Promise<string> => {
  // In a real app, this would call an actual AI API
  return new Promise(resolve => {
    setTimeout(() => {
      const responses = [
        "That's an interesting thought. Let me think about that...",
        "I understand how you feel. Have you considered...",
        "Thanks for sharing. My perspective is...",
        "That's a great question! Here's what I think..."
      ];
      resolve(responses[Math.floor(Math.random() * responses.length)]);
    }, 1000);
  });
};

// Generate a title from the first message
const generateTitle = (message: string): string => {
  return message.length > 30 ? `${message.substring(0, 30)}...` : message;
};

export const chatService = {
  // Get starter prompts
  getStarterPrompts: (): Promise<StarterPrompt[]> => {
    return new Promise(resolve => {
      setTimeout(() => resolve(STARTER_PROMPTS), 500);
    });
  },

  // Create a new conversation
  createNewConversation: (): string => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    conversations.unshift(newConversation);
    currentConversationId = newConversation.id;
    return newConversation.id;
  },

  // Get current conversation ID
  getCurrentConversationId: (): string | null => {
    return currentConversationId;
  },

  // Set current conversation
  setCurrentConversation: (id: string): void => {
    if (conversations.some(conv => conv.id === id)) {
      currentConversationId = id;
    }
  },

  // Send a message in the current conversation
  sendMessage: async (message: string): Promise<ChatMessage> => {
    if (!currentConversationId) {
      chatService.createNewConversation();
    }

    const conversation = conversations.find(c => c.id === currentConversationId);
    if (!conversation) throw new Error('No active conversation');

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date(),
    };

    conversation.messages.push(userMessage);
    
    // Update title if it's the first message
    if (conversation.messages.length === 1) {
      conversation.title = generateTitle(message);
    }

    // Get AI response
    const aiResponse = await getAIResponse(message);
    const aiMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      text: aiResponse,
      sender: 'ai',
      timestamp: new Date(),
    };

    conversation.messages.push(aiMessage);
    conversation.updatedAt = new Date();

    return aiMessage;
  },

  // Get all conversations
  getConversations: (): Promise<Conversation[]> => {
    return new Promise(resolve => {
      // Sort by most recently updated first
      const sorted = [...conversations].sort(
        (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
      );
      resolve(sorted);
    });
  },

  // Get a single conversation by ID
  getConversation: (id: string): Promise<Conversation | undefined> => {
    return new Promise(resolve => {
      resolve(conversations.find(conv => conv.id === id));
    });
  },

  // Delete a conversation
  deleteConversation: (id: string): Promise<void> => {
    return new Promise(resolve => {
      conversations = conversations.filter(conv => conv.id !== id);
      if (currentConversationId === id) {
        currentConversationId = conversations[0]?.id || null;
      }
      resolve();
    });
  },

  // Clear all conversations
  clearAllConversations: (): Promise<void> => {
    return new Promise(resolve => {
      conversations = [];
      currentConversationId = null;
      resolve();
    });
  },
};
