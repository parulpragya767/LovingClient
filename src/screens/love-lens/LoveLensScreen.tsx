import LoveTypeCard from '@/src/components/love-lens/LoveTypeCard';
import { EmptyState } from '@/src/components/states/EmptyState';
import ErrorState from '@/src/components/states/ErrorState';
import LoadingState from '@/src/components/states/LoadingState';
import { AppText } from '@/src/components/ui/AppText';
import { Screen } from '@/src/components/ui/Screen';
import { useLoveTypes } from '@/src/hooks/love-lens/useLoveTypes';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoveLensScreen() {
  const { data: loveTypes = [], isLoading, error, refetch } = useLoveTypes();

  if (isLoading) return <LoadingState text="Loading love types..." />;
  if (error) return <ErrorState message="Failed to load love types." onButtonPress={() => refetch()} />;

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
      <Screen>
        <View className="mb-6">
          <AppText variant="title" className="mb-2">Love Lens</AppText>
          <AppText variant="body">
            Discover your love language and improve your relationship
          </AppText>
        </View>

        <FlatList
          data={loveTypes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View className="mb-4">
              <LoveTypeCard loveTypeDetail={item} />
            </View>
          )}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View className="h-20" />}
          ListEmptyComponent={<EmptyState message="No love types found." />}
        />
      </Screen>
    </SafeAreaView>
  );
}
