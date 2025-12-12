import AICompanionCard from '@/src/components/home/AICompanionCard';
import LoveTypeCard from '@/src/components/love-lens/LoveTypeCard';
import RitualCard from '@/src/components/rituals/RitualCard';
import ErrorState from '@/src/components/states/ErrorState';
import LoadingState from '@/src/components/states/LoadingState';
import { AppText } from '@/src/components/ui/AppText';
import { Screen } from '@/src/components/ui/Screen';
import { useLoveTypes } from '@/src/hooks/love-lens/useLoveTypes';
import { useCurrentRituals } from '@/src/hooks/rituals/useCurrentRituals';
import { Ritual } from '@/src/models/rituals';
import { FlatList, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { data: currentData, isLoading, error, refetch } = useCurrentRituals();
  const { data: allLoveTypes = [] } = useLoveTypes();
  const loveTypes = allLoveTypes.slice(0, 3);

  // Merge rituals from currentData.rituals and all rituals from ritualPacks
  const mergedRituals = (() => {
    if (!currentData) return [];
    
    const ritualMap = new Map<string, Ritual>();
    
    // Add rituals from currentData.rituals
    currentData.rituals?.forEach(ritual => {
      ritualMap.set(ritual.ritualId, ritual.ritual);
    });
    
    // Add rituals from each ritual pack
    currentData.ritualPacks?.forEach(pack => {
      pack.rituals?.forEach(ritual => {
        ritualMap.set(ritual.ritualId, ritual.ritual);
      });
    });
    
    return Array.from(ritualMap.values());
  })();

  if (isLoading) return <LoadingState text="Loading love types..." />;
  if (error) return <ErrorState message="Failed to load love types." onButtonPress={() => refetch()} />;

  return (
    <SafeAreaView className="flex-1" edges={["left", "right"]}>
      <Screen>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Current Rituals */}
          <AppText variant="subtitle" className="mt-2">Current Rituals</AppText>
          <AppText variant="small" className="mb-4">Your active rituals at a glance</AppText>
          <FlatList
            data={mergedRituals}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View className="mr-3 w-72">
                <RitualCard ritual={item} isCompact />
              </View>
            )}
          />

          {/* Love Types */}
          <AppText variant="subtitle" className="mt-6">Your Love Types</AppText>
          <AppText variant="small" className="mb-4">Focus areas for you</AppText>
          <FlatList
            data={loveTypes}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View className="mr-3 w-64">
                <LoveTypeCard loveTypeDetail={item} isCompact />
              </View>
            )}
          />
                  
          <View className="mt-6">
            <AICompanionCard />
          </View>
        </ScrollView>
      </Screen>
    </SafeAreaView>
  );
}