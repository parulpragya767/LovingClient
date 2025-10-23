 import { ThemedText } from '@/components/themed-text';
import { Ritual } from '@/src/models/rituals';
import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { FlatList, Pressable, View } from 'react-native';

interface RitualCardProps {
  rituals: Ritual[];
}

 export default function CurrentRitualsHome({ rituals }: RitualCardProps) {
   const router = useRouter();

  const handleRitualPress = (id: string) => {
    router.push(`/rituals/${id}`);
  };

  const renderRitualCard = useCallback(({ item }: { item: Ritual }) => (
    <Pressable onPress={() => handleRitualPress(item.id)} className="mr-3 w-72">
      <View className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
        <ThemedText className="text-gray-900 text-base font-semibold mb-1" numberOfLines={1}>
          {item.title}
        </ThemedText>
        <ThemedText className="text-gray-600 text-sm" numberOfLines={2}>
          {item.shortDescription}
        </ThemedText>
        {item.tags?.length ? (
          <View className="flex-row flex-wrap mt-2">
            {item.tags.slice(0, 2).map(tag => (
              <View key={tag} className="bg-gray-100 rounded-full px-2 py-1 mr-2 mb-2">
                <ThemedText className="text-xs text-gray-600">{tag}</ThemedText>
              </View>
            ))}
          </View>
        ) : null}
      </View>
    </Pressable>
  ), [handleRitualPress]);

  return (
    <View>
      <View className="px-4 pt-4 pb-2">
        <ThemedText className="text-xl font-semibold text-gray-900">Current Rituals</ThemedText>
        <ThemedText className="text-sm text-gray-500">Your active rituals at a glance</ThemedText>
      </View>
      <FlatList
        data={rituals}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 8 }}
        renderItem={renderRitualCard}
      />
    </View>
  );
}