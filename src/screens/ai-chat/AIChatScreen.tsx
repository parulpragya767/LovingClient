import { ChatInput } from '@/components/ai-chat/ChatInput';
import { ChatMessage } from '@/components/ai-chat/ChatMessage';
import { SuggestedRitualPack } from '@/components/ai-chat/SuggestedRitualPack';
import { ThemedText } from '@/components/themes/themed-text';
import { ThemedView } from '@/components/themes/themed-view';
import { useChatActions } from '@/src/hooks/ai-chat/useChatActions';
import { RitualPack } from '@/src/models/ritualPacks';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Alert, FlatList, KeyboardAvoidingView, Platform, TouchableOpacity, View } from 'react-native';
import RitualPackSuggestionModal from '../rituals/RitualPackSuggestionModal';

export default function AIChatScreen() {
  const router = useRouter();
  const { currentConversation, sendMessage, recommendRitualPack } = useChatActions();
  const [showRitualPackButton, setShowRitualPackButton] = useState(false);
  const [suggestedRitualPack, setSuggestedRitualPack] = useState<RitualPack | null>(null);
  const [showRitualPackModal, setShowRitualPackModal] = useState(false);

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
        setSuggestedRitualPack(ritualPack);
      } else {
        Alert.alert('No Recommendations', 'No ritual pack recommendations available at this time.');
      }
    } catch (error) {
      console.error('Error getting ritual pack:', error);
      Alert.alert('Error', 'Failed to get ritual pack recommendations. Please try again.');
    } finally {
      setShowRitualPackButton(false);
    }
  };

  const handleRitualPackPress = useCallback(() => {
    setShowRitualPackModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowRitualPackModal(false);
  }, []);

  const handleAddRituals = useCallback((selectedIds: string[]) => {
    // Handle adding selected rituals
    console.log('Adding rituals:', selectedIds);
    setShowRitualPackModal(false);
    setSuggestedRitualPack(null);
  }, []);

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
          <View className="w-full">
            {showRitualPackButton && (
              <TouchableOpacity 
                className="bg-blue-50 p-4 rounded-lg self-start max-w-[80%] mb-4 border border-blue-100"
                onPress={handleGetRitualPack}
              >
                <View className="flex-row items-start">
                  <View className="bg-blue-100 rounded-full w-6 h-6 items-center justify-center mr-2">
                    <MaterialIcons name="check" size={16} color="#3b82f6" />
                  </View>
                  <View className="flex-1">
                    <ThemedText className="text-sm text-gray-800">
                      Would you like me to recommend a personalized ritual pack based on our conversation?
                    </ThemedText>
                    <ThemedText className="text-blue-500 text-sm mt-1 font-medium">
                      Show me recommendations
                    </ThemedText>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            {suggestedRitualPack && (
              <SuggestedRitualPack 
                ritualPack={suggestedRitualPack} 
                onPress={handleRitualPackPress}
              />
            )}
          </View>
        }
      />

      {/* Input */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="p-0"
      >
        <View className="w-full">
          <ChatInput 
            placeholder="Type your message..." 
            onSubmit={handleSendMessage}
          />
        </View>
      </KeyboardAvoidingView>

      {/* Ritual Pack Suggestion Modal */}
      {suggestedRitualPack && (
        <RitualPackSuggestionModal
          isVisible={showRitualPackModal}
          ritualPack={suggestedRitualPack}
          onClose={handleCloseModal}
          onAddRituals={handleAddRituals}
        />
      )}
    </ThemedView>
  );
}
