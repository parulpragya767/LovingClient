import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, View, FlatList } from 'react-native';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function AICompanionChatScreen() {
  const router = useRouter();
  const { topic } = useLocalSearchParams<{ topic?: string }>();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: topic ? `I'm here to help you with ${topic}. What would you like to discuss?` : 'Hello! How can I help you today?',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (!inputText.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    
    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `I understand you're asking about "${inputText}". While I'm an AI and can provide general advice, remember that I'm not a substitute for professional relationship counseling.`,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <ThemedView className="flex-1">
      {/* Header */}
      <View className="flex-row items-center p-4 border-b border-gray-200 bg-white">
        <TouchableOpacity onPress={() => router.back()} className="p-2 mr-2">
          <MaterialIcons name="arrow-back" size={24} color="#4B5563" />
        </TouchableOpacity>
        <View>
          <ThemedText className="text-lg font-semibold">AI Companion</ThemedText>
          <ThemedText className="text-sm text-gray-500">Online</ThemedText>
        </View>
      </View>

      {/* Messages */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View 
            className={`mb-4 max-w-[80%] ${item.sender === 'user' ? 'self-end bg-blue-100' : 'self-start bg-gray-100'} rounded-2xl p-4`}
          >
            <ThemedText>{item.text}</ThemedText>
            <ThemedText className="text-xs text-gray-500 mt-1">
              {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </ThemedText>
          </View>
        )}
      />

      {/* Input */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="p-4 border-t border-gray-200 bg-white"
      >
        <View className="flex-row items-center">
          <TextInput
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-full py-3 px-4 mr-2"
            onSubmitEditing={handleSend}
          />
          <TouchableOpacity 
            onPress={handleSend}
            className="bg-blue-600 p-3 rounded-full"
            disabled={!inputText.trim()}
          >
            <MaterialIcons name="send" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}
