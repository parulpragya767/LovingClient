import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { apiService } from '@/src/services/api';
import { userCurrentOverrides } from '@/src/services/userCurrentOverrides';
import { Ritual } from '@/src/types/data-model';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function RitualHistoryScreen() {
  const router = useRouter();
  const [completedRituals, setCompletedRituals] = useState<{
    id: string;
    ritual: Ritual | null;
    feedback?: { emoji: string; timestamp: number };
  }[]>([]);

  useEffect(() => {
    const loadCompletedRituals = async () => {
      const completed = userCurrentOverrides.getAllCompleted();
      const rituals = await apiService.getRituals();
      const ritualsById = new Map(rituals.map(r => [r.id, r]));
      
      const withDetails = completed
        .map(({ id, feedback }) => ({
          id,
          ritual: ritualsById.get(id) || null,
          feedback,
        }))
        .sort((a, b) => (b.feedback?.timestamp || 0) - (a.feedback?.timestamp || 0));
      
      setCompletedRituals(withDetails);
    };

    loadCompletedRituals();
  }, []);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Top tabs to match Current screen */}
      <View className="w-full items-center bg-white">
        <View className="w-full px-4 pt-3">
          {/* Search (match Current screen) */}
          <Pressable 
            className="flex-row items-center bg-gray-100 rounded-lg px-3 h-10 w-full"
            onPress={() => router.push('/(tabs)/rituals/search')}
          >
            <MaterialIcons name="search" size={20} color="#6B7280" />
            <ThemedText className="text-gray-500 ml-2">Search rituals...</ThemedText>
          </Pressable>
          <View className="flex-row border-b border-gray-200 mt-2">
            <Pressable 
              className="flex-1 py-3 items-center border-b-2 border-transparent"
              onPress={() => router.replace('/(tabs)/rituals/current')}
            >
              <ThemedText className="text-gray-400 font-semibold text-sm">Current</ThemedText>
            </Pressable>
            <Pressable 
              className="flex-1 py-3 items-center border-b-2 border-transparent"
              onPress={() => router.push('/(tabs)/rituals/all-rituals')}
            >
              <ThemedText className="text-gray-400 font-semibold text-sm">All Rituals</ThemedText>
            </Pressable>
            <Pressable 
              className="flex-1 py-3 items-center border-b-2 border-purple-500"
              onPress={() => {}}
            >
              <ThemedText className="text-gray-600 font-semibold text-sm">History</ThemedText>
            </Pressable>
          </View>
        </View>
      </View>
      <FlatList
        data={completedRituals}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
          <View className="items-center justify-center py-10">
            <ThemedText className="text-gray-500">
              No completed rituals yet
            </ThemedText>
          </View>
        }
        renderItem={({ item }) => (
          <View className="bg-white rounded-xl p-4 mb-3 flex-row items-center justify-between">
            <View className="flex-1">
              <ThemedText className="font-medium text-gray-900">
                {item.ritual?.title || 'Unknown Ritual'}
              </ThemedText>
              {item.feedback?.timestamp && (
                <ThemedText className="text-xs text-gray-500 mt-1">
                  {formatDate(item.feedback.timestamp)}
                </ThemedText>
              )}
            </View>
            {item.feedback?.emoji && (
              <View className="ml-4">
                <ThemedText className="text-2xl">
                  {item.feedback.emoji}
                </ThemedText>
              </View>
            )}
          </View>
        )}
      />
    </SafeAreaView>
  );
}
