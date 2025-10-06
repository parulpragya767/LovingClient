import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';

export default function AICompanionScreen() {
  const router = useRouter();

  return (
    <ThemedView className="flex-1 p-4">
      <ThemedText className="text-2xl font-bold mb-6">AI Companion</ThemedText>
      
      <View className="bg-white rounded-xl p-6 mb-6 shadow-sm">
        <View className="flex-row items-center mb-4">
          <View className="bg-blue-100 rounded-full p-3 mr-4">
            <MaterialIcons name="chat-bubble" size={24} color="#3B82F6" />
          </View>
          <ThemedText className="text-lg font-semibold">Chat with your AI Companion</ThemedText>
        </View>
        
        <ThemedText className="text-gray-600 mb-6">
          Get personalized advice and support for your relationship questions and concerns.
        </ThemedText>
        
        <Pressable 
          onPress={() => router.push('/ai-companion/chat')}
          className="bg-blue-600 py-3 px-6 rounded-lg flex-row items-center justify-center"
        >
          <ThemedText className="text-white font-medium mr-2">Start Chatting</ThemedText>
          <MaterialIcons name="arrow-forward" size={20} color="white" />
        </Pressable>
      </View>
      
      <View className="bg-white rounded-xl p-6 shadow-sm">
        <ThemedText className="text-lg font-semibold mb-4">Suggested Topics</ThemedText>
        
        {[
          'Communication issues',
          'Building trust',
          'Improving intimacy',
          'Conflict resolution'
        ].map((topic, index) => (
          <Pressable 
            key={index}
            onPress={() => router.push(`/ai-companion/chat?topic=${encodeURIComponent(topic)}`)}
            className="py-3 border-b border-gray-100 flex-row justify-between items-center"
          >
            <ThemedText className="text-gray-800">{topic}</ThemedText>
            <MaterialIcons name="chevron-right" size={20} color="#9CA3AF" />
          </Pressable>
        ))}
      </View>
    </ThemedView>
  );
}
