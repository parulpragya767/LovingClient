import AICompanionCard from '@/src/components/home/AICompanionCard';
import ExploreCard from '@/src/components/home/ExploreCard';
import RitualCard from '@/src/components/rituals/RitualCard';
import { AppText } from '@/src/components/ui/AppText';
import { Screen } from '@/src/components/ui/Screen';
import { useCurrentRituals } from '@/src/hooks/rituals/useCurrentRituals';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, ScrollView, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const { getMergedCurrentRituals } = useCurrentRituals();
  const currentRituals = getMergedCurrentRituals();
  const hasRituals = currentRituals.length > 0;

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Orientation */}
        <View className="mt-4 mb-2">
          <AppText variant="title">Begin in your own way</AppText>
          <AppText variant="small" className="mt-1">
            Talk it through, try a small ritual, or explore.
          </AppText>
        </View>

        {/* AI Companion Card*/}
        <View className="mt-4">
          <AICompanionCard />
        </View>

        {/* Current Rituals (conditional) */}
        {hasRituals && (
          <View className="mt-6">
            <AppText variant="subtitle">Current rituals</AppText>
            <AppText variant="small" className="mb-4">
              Your active rituals at a glance
            </AppText>

            <FlatList
              data={currentRituals}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <View className="mr-3 w-72">
                  <RitualCard ritual={item} isCompact />
                </View>
              )}
            />
          </View>
        )}

        {/* Explore */}
        <View className="mt-6">
          <AppText variant="subtitle" className="mb-4">
            Explore
          </AppText>

          <View className="flex-row gap-3">
            <ExploreCard
              title="Love types"
              description="Different ways love shows up and evolves"
              onPress={() => router.push('/(tabs)/love-lens')}
            />
            <ExploreCard
              title="Rituals"
              description="Small practices for connection and care"
              onPress={() => router.push('/(tabs)/rituals/all-rituals')}
            />
          </View>
        </View>

        {/* Bottom breathing room */}
        <View className="h-12" />
        
      </ScrollView>
    </Screen>
  );
}