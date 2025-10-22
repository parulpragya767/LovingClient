import AICompanionCard from '@/components/home/AICompanionCard';
import CurrentRitualsHome from '@/components/home/CurrentRitualsHome';
import LoveTypesHome from '@/components/home/LoveTypesHome';
import WeeklySuggestionCard from '@/components/home/WeeklySuggestionCard';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useUserService } from '@/src/services/user';
import { LoveType } from '@/src/types/data-model';
import { Ritual } from '@/src/models/ritual';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [rituals, setRituals] = useState<Ritual[]>([]);
  const [loading, setLoading] = useState(true);
  const { getCurrentRituals, getCurrentLoveTypes, isLoadingLoveTypes } = useUserService();
  const [loveTypes, setLoveTypes] = useState<LoveType[]>([]);

  const loadData = useCallback(async () => {
    try {
      const [ritualsData, loveTypesData] = await Promise.all([
        getCurrentRituals(),
        getCurrentLoveTypes(),
      ]);
      setRituals(ritualsData);
      setLoveTypes(loveTypesData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  }, [getCurrentRituals, getCurrentLoveTypes]);

  useEffect(() => {
    loadData();
  }, [loadData]);

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
          <CurrentRitualsHome rituals={rituals} />
          <LoveTypesHome loveTypes={loveTypes} />
          <AICompanionCard />
          <WeeklySuggestionCard />
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
}