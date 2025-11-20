import { ChatInput } from '@/components/ai-chat/ChatInput';
import { ChatMessage } from '@/components/ai-chat/ChatMessage';
import { SuggestedRitualPack } from '@/components/ai-chat/SuggestedRitualPack';
import { ThemedText } from '@/components/themes/themed-text';
import { ThemedView } from '@/components/themes/themed-view';
import { useChatActions } from '@/src/hooks/ai-chat/useChatActions';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { FlatList, KeyboardAvoidingView, Platform, TouchableOpacity, View } from 'react-native';

export default function AIChatScreen() {
  const router = useRouter();
  const { currentConversation } = useChatActions();

  return (
    <ThemedView className="flex-1">
      {/* Header */}
      <View className="flex-row items-center p-4 border-b border-gray-200 bg-white">
        <TouchableOpacity onPress={() => router.back()} className="p-2 mr-2">
          <MaterialIcons name="arrow-back" size={24} color="#4B5563" />
        </TouchableOpacity>
        <View>
          <ThemedText className="text-lg font-semibold">AI Chat</ThemedText>
        </View>
      </View>

      {/* Messages and ritual suggestions */}
      <FlatList
        data={currentConversation}
        keyExtractor={(item, index) => item.id || `${index}-${item.createdAt}`}
        contentContainerStyle={{ padding: 16, paddingBottom: 24 }}
        renderItem={({ item }) => <ChatMessage message={item} />}
        ListFooterComponent={
          currentConversation.length > 0 ? 
            <SuggestedRitualPack /> : null
        }
      />

      {/* Input */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="p-0"
      >
        <ChatInput placeholder="Type your message..." />
      </KeyboardAvoidingView>
    </ThemedView>
  );
}
