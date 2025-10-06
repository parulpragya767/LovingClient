import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { loveTypesData as loveTypes } from '@/src/data/loveTypes';
import { useRouter } from 'expo-router';
import { FlatList, Pressable, View } from 'react-native';

export default function LoveLensScreen() {
  const router = useRouter();

  return (
    <ThemedView className="flex-1 p-4">
      <View className="mb-6">
        <ThemedText className="text-2xl font-bold mb-2">Love Lens</ThemedText>
        <ThemedText className="text-gray-600">
          Discover your love language and improve your relationship
        </ThemedText>
      </View>

      <FlatList
        data={loveTypes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable 
            onPress={() => router.push(`/love-lens/${item.id}`)}
            className="bg-white rounded-xl p-4 mb-3 shadow-sm"
          >
            <View className="flex-row items-center">
              <View className="p-2 rounded-lg bg-blue-50 mr-3">
                <ThemedText className="text-blue-600 text-lg font-bold">
                  {item.emoji}
                </ThemedText>
              </View>
              <View className="flex-1">
                <ThemedText className="text-lg font-semibold text-gray-900">
                  {item.name}
                </ThemedText>
                <ThemedText className="text-gray-500 text-sm" numberOfLines={2}>
                  {item.description}
                </ThemedText>
              </View>
              <ThemedText className="text-gray-400">
                →
              </ThemedText>
            </View>
          </Pressable>
        )}
        ListFooterComponent={<View className="h-20" />}
      />
    </ThemedView>
  );
}
