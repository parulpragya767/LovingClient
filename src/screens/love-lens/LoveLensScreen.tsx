import LoveTypeCard from '@/src/components/love-lens/LoveTypeCard';
import { EmptyState } from '@/src/components/states/EmptyState';
import ErrorState from '@/src/components/states/ErrorState';
import LoadingState from '@/src/components/states/LoadingState';
import { AppText } from '@/src/components/ui/AppText';
import { Screen } from '@/src/components/ui/Screen';
import { useLoveTypes } from '@/src/hooks/love-lens/useLoveTypes';
import { FlatList, View } from 'react-native';

export default function LoveLensScreen() {
  const { data: loveTypes = [], isLoading, error, refetch } = useLoveTypes();

  if (isLoading) return <LoadingState text="Loading love types..." />;
  if (error) return <ErrorState message="Failed to load love types." onButtonPress={() => refetch()} />;

  return (
    <Screen>
      <AppText variant="small" className="mb-6 mt-2 text-text-muted">
        A way to see the different forms love takes — and which ones want care right now.
      </AppText>

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
  );
}
