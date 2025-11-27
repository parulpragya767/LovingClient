import { ThemedText } from '@/src/components/themes/themed-text';
import { CurrentRitual } from '@/src/models/ritualHistory';
import { RitualPack } from '@/src/models/ritualPacks';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, View } from 'react-native';
import SwipeableRitualCard from './SwipeableRitualCard';

type Props = {
  ritualPack: RitualPack;
  rituals: CurrentRitual[];
};

export default function RitualPackCard({ ritualPack, rituals }: Props) {
  const router = useRouter();

  const handleRitualPackPress = () => {
    router.push(`/rituals/pack/${ritualPack.id}`);
  };

  return (
    <View className="mb-4 rounded-2xl border border-gray-200 bg-white overflow-hidden">
      <Pressable onPress={handleRitualPackPress} className="px-4 pt-4 pb-2">
        <ThemedText className="text-base font-semibold text-gray-900">{ritualPack.title}</ThemedText>
        {ritualPack.description ? (
          <ThemedText className="text-sm text-gray-500 mt-1">{ritualPack.description}</ThemedText>
        ) : null}
      </Pressable>

      <View className="px-4 pb-4">
        {rituals.map(ritual => (
          <View key={ritual.ritual.id} className="mb-3">
            <SwipeableRitualCard
              ritual={ritual.ritual}
              ritualHistoryId={ritual.ritualHistoryId}
            />
          </View>
        ))}
      </View>
    </View>
  );
}