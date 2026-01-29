import RitualPackCard from '@/src/components/rituals/RitualPackCard';
import SwipeableRitualCard from '@/src/components/rituals/SwipeableRitualCard';
import { EmptyState } from '@/src/components/states/EmptyState';
import ErrorState from '@/src/components/states/ErrorState';
import LoadingState from '@/src/components/states/LoadingState';
import { AppText } from '@/src/components/ui/AppText';
import { Screen } from '@/src/components/ui/Screen';
import { useCurrentRituals } from '@/src/hooks/rituals/useCurrentRituals';
import { CurrentRitual, CurrentRitualPack } from '@/src/models/ritualHistory';
import { useMemo } from 'react';
import { SectionList, View } from 'react-native';

export default function CurrentRitualsScreen() {
  const { data: currentData, isLoading, refetch, error } = useCurrentRituals();

  const currentRituals: CurrentRitual[] = useMemo(() => currentData?.individualRituals ?? [], [currentData]);
  const currentRitualPacks: CurrentRitualPack[] = useMemo(() => currentData?.ritualPacks ?? [], [currentData]);

  const sections = useMemo(() => {
    const s: Array<{ key: 'packs' | 'rituals'; data: any[] }> = [];
    if (currentRitualPacks.length > 0) s.push({ key: 'packs', data: currentRitualPacks });
    if (currentRituals.length > 0) s.push({ key: 'rituals', data: currentRituals });
    return s;
  }, [currentRitualPacks, currentRituals]);

  if (isLoading) return <LoadingState text="Loading your active rituals..." />;
  if (error) return <ErrorState message="Failed to load your active rituals." onButtonPress={() => refetch()} />;

  if (!currentData || currentData.individualRituals.length === 0 && currentData.ritualPacks.length === 0) {
    return <EmptyState message="You do not have any active rituals. Feel free to browse and add some rituals." />;
  }

  return (
    <Screen>
      <SectionList
        sections={sections}
        keyExtractor={(item: any, index: number) =>
          'ritualPackId' in item
            ? `pack-${item.ritualPackId}`
            : `ritual-${item.ritualId}`
        }
        renderItem={({ item, section }: any) => (
          <View className="mb-4"> 
            {section.key === 'packs' ? (
              <RitualPackCard 
                ritualPack={item.ritualPack} 
                rituals={item.rituals} 
              />
            ) : (
              <SwipeableRitualCard 
                ritual={item.ritual} 
                ritualHistoryId={item.ritualHistoryId} 
              />
            )}
          </View>
        )}
        ListHeaderComponent={
          <View className="pb-6">
            <AppText variant="title">Your Active Rituals</AppText>
            <AppText variant="small">Keep track of your daily practices</AppText>
          </View>
        }
        ListFooterComponent={<View className="h-20" />}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={false}
      />
    </Screen>
  );
}