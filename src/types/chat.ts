export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export interface StarterPrompt {
  id: string;
  text: string;
  category: string;
}
