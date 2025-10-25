import { ThemedText } from '@/components/themed-text';
import { LoveLensInfo } from '@/src/models/loveLens';
import { useRouter } from 'expo-router';
import { FlatList, Pressable, View } from 'react-native';

interface LoveTypesHomeProps {
  loveTypes: LoveLensInfo[];
}

export default function LoveTypesHome({ loveTypes }: LoveTypesHomeProps) {
  const router = useRouter();
  const handlePress = (id: number | undefined) => {
    if (id === undefined) return;
    router.push(`/love-lens/${id}`);
  };

  const renderLoveTypeCard = ({ item }: { item: LoveLensInfo }) => (
    <Pressable onPress={() => handlePress(item.id)} className="mr-3 w-64">
      <View className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
        <ThemedText className="text-gray-900 text-base font-semibold mb-1" numberOfLines={1}>
          {item.title}
        </ThemedText>
        <ThemedText className="text-gray-600 text-sm" numberOfLines={2}>
          {item.description}
        </ThemedText>
      </View>
    </Pressable>
    );
    
  return (
    <View>
      <View className="px-4 pt-4 pb-2">
        <ThemedText className="text-xl font-semibold text-gray-900">Your Love Types</ThemedText>
        <ThemedText className="text-sm text-gray-500">Focus areas for you</ThemedText>
      </View>
      <FlatList
        data={loveTypes}
        keyExtractor={(item) => item.id?.toString() || ''}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 8 }}
        renderItem={renderLoveTypeCard}
      />
    </View>
  );
}
