import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { apiService } from '@/src/services/api';
import { Ritual } from '@/src/types/data-model';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';

export default function RitualDetailScreen() {
  const [ritual, setRitual] = useState<Ritual | null>(null);
  const [loading, setLoading] = useState(true);

  // Get the ID from the route params
  const params = useLocalSearchParams<{ id: string }>();
  const id = params?.id;
  
  if (!id) {
    return (
      <ThemedView className="flex-1 items-center justify-center">
        <ThemedText>Invalid ritual ID</ThemedText>
      </ThemedView>
    );
  }

  useEffect(() => {
    async function fetchRitual() {
      try {
        const data = await apiService.getRitualById(id);
        if (data) {
          setRitual(data);
        } else {
          console.error(`Ritual with id ${id} not found`);
        }
      } catch (error) {
        console.error('Failed to fetch ritual:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchRitual();
  }, [id]);

  if (loading) {
    return (
      <ThemedView className="flex-1 items-center justify-center">
        <ThemedText>Loading...</ThemedText>
      </ThemedView>
    );
  }

  if (!ritual) {
    return (
      <ThemedView className="flex-1 items-center justify-center">
        <ThemedText>Ritual not found</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <Stack.Screen options={{ 
        title: ritual.name,
        headerBackTitle: 'Back'
      }} />
      
      <ThemedView className="p-6">
        <ThemedText className="text-3xl font-bold mb-4 text-gray-800">
          {ritual.name}
        </ThemedText>
        
        <ThemedText className="text-lg mb-6 text-gray-700">
          {ritual.description}
        </ThemedText>
        
        <View className="mt-6">
          <ThemedText className="text-xl font-semibold mb-3 text-gray-800">
            How to Practice
          </ThemedText>
          <View className="bg-white rounded-lg p-4 shadow-sm">
            <ThemedText className="text-gray-700">
              {ritual.howTo || 'Detailed steps for this ritual will be shown here.'}
            </ThemedText>
          </View>
        </View>
        
        <View className="mt-6">
          <ThemedText className="text-xl font-semibold mb-3 text-gray-800">
            Benefits
          </ThemedText>
          <View className="bg-white rounded-lg p-4 shadow-sm">
            <ThemedText className="text-gray-700">
              {ritual.benefits || 'Benefits of this ritual will be shown here.'}
            </ThemedText>
          </View>
        </View>
      </ThemedView>
    </ScrollView>
  );
}
