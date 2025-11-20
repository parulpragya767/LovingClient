import { ThemedText } from '@/components/themes/themed-text';
import { ThemedView } from '@/components/themes/themed-view';
import { useLoveTypes } from '@/src/hooks/love-lens/useLoveTypes';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, RefreshControl, View } from 'react-native';

export default function LoveLensScreen() {
  const router = useRouter();
  const { data: loveTypes = [], isLoading, error, refetch } = useLoveTypes();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      await refetch();
    } finally {
      setIsRefreshing(false);
    }
  };

  if (isLoading && !isRefreshing) {
    return (
      <ThemedView className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
        <ThemedText className="mt-4">Loading love types...</ThemedText>
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView className="flex-1 items-center justify-center p-4">
        <ThemedText className="text-red-500 text-center mb-4">
          Failed to load love types. {error.message}
        </ThemedText>
        <Pressable
          onPress={() => refetch()}
          className="bg-blue-500 px-4 py-2 rounded-lg"
        >
          <ThemedText className="text-white">Retry</ThemedText>
        </Pressable>
      </ThemedView>
    );
  }

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
        keyExtractor={(item) => item.id?.toString() || ''}
        renderItem={({ item }) => (
          <Pressable 
            onPress={() => router.push({
              pathname: "/love-lens/[id]",
              params: { id: item.id }
            })}
            className="bg-white rounded-xl p-4 mb-3 shadow-sm"
          >
            <View className="flex-row items-center">
              <View className="p-2 rounded-lg bg-blue-50 mr-3">
                <ThemedText className="text-blue-600 text-lg font-bold">
                  {item.loveType || '❤️'}
                </ThemedText>
              </View>
              <View className="flex-1">
                <ThemedText className="text-lg font-semibold text-gray-900">
                  {item.title || 'Love Type'}
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
        refreshControl={
          <RefreshControl 
            refreshing={isRefreshing} 
            onRefresh={handleRefresh}
            colors={['#3b82f6']}
            tintColor="#3b82f6"
          />
        }
        ListFooterComponent={<View className="h-20" />}
        ListEmptyComponent={
          <ThemedView className="items-center justify-center p-8">
            <ThemedText className="text-gray-500 text-center">
              No love types found. Pull to refresh.
            </ThemedText>
          </ThemedView>
        }
      />
    </ThemedView>
  );
}
