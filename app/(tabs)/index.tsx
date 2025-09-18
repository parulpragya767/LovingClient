import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, Pressable, View } from 'react-native';
import { useEffect, useState } from 'react';
import { Ritual, LoveType } from '@/src/types/data-model';
import { userService } from '@/src/services/user';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  const [rituals, setRituals] = useState<Ritual[]>([]);
  const [loveTypes, setLoveTypes] = useState<LoveType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const [r, lt] = await Promise.all([
          userService.getCurrentRituals(),
          userService.getCurrentLoveTypes(),
        ]);
        if (!mounted) return;
        setRituals(r);
        setLoveTypes(lt);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  const handleRitualPress = (id: string) => {
    router.push(`/(tabs)/rituals/${id}`);
  };

  const handleLoveTypePress = (id: string) => {
    // Navigate to Love Lens tab for now
    router.push('/(tabs)/love-lens');
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <ThemedView className="flex-1 bg-background-light dark:bg-background-dark">
        <FlatList
          ListHeaderComponent={
            <View>
              {/* Current Rituals */}
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
                renderItem={({ item }) => (
                  <Pressable onPress={() => handleRitualPress(item.id)} className="mr-3 w-72">
                    <View className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                      <ThemedText className="text-gray-900 text-base font-semibold mb-1" numberOfLines={1}>
                        {item.title}
                      </ThemedText>
                      <ThemedText className="text-gray-600 text-sm" numberOfLines={2}>
                        {item.description}
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
                )}
              />

              {/* Current Love Types */}
              <View className="px-4 pt-4 pb-2">
                <ThemedText className="text-xl font-semibold text-gray-900">Your Love Types</ThemedText>
                <ThemedText className="text-sm text-gray-500">Focus areas for you</ThemedText>
              </View>
              <FlatList
                data={loveTypes}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 8 }}
                renderItem={({ item }) => (
                  <Pressable onPress={() => handleLoveTypePress(item.id)} className="mr-3 w-64">
                    <View className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                      <ThemedText className="text-gray-900 text-base font-semibold mb-1" numberOfLines={1}>
                        {item.name}
                      </ThemedText>
                      <ThemedText className="text-gray-600 text-sm" numberOfLines={2}>
                        {item.description}
                      </ThemedText>
                    </View>
                  </Pressable>
                )}
              />

              {/* Weekly Ritual Pack Suggestion (moved below love types) */}
              <View className="px-4 pt-2">
                <Pressable onPress={() => router.push('/(modals)/rituals-suggestions')} className="w-full">
                  <View className="bg-purple-50 border border-purple-100 rounded-2xl p-4 flex-row items-center">
                    <View className="flex-1 mr-3">
                      <ThemedText className="text-purple-700 font-semibold text-base">Weekly Ritual Pack Suggestion</ThemedText>
                      <ThemedText className="text-purple-600 text-sm mt-0.5">Pick 3–4 rituals to focus on this week</ThemedText>
                    </View>
                    <View className="bg-white rounded-full px-3 py-1 border border-purple-200">
                      <ThemedText className="text-purple-700 text-sm font-medium">Start</ThemedText>
                    </View>
                  </View>
                </Pressable>
              </View>
            </View>
          }
          data={[]}
          renderItem={null as any}
        />
      </ThemedView>
    </SafeAreaView>
  );
}