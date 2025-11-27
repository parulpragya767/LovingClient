import RitualPackCard from '@/src/components/rituals/RitualPackCard';
import SwipeableRitualCard from '@/src/components/rituals/SwipeableRitualCard';
import { EmptyState } from '@/src/components/states/EmptyState';
import ErrorState from '@/src/components/states/ErrorState';
import LoadingState from '@/src/components/states/LoadingState';
import { ThemedText } from '@/src/components/themes/themed-text';
import { useCurrentRituals } from '@/src/hooks/rituals/useCurrentRituals';
import { CurrentRitual, CurrentRitualPack } from '@/src/models/ritualHistory';
import { useMemo } from 'react';
import { SectionList, View } from 'react-native';

export default function CurrentRitualsScreen() {
  const { data: currentData, isLoading, refetch, error } = useCurrentRituals();

  if (isLoading) return <LoadingState text="Loading your active rituals..." />;
  if (error) return <ErrorState message="Failed to load your active rituals." onButtonPress={() => refetch()} />;

  const currentRituals: CurrentRitual[] = useMemo(() => currentData?.rituals ?? [], [currentData]);
  const currentRitualPacks: CurrentRitualPack[] = useMemo(() => currentData?.ritualPacks ?? [], [currentData]);

  if (!currentData || currentData.rituals.length === 0 && currentData.ritualPacks.length === 0) {
    return <EmptyState message="You do not have any active rituals. Feel free to browse and add some rituals." />;
  }
  
  const sections = useMemo(() => {
    const s: Array<{ key: 'packs' | 'rituals'; data: any[] }> = [];
    if (currentRitualPacks.length > 0) s.push({ key: 'packs', data: currentRitualPacks });
    if (currentRituals.length > 0) s.push({ key: 'rituals', data: currentRituals });
    return s;
  }, [currentRitualPacks, currentRituals]);

  return (
    <View className="flex-1 bg-white px-4">
      <SectionList
        sections={sections}
        keyExtractor={(item: any, index: number) =>
          'ritualPackId' in item
            ? `pack-${item.ritualPackId}`
            : `ritual-${item.ritualId}`
        }
        renderItem={({ item, section }: any) =>
          section.key === 'packs' ? (
            <RitualPackCard 
              ritualPack={item.ritualPack} 
              rituals={item.rituals} 
            />
          ) : (
            <SwipeableRitualCard 
              ritual={item.ritual} 
              ritualHistoryId={item.ritualHistoryId} 
            />
          )
        }
        ListHeaderComponent={
          <View className="py-4">
            <ThemedText className="text-2xl font-bold mb-1 text-gray-900">Your Active Rituals</ThemedText>
            <ThemedText className="text-sm text-gray-500">Keep track of your daily practices</ThemedText>
          </View>
        }
        ListFooterComponent={<View className="h-20" />}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={false}
      />
    </View>
  );
}