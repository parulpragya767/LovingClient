import { ChatInput } from '@/src/components/ai-chat/ChatInput';
import { ChatMessage } from '@/src/components/ai-chat/ChatMessage';
import { RitualRecommendationConsentCard } from '@/src/components/ai-chat/RitualRecommendationConsentCard';
import RitualRecommendationModalHandler from '@/src/components/rituals/RitualRecommendationModalHandler';
import { EmptyState } from '@/src/components/states/EmptyState';
import ErrorState from '@/src/components/states/ErrorState';
import LoadingState from '@/src/components/states/LoadingState';
import { KeyboardSafeScreen } from '@/src/components/ui/KeyboardSafeScreen';
import { useChatActions } from '@/src/hooks/ai-chat/useChatActions';
import { useChatMessages } from '@/src/hooks/ai-chat/useChatMessages';
import { useToast } from '@/src/hooks/ui/useToast';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';

export default function AIChatScreen() {
  const navigation = useNavigation();
  const { sessionId } = useLocalSearchParams<{ sessionId: string }>();
  const { getSessionDetails, sendMessageToSession, recommendRitualPack } = useChatActions();
  const { data: messages, isLoading, error, refetch } = useChatMessages(sessionId);
  const [isRecommendationConsentCardVisible, setIsRecommendationConsentCardVisible] = useState(false);
  const { showInfo, showError } = useToast();

  const handleSendMessage = useCallback(async (message: string) => {
    try{
      const isReadyForRitualPack = await sendMessageToSession.mutateAsync({ sessionId, content: message });
    
      if (isReadyForRitualPack) {
        setIsRecommendationConsentCardVisible(true);
    }
    }catch(error){
      showError("Failed to send message");
    }
  }, [sessionId, sendMessageToSession]);

  const handleRitualRecommendation = async () => {
    try {
      const ritualPack = await recommendRitualPack.mutateAsync(sessionId);
      if (!ritualPack) {
        showInfo("No recommendation available at this time.");
      } 
    } catch (error) {
      showError("Failed to get your recommendation");
    }
    finally {
      setIsRecommendationConsentCardVisible(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      const session = await getSessionDetails(sessionId);
      if (!mounted) return;

      navigation.setOptions({ title: session?.title || "AI Chat" });
    })();
    return () => { mounted = false };
  }, [sessionId]);
  
  if (isLoading) return <LoadingState text="Loading your conversation..." />;
  if (error) return <ErrorState message="Failed to load your conversation." onButtonPress={() => refetch()} />;

  return (
    <View className="flex-1 bg-surface-screen">
      <KeyboardSafeScreen>
        {/* Messages and ritual recommendation cards */}
        <FlatList
          data={messages ? [...messages].reverse() : []}
          keyExtractor={(item) => item.id}
          inverted
          renderItem={({ item }) => (
            <View className="mb-4">
              <ChatMessage message={item}/>
            </View>
          )}
          ListHeaderComponent={
            <View className="mb-4">
              {isRecommendationConsentCardVisible && (
                <RitualRecommendationConsentCard onPress={handleRitualRecommendation} />
              )}
            </View>
          }
          ListEmptyComponent={<EmptyState message="No messages yet." />}
          contentContainerStyle={{ paddingHorizontal: 12, paddingTop: 80, paddingBottom: 16 }}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
        />
        
        {/* Chat input area */}
        <ChatInput 
          placeholder="Type your message..." 
          onSend={handleSendMessage}
        />

        {/* Ritual Recommendation Flow */}
        <RitualRecommendationModalHandler />
      </KeyboardSafeScreen>
    </View>
  );
}
