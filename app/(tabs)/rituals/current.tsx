import RitualCard from '@/components/RitualCard';
import { ThemedText } from '@/components/themed-text';
import { apiService } from '@/src/services/api';
import { Ritual } from '@/src/types/data-model';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CurrentRitualsScreen() {
  const [rituals, setRituals] = useState<Ritual[]>([]);
  const [filteredRituals, setFilteredRituals] = useState<Ritual[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchRituals = useCallback(async () => {
    try {
      const data = await apiService.getRituals();
      const currentRituals = data.filter((ritual) => ritual.isCurrent);
      setRituals(currentRituals);
      setFilteredRituals(currentRituals);
    } catch (error) {
      console.error('Failed to fetch rituals:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleRitualPress = (id: string) => {
    router.push(`/(tabs)/rituals/${id}`);
  };

  const renderRitualCard = ({ item }: { item: Ritual }) => (
    <RitualCard ritual={item} onPress={() => handleRitualPress(item.id)} />
  );

  useEffect(() => {
    let filtered = [...rituals];

    // Apply search query filter
    if (searchQuery.trim() !== '') {
      filtered = filtered.filter((ritual) =>
        ritual.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ritual.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredRituals(filtered);
  }, [searchQuery, rituals]);

  useFocusEffect(
    useCallback(() => {
      fetchRituals();
    }, [fetchRituals])
  );

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ThemedText>Loading rituals...</ThemedText>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="w-full items-center bg-white">
        <View className="w-full px-4 pt-3">
          {/* Search (only on Current) */}
          <Pressable 
            className="flex-row items-center bg-gray-100 rounded-lg px-3 h-10 w-full"
            onPress={() => router.push('/(tabs)/rituals/search')}
          >
            <MaterialIcons name="search" size={20} color="#6B7280" />
            <ThemedText className="text-gray-500 ml-2">Search rituals...</ThemedText>
          </Pressable>
          {/* Tabs */}
          <View className="flex-row border-b border-gray-200 mt-2">
            <Pressable 
              className="flex-1 py-3 items-center border-b-2 border-purple-500"
              onPress={() => router.replace('/(tabs)/rituals/current')}
            >
              <ThemedText className="text-gray-600 font-semibold text-sm">Current</ThemedText>
            </Pressable>
            <Pressable 
              className="flex-1 py-3 items-center border-b-2 border-transparent"
              onPress={() => router.push('/(tabs)/rituals/all-rituals')}
            >
              <ThemedText className="text-gray-400 font-semibold text-sm">All Rituals</ThemedText>
            </Pressable>
          </View>
        </View>
      </View>

      <View className="flex-1 p-4">
        <View className="mb-6">
          <ThemedText className="text-2xl font-bold mb-1 text-gray-900">Your Current Rituals</ThemedText>
          <ThemedText className="text-sm text-gray-500">
            Keep track of your daily practices
          </ThemedText>
        </View>

        <FlatList
          data={filteredRituals}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <RitualCard 
              ritual={item} 
              onPress={() => handleRitualPress(item.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 16 }}
          ListEmptyComponent={
            <View className="flex-1 justify-center items-center py-10">
              <ThemedText className="text-gray-500">
                {searchQuery ? 'No matching rituals found' : 'No current rituals'}
              </ThemedText>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}
