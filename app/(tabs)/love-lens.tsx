import LoveTypeCard from '@/components/LoveTypeCard';
import { ThemedText } from '@/components/themed-text';
import { apiService } from '@/src/services/api';
import { LoveType } from '@/src/types/data-model';
import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';

export default function LoveLensScreen() {
  const [loveTypes, setLoveTypes] = useState<LoveType[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await apiService.getLoveTypes();
      setLoveTypes(data);
    }
    fetchData();
  }, []);

  const renderLoveTypeCard = ({ item }: { item: LoveType }) => (
      <LoveTypeCard loveType={item} />
    );

  return (
    <View className="flex-1 bg-gray-100">
          <ThemedText 
            className="text-2xl font-bold py-5 px-5 text-center text-gray-800"
          >
            Love Types
          </ThemedText>
          <View className="flex-1 px-4">
            <FlatList
              data={loveTypes}
              keyExtractor={(item) => item.id}
              renderItem={renderLoveTypeCard}
              showsVerticalScrollIndicator={false}
              className="w-full"
              contentContainerClassName="pb-5"
            />
          </View>
        </View>
  );
}