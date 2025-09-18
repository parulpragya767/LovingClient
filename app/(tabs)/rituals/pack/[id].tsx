import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemedText } from '@/components/themed-text';
import RitualCard from '@/components/RitualCard';
import { apiService } from '@/src/services/api';
import { Ritual, RitualPack } from '@/src/types/data-model';

export default function RitualPackScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [pack, setPack] = useState<RitualPack | null>(null);
  const [rituals, setRituals] = useState<Ritual[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const [p, allRituals] = await Promise.all([
          apiService.getRitualPackById(String(id)),
          apiService.getRituals(),
        ]);
        if (!mounted) return;
        if (p) {
          setPack(p);
          const inPack = p.ritualIds
            .map(rid => allRituals.find(r => r.id === rid))
            .filter((r): r is Ritual => Boolean(r));
          setRituals(inPack);
        }
      } finally {
        if (mounted) setIsLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [id]);

  const title = pack?.title ?? 'Ritual Pack';

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ThemedText>Loading...</ThemedText>
      </View>
    );
  }

  if (!pack) {
    return (
      <View className="flex-1 justify-center items-center bg-white p-6">
        <ThemedText className="text-gray-600">Pack not found.</ThemedText>
        <Pressable onPress={() => router.back()} className="mt-4 px-4 py-2 rounded-lg bg-gray-100">
          <ThemedText className="text-gray-700">Go Back</ThemedText>
        </Pressable>
      </View>
    );
  }

  const handleRitualPress = (rid: string) => {
    router.push(`/(tabs)/rituals/${rid}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header: Back + Title */}
      <View className="w-full px-4 pt-3 pb-2 border-b border-gray-200 bg-white flex-row items-center">
        <Pressable onPress={() => router.back()} className="p-2 mr-2">
          <MaterialIcons name="arrow-back" size={24} color="#4B5563" />
        </Pressable>
        <ThemedText className="text-base font-semibold text-gray-900">{title}</ThemedText>
      </View>

      <FlatList
        data={rituals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="px-4 py-3">
            <RitualCard ritual={item} onPress={() => handleRitualPress(item.id)} />
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 16 }}
        ListHeaderComponent={
          <View className="px-4 pt-4 pb-2">
            {pack.description ? (
              <ThemedText className="text-gray-600 mb-2">{pack.description}</ThemedText>
            ) : null}
            {pack.tags?.length ? (
              <View className="flex-row flex-wrap">
                {pack.tags.map(tag => (
                  <View key={tag} className="bg-gray-100 rounded-full px-2 py-1 mr-2 mb-2">
                    <ThemedText className="text-xs text-gray-600">{tag}</ThemedText>
                  </View>
                ))}
              </View>
            ) : null}
          </View>
        }
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center py-10">
            <ThemedText className="text-gray-500">No rituals in this pack.</ThemedText>
          </View>
        }
      />
    </SafeAreaView>
  );
}
