import { ChatInput } from '@/src/components/ai-chat/ChatInput';
import { ChatMessage } from '@/src/components/ai-chat/ChatMessage';
import { RitualRecommendationConsentCard } from '@/src/components/ai-chat/RitualRecommendationConsentCard';
import RitualRecommendationModal from '@/src/components/rituals/RitualRecommendationModal';
import { EmptyState } from '@/src/components/states/EmptyState';
import { useChatActions } from '@/src/hooks/ai-chat/useChatActions';
import { useState } from 'react';
import { Alert, FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AIChatScreen() {
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
    <SafeAreaView className="flex-1 bg-white" edges={['top','left', 'right']}>
      {/* Messages and ritual recommendation cards */}
      <View className="flex-1 px-4 py-12">
        <FlatList
          data={currentConversation}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ChatMessage message={item}/>}
          ListFooterComponent={
            <View className="w-full">
              {isRecommendationConsentCardVisible && (
                <RitualRecommendationConsentCard onPress={handleRitualRecommendation} />
              )}
            </View>
          }
          ListEmptyComponent={<EmptyState message="No messages yet." />}
        />
      </View>

      {/* Chat input area */}
      <ChatInput 
        placeholder="Type your message..." 
        onSubmit={handleSendMessage}
      />

      {/* Ritual Recommendation Modal */}
      <RitualRecommendationModal />
    </SafeAreaView>
  );
}
