import AICompanionCard from '@/components/home/AICompanionCard';
import CurrentRitualsHome from '@/components/home/CurrentRitualsHome';
import LoveTypesHome from '@/components/home/LoveTypesHome';
import WeeklySuggestionCard from '@/components/home/WeeklySuggestionCard';
import { ThemedText } from '@/components/themes/themed-text';
import { ThemedView } from '@/components/themes/themed-view';
import { useLoveTypes } from '@/src/hooks/love-lens/useLoveTypes';
import { useCurrentRituals } from '@/src/hooks/rituals/useCurrentRituals';
import { Ritual } from '@/src/models/rituals';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { data: currentData, isLoading, error } = useCurrentRituals();
  const { data: allLoveTypes = [] } = useLoveTypes();
  const loveTypes = allLoveTypes.slice(0, 3);

  // Merge rituals from currentData.rituals and all rituals from ritualPacks
  const mergedRituals = (() => {
    if (!currentData) return [];
    
    const ritualMap = new Map<string, Ritual>();
    
    // Add rituals from currentData.rituals
    currentData.rituals?.forEach(ritual => {
      ritualMap.set(ritual.id, ritual);
    });
    
    // Add rituals from each ritual pack
    currentData.ritualPacks?.forEach(pack => {
      pack.rituals?.forEach(ritual => {
        ritualMap.set(ritual.id, ritual);
      });
    });
    
    return Array.from(ritualMap.values());
  })();

  const loading = isLoading || (!currentData && !error);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
        <View className="h-3" />
        <ThemedText className="text-gray-500">Loading your home...</ThemedText>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1" edges={['top']}>
      <ThemedView className="flex-1 bg-white">
        <ScrollView>
          <CurrentRitualsHome rituals={mergedRituals} />
          <LoveTypesHome loveTypes={loveTypes} />
          <AICompanionCard />
          <WeeklySuggestionCard />
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
}