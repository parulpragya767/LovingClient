import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, ScrollView, View } from 'react-native';

const MOCK_RITUALS = {
  '1': {
    id: '1',
    title: 'Morning Gratitude',
    description: 'Start your day by sharing what you\'re grateful for',
    duration: '5 min',
    frequency: 'Daily',
    category: 'Connection',
    steps: [
      'Sit facing each other',
      'Take three deep breaths together',
      'Share one thing you\'re grateful for about your partner',
      'Share one thing you\'re looking forward to today',
      'End with a hug'
    ],
    benefits: [
      'Starts the day on a positive note',
      'Increases feelings of connection',
      'Builds appreciation for each other'
    ],
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  '2': {
    id: '2',
    title: 'Weekly Check-in',
    description: 'A dedicated time to connect and communicate openly',
    duration: '30 min',
    frequency: 'Weekly',
    category: 'Communication',
    steps: [
      'Choose a quiet, comfortable space',
      'Take turns sharing your highs and lows of the week',
      'Discuss any concerns or appreciations',
      'Plan something to look forward to together',
      'End with a shared activity you both enjoy'
    ],
    benefits: [
      'Improves communication',
      'Prevents small issues from becoming big problems',
      'Strengthens emotional connection'
    ],
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  }
};

type Ritual = typeof MOCK_RITUALS['1'];

export default function RitualDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [isFavorite, setIsFavorite] = useState(false);
  
  // In a real app, you would fetch this data based on the ID
  const ritual: Ritual | undefined = MOCK_RITUALS[id as keyof typeof MOCK_RITUALS];
  
  if (!ritual) {
    return (
      <ThemedView className="flex-1 items-center justify-center p-4">
        <ThemedText className="text-lg text-gray-600">Ritual not found</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header Image */}
      <View className="h-48 bg-gray-200 overflow-hidden">
        <Image 
          source={{ uri: ritual.image }} 
          className="w-full h-full" 
          resizeMode="cover"
        />
        <Pressable 
          onPress={() => router.back()}
          className="absolute top-4 left-4 bg-white/80 p-2 rounded-full"
        >
          <MaterialIcons name="arrow-back" size={24} color="#4B5563" />
        </Pressable>
      </View>

      <View className="p-6">
        {/* Title and Favorite Button */}
        <View className="flex-row justify-between items-start mb-4">
          <View className="flex-1">
            <ThemedText className="text-2xl font-bold mb-1">
              {ritual.title}
            </ThemedText>
            <ThemedText className="text-gray-600">
              {ritual.description}
            </ThemedText>
          </View>
          <Pressable 
            onPress={() => setIsFavorite(!isFavorite)}
            className="p-2 ml-2"
          >
            <MaterialIcons 
              name={isFavorite ? 'favorite' : 'favorite-border'} 
              size={24} 
              color={isFavorite ? '#EF4444' : '#9CA3AF'} 
            />
          </Pressable>
        </View>

        {/* Quick Info */}
        <View className="flex-row justify-between mb-6">
          <View className="items-center">
            <ThemedText className="text-gray-500 text-xs">Duration</ThemedText>
            <ThemedText className="font-medium">{ritual.duration}</ThemedText>
          </View>
          <View className="items-center">
            <ThemedText className="text-gray-500 text-xs">Frequency</ThemedText>
            <ThemedText className="font-medium">{ritual.frequency}</ThemedText>
          </View>
          <View className="items-center">
            <ThemedText className="text-gray-500 text-xs">Category</ThemedText>
            <ThemedText className="font-medium">{ritual.category}</ThemedText>
          </View>
        </View>

        {/* Steps */}
        <View className="mb-8">
          <ThemedText className="text-lg font-semibold mb-3">How to Do It</ThemedText>
          <View className="bg-white rounded-xl p-4 shadow-sm">
            {ritual.steps.map((step, index) => (
              <View key={index} className="flex-row mb-3 last:mb-0">
                <View className="bg-blue-100 w-6 h-6 rounded-full items-center justify-center mr-3 mt-0.5">
                  <ThemedText className="text-blue-700 font-bold text-xs">
                    {index + 1}
                  </ThemedText>
                </View>
                <ThemedText className="flex-1 text-gray-700">
                  {step}
                </ThemedText>
              </View>
            ))}
          </View>
        </View>

        {/* Benefits */}
        <View className="mb-8">
          <ThemedText className="text-lg font-semibold mb-3">Benefits</ThemedText>
          <View className="bg-white rounded-xl p-4 shadow-sm">
            {ritual.benefits.map((benefit, index) => (
              <View key={index} className="flex-row items-start mb-2 last:mb-0">
                <ThemedText className="text-green-600 mr-2">✓</ThemedText>
                <ThemedText className="text-gray-700 flex-1">
                  {benefit}
                </ThemedText>
              </View>
            ))}
          </View>
        </View>

        {/* Start Button */}
        <Pressable 
          onPress={() => {
            // Start the ritual
            router.push(`/rituals/start/${ritual.id}`);
          }}
          className="bg-blue-600 py-4 rounded-xl items-center justify-center mb-6"
        >
          <ThemedText className="text-white font-semibold text-lg">
            Start This Ritual
          </ThemedText>
        </Pressable>
      </View>
    </ScrollView>
  );
}
