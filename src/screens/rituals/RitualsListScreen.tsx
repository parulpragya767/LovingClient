import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, ScrollView, TextInput, View } from 'react-native';
import { useRituals as useRitualsHook } from '@/src/hooks/useRituals';
import { Ritual } from '@/src/models/ritual';

interface RitualsListScreenProps {
  showSearchHeader?: boolean;
  initialSearchQuery?: string;
  onRitualPress?: (id: string) => void;
}

// Default image for rituals without an image
const DEFAULT_RITUAL_IMAGE = 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';

export default function RitualsListScreen({ 
  showSearchHeader = false, 
  initialSearchQuery = '',
  onRitualPress 
}: RitualsListScreenProps) {
  const router = useRouter();
  const { searchTags } = useLocalSearchParams<{ searchTags?: string }>();
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const { data: rituals = [], isLoading } = useRitualsHook();
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  
  // Filter rituals based on search query and tags
  const filteredRituals = rituals.filter(ritual => {
    const matchesSearch = searchQuery === '' || 
      (ritual.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ritual.shortDescription && ritual.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()));
    
    let matchesTags = true;
    if (searchTags) {
      const tags = Array.isArray(searchTags) ? searchTags : [searchTags];
      matchesTags = tags.every(tag => 
        ritual.tags?.includes(tag)
      );
    }
    
    return matchesSearch && matchesTags;
  });

  const handleRitualPress = (id: string) => {
    if (onRitualPress) {
      onRitualPress(id);
    } else {
      router.push(`/rituals/${id}`);
    }
  };

  const toggleFavorite = async (id: string, currentState: boolean) => {
    try {
      // In a real app, you would call an API to update the favorite status
      setFavorites(prev => ({ ...prev, [id]: !currentState }));
    } catch (error) {
      console.error('Failed to update favorite status:', error);
    }
  };

  const renderRitualCard = ({ item }: { item: Ritual }) => (
    <Pressable 
      onPress={() => handleRitualPress(item.id)}
      className="bg-white rounded-xl overflow-hidden shadow-sm mb-4 p-4"
    >
      <View className="flex-row justify-between items-start">
        <View className="flex-1">
          <ThemedText className="font-semibold text-gray-900 text-lg" numberOfLines={1}>
            {item.title}
          </ThemedText>
          {item.shortDescription && (
            <ThemedText className="text-gray-600 text-sm mt-1" numberOfLines={2}>
              {item.shortDescription}
            </ThemedText>
          )}
          {item.tags && item.tags.length > 0 && (
            <View className="flex-row flex-wrap mt-2">
              {item.tags.slice(0, 3).map((tag, index) => (
                <View key={index} className="bg-gray-100 rounded-full px-2 py-1 mr-2 mb-1">
                  <ThemedText className="text-gray-600 text-xs">
                    {tag}
                  </ThemedText>
                </View>
              ))}
            </View>
          )}
        </View>
        <View className="ml-2">
          <View className="w-2 h-2 rounded-full bg-green-500" />
        </View>
      </View>
    </Pressable>
  );

  
  return (
    <ThemedView className="flex-1">
      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#8B5CF6" />
        </View>
      ) : (
        <>
          {showSearchHeader && (
            <View className="flex-row items-center p-4 border-b border-gray-200 bg-white">
              <Pressable 
                onPress={() => router.back()}
                className="p-2 mr-2"
              >
                <MaterialIcons name="arrow-back" size={24} color="#4B5563" />
              </Pressable>
              <View className="flex-1 bg-gray-100 rounded-lg px-4 py-2 flex-row items-center">
                <MaterialIcons name="search" size={20} color="#9CA3AF" />
                <TextInput
                  placeholder="Search rituals..."
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  className="flex-1 ml-2 py-1 text-base"
                  clearButtonMode="while-editing"
                />
              </View>
            </View>
          )}
          
          {!showSearchHeader && (
            <View className="p-4">
              <View className="bg-white rounded-lg px-4 py-2 flex-row items-center border border-gray-200">
                <ThemedText>🔍</ThemedText>
                <TextInput
                  placeholder="Search rituals..."
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  className="flex-1 ml-2 py-1"
                  clearButtonMode="while-editing"
                />
              </View>
            </View>
          )}
        </>
      )}

      {/* Filter Chips - Using tags from rituals */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        className="px-4 mb-2"
      >
        <Pressable 
          key="all"
          className="bg-white rounded-full px-3 py-1.5 mr-2 border border-gray-200"
          onPress={() => setSearchQuery('')}
        >
          <ThemedText className="text-sm text-gray-700">All</ThemedText>
        </Pressable>
        {Array.from(
          new Set(rituals.flatMap(r => r.tags || []))
        ).slice(0, 7).map((tag) => (
          <Pressable 
            key={tag}
            className="bg-white rounded-full px-3 py-1.5 mr-2 border border-gray-200"
            onPress={() => setSearchQuery(tag)}
          >
            <ThemedText className="text-sm text-gray-700">{tag}</ThemedText>
          </Pressable>
        ))}
      </ScrollView>

      {/* Rituals List */}
      <FlatList
        data={filteredRituals}
        keyExtractor={(item) => item.id}
        renderItem={renderRitualCard}
        contentContainerStyle={{ padding: 16, paddingTop: 8 }}
        ListEmptyComponent={
          <View className="items-center justify-center py-10">
            <ThemedText className="text-gray-500">No rituals found</ThemedText>
          </View>
        }
      />
    </ThemedView>
  );
}
