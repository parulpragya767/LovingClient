import RitualCard from '@/components/RitualCard';
import { ThemedText } from '@/components/themed-text';
import { apiService } from '@/src/services/api';
import { Ritual } from '@/src/types/data-model';
import { MaterialIcons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { FlatList, Pressable, TextInput, View } from 'react-native';

export default function AllRitualsScreen() {
  const [rituals, setRituals] = useState<Ritual[]>([]);
  const [filteredRituals, setFilteredRituals] = useState<Ritual[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchRituals = useCallback(async () => {
    try {
      const data = await apiService.getRituals();
      setRituals(data);
      setFilteredRituals(data);
    } catch (error) {
      console.error('Failed to fetch rituals:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredRituals(rituals);
    } else {
      const filtered = rituals.filter(ritual =>
        ritual.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ritual.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredRituals(filtered);
    }
  }, [searchQuery, rituals]);

  useFocusEffect(
    useCallback(() => {
      fetchRituals();
    }, [fetchRituals])
  );

  const handleRitualPress = (id: string) => {
    router.push(`/(tabs)/rituals/${id}`);
  };

  const renderRitualCard = useCallback(({ item }: { item: Ritual }) => (
    <RitualCard 
      key={item.id}
      ritual={item}
      onPress={() => handleRitualPress(item.id)}
    />
  ), []);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ThemedText>Loading rituals...</ThemedText>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      {/* Tab Navigation */}
      <View className="flex-row bg-white border-b border-gray-200">
        <Pressable 
          className="flex-1 py-4 items-center"
          onPress={() => router.push('/(tabs)/rituals/current')}
        >
          {({ pressed }) => (
            <ThemedText className={`${pressed ? 'opacity-70' : ''} text-gray-500`}>
              Current
            </ThemedText>
          )}
        </Pressable>
        <Pressable 
          className="flex-1 py-4 items-center border-b-2 border-purple-500"
          onPress={() => {}}
        >
          {({ pressed }) => (
            <ThemedText className={`${pressed ? 'opacity-70' : ''} text-purple-500 font-medium`}>
              All Rituals
            </ThemedText>
          )}
        </Pressable>
      </View>

      {/* Search Bar */}
      <View className="px-4 py-3 bg-white">
        <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2">
          <MaterialIcons name="search" size={20} color="#9CA3AF" style={{ marginRight: 8 }} />
          <TextInput
            placeholder="Search rituals..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 text-base text-gray-800"
            placeholderTextColor="#9CA3AF"
          />
          {searchQuery.length > 0 && (
            <Pressable 
              onPress={() => setSearchQuery('')}
              className="p-1"
            >
              {({ pressed }) => (
                <MaterialIcons 
                  name="close" 
                  size={20} 
                  color="#9CA3AF" 
                  style={{ opacity: pressed ? 0.7 : 1 }}
                />
              )}
            </Pressable>
          )}
        </View>
      </View>

      {/* Rituals List */}
      <View className="flex-1 px-4 pt-2">
        <FlatList
          data={filteredRituals}
          keyExtractor={(item) => item.id}
          renderItem={renderRitualCard}
          showsVerticalScrollIndicator={false}
          contentContainerClassName="pb-5"
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center mt-10">
              <ThemedText className="text-gray-500">
                {searchQuery ? 'No matching rituals found' : 'No rituals available'}
              </ThemedText>
            </View>
          }
        />
      </View>
    </View>
  );
}
