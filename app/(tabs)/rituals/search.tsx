import { ThemedText } from '@/components/themed-text';
import { apiService } from '@/src/services/api';
import { Ritual } from '@/src/types/data-model';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface TagItem {
  name: string;
  count: number;
  selected: boolean;
}

export default function SearchRitualsScreen() {
  const [rituals, setRituals] = useState<Ritual[]>([]);
  const [tags, setTags] = useState<TagItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchRituals = useCallback(async () => {
    try {
      const data = await apiService.getRituals();
      setRituals(data);
      
      // Extract and count tags
      const tagMap = new Map<string, number>();
      data.forEach(ritual => {
        ritual.tags.forEach(tag => {
          tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
        });
      });

      const tagItems = Array.from(tagMap.entries()).map(([name, count]) => ({
        name,
        count,
        selected: false
      }));

      setTags(tagItems);
    } catch (error) {
      console.error('Failed to fetch rituals:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRituals();
  }, [fetchRituals]);

  const toggleTag = (tagName: string) => {
    setTags(prevTags => 
      prevTags.map(tag => 
        tag.name === tagName 
          ? { ...tag, selected: !tag.selected }
          : tag
      )
    );
  };

  const handleSearch = () => {
    const selectedTags = tags.filter(tag => tag.selected).map(tag => tag.name);
    // Navigate back to rituals with search params
    router.push({
      pathname: '/(tabs)/rituals/all-rituals',
      params: { 
        searchTags: JSON.stringify(selectedTags),
        fromSearch: 'true'
      }
    });
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ThemedText>Loading...</ThemedText>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
      <View className="flex-1 bg-gray-50">
      {/* Header: Back (to All Rituals) + Search + Filter */}
      <View className="flex-row items-center p-4 border-b border-gray-200 bg-white">
        <Pressable onPress={() => router.replace('/(tabs)/rituals/all-rituals')} className="p-2 mr-2">
          <MaterialIcons name="arrow-back" size={24} color="#4B5563" />
        </Pressable>
        <Pressable 
          onPress={() => {}}
          className="flex-1 flex-row items-center bg-gray-100 rounded-lg px-3 py-2"
        >
          <MaterialIcons name="search" size={20} color="#9CA3AF" />
          <ThemedText className="text-gray-500 ml-2">Search rituals...</ThemedText>
        </Pressable>
        <Pressable onPress={handleSearch} className="p-2 ml-2">
          <MaterialIcons name="tune" size={24} color="#4B5563" />
        </Pressable>
      </View>

      {/* Tags */}
      <ScrollView className="flex-1 p-4">
        <ThemedText className="text-lg font-semibold mb-4">Filter by Tags</ThemedText>
        <View className="flex-row flex-wrap">
          {tags.map((tag) => (
            <Pressable
              key={tag.name}
              onPress={() => toggleTag(tag.name)}
              className={`px-4 py-2 m-1 rounded-full ${tag.selected ? 'bg-purple-100' : 'bg-gray-100'}`}
            >
              <ThemedText className={`${tag.selected ? 'text-purple-600 font-medium' : 'text-gray-700'}`}>
                {tag.name} ({tag.count})
              </ThemedText>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      {/* Search Button */}
      <View className="p-4 border-t border-gray-200 bg-white">
        <Pressable
          onPress={handleSearch}
          className="bg-purple-500 py-3 rounded-lg items-center"
        >
          <ThemedText className="text-white font-medium">
            Show Results ({tags.filter(t => t.selected).length} selected)
          </ThemedText>
        </Pressable>
      </View>
      </View>
    </SafeAreaView>
  );
}
