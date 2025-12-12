import AICompanionCard from '@/src/components/home/AICompanionCard';
import CurrentRitualsHome from '@/src/components/home/CurrentRitualsHome';
import LoveTypesHome from '@/src/components/home/LoveTypesHome';
import ErrorState from '@/src/components/states/ErrorState';
import LoadingState from '@/src/components/states/LoadingState';
import { Screen } from '@/src/components/ui/Screen';
import { useLoveTypes } from '@/src/hooks/love-lens/useLoveTypes';
import { useCurrentRituals } from '@/src/hooks/rituals/useCurrentRituals';
import { Ritual } from '@/src/models/rituals';
import { ScrollView, View } from 'react-native';
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
          <CurrentRitualsHome rituals={mergedRituals} />
          <LoveTypesHome loveTypes={loveTypes} />
          <View className="mt-4">
            <AICompanionCard />
          </View>
        </ScrollView>
      </Screen>
    </SafeAreaView>
  );
}