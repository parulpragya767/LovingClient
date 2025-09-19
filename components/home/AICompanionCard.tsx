import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';

export default function AICompanionCard() {
  const router = useRouter();

  return (
    <View className="px-4 pt-4 pb-6">
      <Pressable 
        onPress={() => router.push('/ai-companion')}
        className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm"
      >
        <ThemedView className="flex-row items-center">
          <View className="bg-blue-50 rounded-full p-3 mr-4">
            <MaterialIcons name="chat-bubble-outline" size={24} color="#3B82F6" />
          </View>
          <View className="flex-1">
            <ThemedText className="text-gray-900 text-base font-semibold mb-1">Need to talk?</ThemedText>
            <ThemedText className="text-gray-600 text-sm">Chat with your AI companion about any relationship questions or concerns</ThemedText>
          </View>
          <MaterialIcons name="chevron-right" size={24} color="#9CA3AF" />
        </ThemedView>
      </Pressable>
    </View>
  );
}
