import { ChatMessage, StarterPrompt } from '@/src/types/chat';

// Mock data for starter prompts
const STARTER_PROMPTS: StarterPrompt[] = [
  {
    id: '1',
    text: 'How can I improve my daily routine?',
    category: 'General',
  },
  {
    id: '2',
    text: 'Suggest a 5-minute mindfulness exercise',
    category: 'Mindfulness',
  },
  {
    id: '3',
    text: 'Help me understand my love language',
    category: 'Relationships',
  },
  {
    id: '4',
    text: 'How can I better communicate with my partner?',
    category: 'Communication',
  },
];

// Mock function to simulate AI response
const getAIResponse = async (message: string): Promise<string> => {
  // In a real app, this would call your backend API
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
  
  const responses = [
    "That's an interesting thought. Can you tell me more about it?",
    "I understand how you might feel that way. What else is on your mind?",
    "Thanks for sharing. How does that make you feel?",
    "I'm here to help. Could you elaborate on that?",
    "That's a great point. Have you considered any other perspectives?",
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};

export const chatService = {
  // Get starter prompts
  getStarterPrompts: async (): Promise<StarterPrompt[]> => {
    return new Promise(resolve => {
      setTimeout(() => resolve(STARTER_PROMPTS), 500);
    });
  },

  // Send a message and get AI response
  sendMessage: async (message: string): Promise<ChatMessage> => {
    const response = await getAIResponse(message);
    return {
      id: Date.now().toString(),
      text: response,
      sender: 'ai',
      timestamp: new Date(),
    };
  },

  // Mock function to simulate loading conversation history
  getConversationHistory: async (): Promise<ChatMessage[]> => {
    return [];
  },
};
