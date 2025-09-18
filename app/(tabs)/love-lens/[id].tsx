import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { apiService } from '@/src/services/api';
import { LoveType } from '@/src/types/data-model';

export default function LoveTypeDetailScreen() {
  const [loveType, setLoveType] = useState<LoveType | null>(null);
  const [loading, setLoading] = useState(true);

  // Get the ID from the route params
  const params = useLocalSearchParams<{ id: string }>();
  const id = params?.id;
  
  if (!id) {
    return (
      <ThemedView className="flex-1 items-center justify-center">
        <ThemedText>Invalid love type ID</ThemedText>
      </ThemedView>
    );
  }

  useEffect(() => {
    async function fetchLoveType() {
      try {
        const data = await apiService.getLoveTypeById(id);
        if (data) {
          setLoveType(data);
        } else {
          console.error(`Love type with id ${id} not found`);
        }
      } catch (error) {
        console.error('Failed to fetch love type:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchLoveType();
  }, [id]);

  if (loading) {
    return (
      <ThemedView className="flex-1 items-center justify-center">
        <ThemedText>Loading...</ThemedText>
      </ThemedView>
    );
  }

  if (!loveType) {
    return (
      <ThemedView className="flex-1 items-center justify-center">
        <ThemedText>Love type not found</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <Stack.Screen options={{ 
        title: loveType.name,
        headerBackTitle: 'Back'
      }} />
      
      <ThemedView className="p-6">
        <ThemedText className="text-3xl font-bold mb-4 text-gray-800">
          {loveType.name}
        </ThemedText>
        
        <ThemedText className="text-lg mb-6 text-gray-700">
          {loveType.description}
        </ThemedText>
        
        {/* Add more details here */}
        <View className="mt-6">
          <ThemedText className="text-xl font-semibold mb-3 text-gray-800">
            How to Show This Love Language
          </ThemedText>
          <View className="bg-white rounded-lg p-4 shadow-sm">
            <ThemedText className="text-gray-700">
              Detailed information about how to express this love language will go here.
              You can add specific examples, tips, and activities that resonate with this love type.
            </ThemedText>
          </View>
        </View>
        
        <View className="mt-6">
          <ThemedText className="text-xl font-semibold mb-3 text-gray-800">
            Why It Matters
          </ThemedText>
          <View className="bg-white rounded-lg p-4 shadow-sm">
            <ThemedText className="text-gray-700">
              Explanation of why this love language is important in relationships
              and how it can strengthen the bond between partners.
            </ThemedText>
          </View>
        </View>
      </ThemedView>
    </ScrollView>
  );
}
