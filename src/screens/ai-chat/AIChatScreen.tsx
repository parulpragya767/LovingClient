import { ChatInput } from '@/src/components/ai-chat/ChatInput';
import { ChatMessage } from '@/src/components/ai-chat/ChatMessage';
import { RitualRecommendationConsentCard } from '@/src/components/ai-chat/RitualRecommendationConsentCard';
import RitualRecommendationModal from '@/src/components/rituals/RitualRecommendationModal';
import { EmptyState } from '@/src/components/states/EmptyState';
import { useChatActions } from '@/src/hooks/ai-chat/useChatActions';
import { useCallback, useState } from 'react';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from "react-native-toast-message";

export default function AIChatScreen() {
  const { currentConversation, sendMessage, recommendRitualPack, refreshConversation } = useChatActions();
  const [isRecommendationConsentCardVisible, setIsRecommendationConsentCardVisible] = useState(true);

  const handleSendMessage = useCallback(async (message: string) => {
    const isReadyForRitualPack = await sendMessage(message);
    if (isReadyForRitualPack) {
      setIsRecommendationConsentCardVisible(true);
    }
  }, [sendMessage]);

  const handleRitualRecommendation = async () => {
    try {
      const ritualPack = await recommendRitualPack();
      if (ritualPack) {
        refreshConversation();
      } else {
        Toast.show({
          type: "info", 
          text1: "No recommendation available at this time.",
        });
      } 
    } catch (error) {
      Toast.show({
        type: "error", 
        text1: "Failed to get your recommendation",
      });
    }
    finally {
      setIsRecommendationConsentCardVisible(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['left', 'right']}>
      {/* Messages and ritual recommendation cards */}
      <View className="flex-1 px-2 py-4">
        <FlatList
          data={currentConversation}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ChatMessage message={item}/>}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            <View className="mt-2 mb-4">
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
        onSend={handleSendMessage}
      />

      {/* Ritual Recommendation Modal */}
      <RitualRecommendationModal />
    </SafeAreaView>
  );
}
