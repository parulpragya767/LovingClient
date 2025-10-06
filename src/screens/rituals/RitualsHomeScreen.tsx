import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';

export default function RitualsHomeScreen() {
  const router = useRouter();

  const ritualCategories = [
    {
      id: 'all',
      title: 'All Rituals',
      description: 'Browse all relationship rituals',
      icon: '🌱',
      route: '/rituals/all-rituals',
    },
    {
      id: 'current',
      title: 'Current Rituals',
      description: 'Your active rituals',
      icon: '🔥',
      route: '/rituals/current',
    },
    {
      id: 'packs',
      title: 'Ritual Packs',
      description: 'Curated collections of rituals',
      icon: '🎁',
      route: '/rituals/packs',
    },
    {
      id: 'history',
      title: 'History',
      description: 'Your completed rituals',
      icon: '📜',
      route: '/rituals/history',
    },
  ];

  return (
    <ThemedView className="flex-1">
      <ScrollView className="flex-1">
        <View className="p-4">
          <ThemedText className="text-2xl font-bold mb-2">Rituals</ThemedText>
          <ThemedText className="text-gray-600 mb-6">
            Strengthen your relationship with meaningful rituals
          </ThemedText>

          <View className="space-y-4">
            {ritualCategories.map((category) => (
              <Pressable
                key={category.id}
                onPress={() => router.push(category.route)}
                className="flex-row items-center bg-white p-4 rounded-xl shadow-sm"
              >
                <View className="bg-blue-50 p-3 rounded-lg mr-4">
                  <ThemedText className="text-2xl">{category.icon}</ThemedText>
                </View>
                <View className="flex-1">
                  <ThemedText className="text-lg font-semibold text-gray-900">
                    {category.title}
                  </ThemedText>
                  <ThemedText className="text-gray-500 text-sm">
                    {category.description}
                  </ThemedText>
                </View>
                <ThemedText className="text-gray-400 text-lg">›</ThemedText>
              </Pressable>
            ))}
          </View>

          <Pressable
            onPress={() => router.push('/rituals/search')}
            className="mt-6 bg-white p-4 rounded-xl shadow-sm flex-row items-center justify-between"
          >
            <View className="flex-row items-center">
              <View className="bg-blue-50 p-2 rounded-lg mr-4">
                <ThemedText className="text-blue-600 text-xl">🔍</ThemedText>
              </View>
              <ThemedText className="text-gray-900 font-medium">
                Search Rituals
              </ThemedText>
            </View>
            <ThemedText className="text-gray-400 text-lg">›</ThemedText>
          </Pressable>
        </View>
      </ScrollView>
    </ThemedView>
  );
}
