import { ThemedText } from '@/components/themes/themed-text';
import { ThemedView } from '@/components/themes/themed-view';
import { RitualDTO } from '@/src/api/models/ritual-dto';
import { RitualStep } from '@/src/api/models/ritual-step';
import { useRitual } from '@/src/hooks/rituals/useRitual';
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Image, Pressable, ScrollView, View } from 'react-native';

// Local type for the UI
interface RitualDetails {
  id: string;
  title: string;
  description: string;
  duration: string;
  frequency: string;
  category: string;
  steps: string[];
  benefits: string[];
  image?: string;
}

// Helper function to map API data to UI format
const mapRitualToDetails = (ritual: RitualDTO): RitualDetails => {
  const duration = ritual.estimatedDurationMinutes 
    ? `${ritual.estimatedDurationMinutes} min` 
    : 'Varies';
    
  const frequency = ritual.ritualMode ? 
    ritual.ritualMode.charAt(0) + ritual.ritualMode.slice(1).toLowerCase().replace('_', ' ') : 
    'As needed';
    
  const category = ritual.ritualTypes?.[0] || 'Connection';
  
  // Map steps
  const steps = (ritual.ritualSteps || [])
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .map((step: RitualStep) => step.description || '')
    .filter(Boolean);
    
  // Use relational needs served as benefits
  const benefits = ritual.relationalNeedsServed?.length ? 
    ritual.relationalNeedsServed : 
    [ritual.shortDescription || ''];
  
  return {
    id: ritual.id || '',
    title: ritual.title || 'Untitled Ritual',
    description: ritual.fullDescription || ritual.shortDescription || 'No description available',
    duration,
    frequency,
    category,
    steps,
    benefits,
    image: ritual.mediaAssets?.[0]?.url
  };
};

export default function RitualDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [isFavorite, setIsFavorite] = useState(false);
  
  const { data: ritualData, isLoading, error } = useRitual(id);
  
  if (isLoading) {
    return (
      <ThemedView className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }
  
  if (error || !ritualData) {
    return (
      <ThemedView className="flex-1 items-center justify-center p-4">
        <ThemedText className="text-center">
          {error?.message || 'Failed to load ritual details'}
        </ThemedText>
      </ThemedView>
    );
  }
  
  const ritual = mapRitualToDetails(ritualData);

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header Image */}
      <View className="h-48 bg-gray-200 overflow-hidden">
        {ritual.image ? (
          <Image 
            source={{ uri: ritual.image }} 
            className="w-full h-full" 
            resizeMode="cover"
          />
        ) : (
          <View className="flex-1 items-center justify-center bg-gray-200">
            <MaterialIcons name="celebration" size={64} color="#9CA3AF" />
          </View>
        )}
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
