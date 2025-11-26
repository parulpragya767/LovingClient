import { ThemedText } from '@/src/components/themes/themed-text';
import { CurrentRitual } from '@/src/models/ritualHistory';
import { RitualPack } from '@/src/models/ritualPacks';
import React from 'react';
import { Pressable, View } from 'react-native';
import SwipeableRitualCard from './SwipeableRitualCard';

type Props = {
  pack: RitualPack;
  rituals: CurrentRitual[];
  onRitualPress?: (id: string) => void;
  onPressPack?: (id: string) => void;
  onChanged?: () => void;
};

export default function RitualPackCard({ pack, rituals, onRitualPress, onPressPack, onChanged }: Props) {
  return (
    <View className="mb-4 rounded-2xl border border-gray-200 bg-white overflow-hidden">
      <Pressable onPress={() => onPressPack?.(pack.id)} className="px-4 pt-4 pb-2">
        <ThemedText className="text-base font-semibold text-gray-900">{pack.title}</ThemedText>
        {pack.description ? (
          <ThemedText className="text-sm text-gray-500 mt-1">{pack.description}</ThemedText>
        ) : null}
      </Pressable>

      <View className="px-4 pb-4">
        {rituals.map(packRitual => (
          <View key={packRitual.ritual.id} className="mb-3">
            <SwipeableRitualCard
              ritual={packRitual.ritual}
              ritualHistoryId={packRitual.ritualHistoryId}
              onRitualPress={() => onRitualPress?.(packRitual.ritual.id)}
              onChanged={onChanged}
            />
          </View>
        ))}
      </View>
    </View>
  );
}