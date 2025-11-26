import { ChatInput } from '@/src/components/ai-chat/ChatInput';
import { ChatMessage } from '@/src/components/ai-chat/ChatMessage';
import { RitualRecommendationConsentCard } from '@/src/components/ai-chat/RitualRecommendationConsentCard';
import RitualRecommendationModal from '@/src/components/rituals/RitualRecommendationModal';
import { ThemedText } from '@/src/components/themes/themed-text';
import { ThemedView } from '@/src/components/themes/themed-view';
import { useChatActions } from '@/src/hooks/ai-chat/useChatActions';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, FlatList, TouchableOpacity, View } from 'react-native';

export default function AIChatScreen() {
  const router = useRouter();
  const { currentConversation, sendMessage, recommendRitualPack, refreshConversation } = useChatActions();
  const [isRecommendationConsentCardVisible, setIsRecommendationConsentCardVisible] = useState(false);

  const handleSendMessage = async (message: string) => {
    const isReadyForRitualPack = await sendMessage(message);
    if (isReadyForRitualPack) {
      setIsRecommendationConsentCardVisible(true);
    }
  };

  const handleRitualRecommendation = async () => {
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
    finally {
      setIsRecommendationConsentCardVisible(false);
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

      {/* Messages and ritual recommendation cards */}
      <FlatList
        data={currentConversation}
        keyExtractor={(item, index) => item.id || `${index}-${item.createdAt}`}
        contentContainerStyle={{ padding: 16, paddingBottom: 24 }}
        renderItem={({ item }) => <ChatMessage message={item}/>}
        ListFooterComponent={
          <View className="w-full">
            {isRecommendationConsentCardVisible && (
              <RitualRecommendationConsentCard onPress={handleRitualRecommendation} />
            )}
          </View>
        }
      />

      {/* Chat input area */}
      <ChatInput 
        placeholder="Type your message..." 
        onSubmit={handleSendMessage}
      />

      {/* Ritual Recommendation Modal */}
      <RitualRecommendationModal />
    </ThemedView>
  );
}
