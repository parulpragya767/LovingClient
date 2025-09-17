import RitualCard from '@/components/RitualCard';
import { ThemedText } from '@/components/themed-text';
import { apiService } from '@/src/services/api';
import { Ritual } from '@/src/types/data-model';
import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';

export default function RitualsScreen() {
  const [rituals, setRituals] = useState<Ritual[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await apiService.getRituals();
      setRituals(data);
    }
    fetchData();
  }, []);

  const renderRitualCard = ({ item }: { item: Ritual }) => (
    <RitualCard ritual={item} />
  );

  return (
    <View className="flex-1 bg-gray-100">
      <ThemedText 
        className="text-2xl font-bold py-5 px-5 text-center text-gray-800"
      >
        Daily Rituals
      </ThemedText>
      <View className="flex-1 px-4">
        <FlatList
          data={rituals}
          keyExtractor={(item) => item.id}
          renderItem={renderRitualCard}
          showsVerticalScrollIndicator={false}
          className="w-full"
          contentContainerClassName="pb-5"
        />
      </View>
    </View>
  );
}