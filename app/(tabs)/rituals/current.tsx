import RitualCard from '@/components/RitualCard';
import { ThemedText } from '@/components/themed-text';
import { apiService } from '@/src/services/api';
import { Ritual } from '@/src/types/data-model';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CurrentRitualsScreen() {
  const [rituals, setRituals] = useState<Ritual[]>([]);
  const [filteredRituals, setFilteredRituals] = useState<Ritual[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTags, setSearchTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const params = useLocalSearchParams();

  const fetchRituals = useCallback(async () => {
    try {
      const data = await apiService.getRituals();
      const currentRituals = data.filter(ritual => ritual.isCurrent);
      setRituals(currentRituals);
      setFilteredRituals(currentRituals);
    } catch (error) {
      console.error('Failed to fetch rituals:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const router = useRouter();

  const handleRitualPress = (id: string) => {
    router.push(`/(tabs)/rituals/${id}`);
  };

  useEffect(() => {
    let filtered = [...rituals];
    
    // Apply search query filter
    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(ritual =>
        ritual.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ritual.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply tag filter if any tags are selected
    if (searchTags.length > 0) {
      filtered = filtered.filter(ritual =>
        searchTags.every(tag => ritual.tags.includes(tag))
      );
    }
    
    setFilteredRituals(filtered);
  }, [searchQuery, rituals, searchTags]);
  
  // Handle incoming search params
  useEffect(() => {
    if (params.searchTags) {
      try {
        const tags = JSON.parse(params.searchTags as string);
        setSearchTags(tags);
      } catch (error) {
        console.error('Error parsing search tags:', error);
      }
    }
  }, [params]);

  useFocusEffect(
    useCallback(() => {
      fetchRituals();
    }, [fetchRituals])
  );

  const renderRitualCard = useCallback(({ item }: { item: Ritual }) => (
    <RitualCard 
      key={item.id}
      ritual={item}
      onPress={() => handleRitualPress(item.id)}
    />
  ), [handleRitualPress]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ThemedText>Loading rituals...</ThemedText>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <View className="flex-1 bg-gray-50">
      {/* Tab Navigation */}
      <View className="flex-row bg-white border-b border-gray-200">
        <Pressable 
          className="flex-1 py-4 items-center border-b-2 border-purple-500"
          onPress={() => {}}
        >
          {({ pressed }) => (
            <ThemedText className={`${pressed ? 'opacity-70' : ''} text-purple-500 font-medium`}>
              Current
            </ThemedText>
          )}
        </Pressable>
        <Pressable 
          className="flex-1 py-4 items-center"
          onPress={() => router.push('/(tabs)/rituals/all-rituals')}
        >
          {({ pressed }) => (
            <ThemedText className={`${pressed ? 'opacity-70' : ''} text-gray-500`}>
              All Rituals
            </ThemedText>
          )}
        </Pressable>
      </View>

      {/* Search Bar */}
      <View className="px-4 py-3 bg-white">
        <Pressable 
          onPress={() => router.push('/(tabs)/rituals/search')}
          className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2"
        >
          <MaterialIcons name="search" size={20} color="#9CA3AF" style={{ marginRight: 8 }} />
          <ThemedText className="text-gray-500">
            {searchTags.length > 0 
              ? `${searchTags.length} filter${searchTags.length > 1 ? 's' : ''} applied` 
              : 'Search rituals...'}
          </ThemedText>
        </Pressable>
        
        {/* Display selected tags */}
        {searchTags.length > 0 && (
          <View className="flex-row flex-wrap mt-2">
            {searchTags.map(tag => (
              <View key={tag} className="bg-purple-100 rounded-full px-3 py-1 m-1 flex-row items-center">
                <ThemedText className="text-purple-700 text-sm">{tag}</ThemedText>
                <Pressable 
                  onPress={() => {
                    const newTags = searchTags.filter(t => t !== tag);
                    setSearchTags(newTags);
                    router.setParams({ searchTags: JSON.stringify(newTags) });
                  }}
                  className="ml-1"
                >
                  <MaterialIcons name="close" size={16} color="#6B46C1" />
                </Pressable>
              </View>
            ))}
            <Pressable 
              onPress={() => {
                // Clear both local state and update URL
                setSearchTags([]);
                setSearchQuery('');
                // Update URL to remove search params
                router.setParams({ searchTags: '' });
              }}
              className="self-center ml-2"
            >
              <ThemedText className="text-purple-600 text-sm">Clear all</ThemedText>
            </Pressable>
          </View>
        )}
      </View>

      {/* Content */}
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
                {searchQuery ? 'No matching rituals found' : 'No current rituals'}
              </ThemedText>
            </View>
          }
        />
      </View>
      </View>
    </SafeAreaView>
  );
}
