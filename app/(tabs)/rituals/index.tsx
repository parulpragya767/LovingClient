import { useRouter } from 'expo-router';
import { FlatList, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import RitualCard from '@/components/RitualCard';
import { apiService } from '@/src/services/api';
import { useEffect, useState } from 'react';
import { Ritual } from '@/src/types/data-model';

export default function RitualsScreen() {
  const [rituals, setRituals] = useState<Ritual[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const data = await apiService.getRituals();
      setRituals(data);
    }
    fetchData();
  }, []);

  const handleRitualPress = (id: string) => {
    router.push({
      pathname: '/(tabs)/rituals/[id]',
      params: { id }
    });
  };

  const renderRitualCard = ({ item }: { item: Ritual }) => (
    <RitualCard 
      ritual={item} 
      onPress={handleRitualPress}
    />
  );

  return (
    <View className="flex-1 bg-gray-100">
      <ThemedText 
        className="text-2xl font-bold py-5 px-5 text-center text-gray-800"
      >
        Relationship Rituals
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
