import LoveTypeCard from '@/src/components/love-lens/LoveTypeCard';
import { EmptyState } from '@/src/components/states/EmptyState';
import ErrorState from '@/src/components/states/ErrorState';
import LoadingState from '@/src/components/states/LoadingState';
import { ThemedText } from '@/src/components/themes/themed-text';
import { ThemedView } from '@/src/components/themes/themed-view';
import { useLoveTypes } from '@/src/hooks/love-lens/useLoveTypes';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoveLensScreen() {
  const { data: loveTypes = [], isLoading, error, refetch } = useLoveTypes();

  if (isLoading) return <LoadingState text="Loading love types..." />;
  if (error) return <ErrorState message="Failed to load love types." onButtonPress={() => refetch()} />;

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
      <ThemedView className="flex-1 p-4">
        <View className="mb-6">
          <ThemedText className="text-2xl font-bold mb-2">Love Lens</ThemedText>
          <ThemedText className="text-gray-800">
            Discover your love language and improve your relationship
          </ThemedText>
        </View>

        <FlatList
          data={loveTypes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <LoveTypeCard loveType={item} />
          )}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View className="h-20" />}
          ListEmptyComponent={<EmptyState message="No love types found." />}
        />
      </ThemedView>
    </SafeAreaView>
  );
}
