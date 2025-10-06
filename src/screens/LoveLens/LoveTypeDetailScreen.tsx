import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { loveTypesData as loveTypes } from '@/src/data/loveTypes';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, View } from 'react-native';

export default function LoveTypeDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  
  const loveType = loveTypes.find(type => type.id === id);
  
  if (!loveType) {
    return (
      <ThemedView className="flex-1 items-center justify-center p-4">
        <ThemedText className="text-lg text-gray-600">Love type not found</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-6">
        <View className="items-center mb-6">
          <View className="bg-white p-4 rounded-2xl shadow-sm mb-4">
            <ThemedText className="text-4xl">{loveType.emoji}</ThemedText>
          </View>
          <ThemedText className="text-2xl font-bold text-center mb-2">
            {loveType.name}
          </ThemedText>
          <ThemedText className="text-center text-gray-600 mb-6">
            {loveType.description}
          </ThemedText>
        </View>

        <View className="bg-white rounded-xl p-5 mb-6 shadow-sm">
          <ThemedText className="text-lg font-semibold mb-3">
            What It Means
          </ThemedText>
          <ThemedText className="text-gray-700 mb-4">
            {loveType.longDescription || 'No detailed description available.'}
          </ThemedText>
        </View>

        <View className="bg-white rounded-xl p-5 mb-6 shadow-sm">
          <ThemedText className="text-lg font-semibold mb-3">
            How to Express It
          </ThemedText>
          {loveType.howToExpress?.map((tip, index) => (
            <View key={index} className="flex-row mb-2">
              <ThemedText className="text-blue-600 mr-2">•</ThemedText>
              <ThemedText className="text-gray-700 flex-1">
                {tip}
              </ThemedText>
            </View>
          )) || (
            <ThemedText className="text-gray-500 italic">
              No specific suggestions available.
            </ThemedText>
          )}
        </View>

        <View className="bg-white rounded-xl p-5 shadow-sm">
          <ThemedText className="text-lg font-semibold mb-3">
            Why It's Important
          </ThemedText>
          <ThemedText className="text-gray-700">
            {loveType.importance || 'This love language helps partners feel valued and appreciated in their relationship.'}
          </ThemedText>
        </View>
      </View>
    </ScrollView>
  );
}
