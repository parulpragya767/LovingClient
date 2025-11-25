import { ChatInput } from '@/components/ai-chat/ChatInput';
import { ChatMessage } from '@/components/ai-chat/ChatMessage';
import { RitualRecommendationConsentCard } from '@/components/ai-chat/RitualRecommendationConsentCard';
import { ThemedText } from '@/components/themes/themed-text';
import { ThemedView } from '@/components/themes/themed-view';
import { useChatActions } from '@/src/hooks/ai-chat/useChatActions';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, FlatList, TouchableOpacity, View } from 'react-native';
import RitualRecommendationModal from '../rituals/RitualRecommendationModal';

export default function AIChatScreen() {
  const router = useRouter();
  const { currentConversation, sendMessage, recommendRitualPack, refreshConversation } = useChatActions();
  const [showRitualPackButton, setShowRitualPackButton] = useState(false);

  const handleSendMessage = async (message: string) => {
    const isReadyForRitualPack = await sendMessage(message);
    if (isReadyForRitualPack) {
      setShowRitualPackButton(true);
    }
  };

  const handleGetRitualPack = async () => {
    try {
      const ritualPack = await recommendRitualPack();
      if (ritualPack) {
        refreshConversation();
      } else {
        Alert.alert('No Recommendations', 'No ritual pack recommendations available at this time.');
      }
    } catch (error) {
      console.error('Error getting ritual pack:', error);
      Alert.alert('Error', 'Failed to get ritual pack recommendations. Please try again.');
    }
  };

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
        renderItem={({ item }) => <ChatMessage message={item}/>}
        ListFooterComponent={
          <View className="w-full">
            {showRitualPackButton && (
              <RitualRecommendationConsentCard onPress={handleGetRitualPack} />
            )}
          </View>
        }
      />

      {/* Chat input area */}
      <ChatInput 
        placeholder="Type your message..." 
        onSubmit={handleSendMessage}
      />

      {/* Ritual Pack Suggestion Modal */}
      <RitualRecommendationModal />
    </ThemedView>
  );
}
