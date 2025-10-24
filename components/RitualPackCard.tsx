import { RitualPack } from '@/src/models/ritualPacks';
import React from 'react';
import { Pressable, View } from 'react-native';
import SwipeableRitualCard from './SwipeableRitualCard';
import { ThemedText } from './themed-text';

type Props = {
  pack: RitualPack;
  onRitualPress?: (id: string) => void;
  onPressPack?: (id: string) => void;
  ritualHistoryIdByRitualId?: Map<string, string>;
  onChanged?: () => void;
};

export default function RitualPackCard({ pack, onRitualPress, onPressPack, ritualHistoryIdByRitualId, onChanged }: Props) {
  return (
    <View className="mb-4 rounded-2xl border border-gray-200 bg-white overflow-hidden">
      <Pressable onPress={() => onPressPack?.(pack.id)} className="px-4 pt-4 pb-2">
        <ThemedText className="text-base font-semibold text-gray-900">{pack.title}</ThemedText>
        {pack.description ? (
          <ThemedText className="text-sm text-gray-500 mt-1">{pack.description}</ThemedText>
        ) : null}
      </Pressable>

      <View className="px-4 pb-4">
        {pack.rituals.map(ritual => (
          <View key={ritual.id} className="mb-3">
            <SwipeableRitualCard
              ritual={ritual}
              ritualHistoryId={ritualHistoryIdByRitualId?.get(ritual.id)}
              onRitualPress={() => onRitualPress?.(ritual.id)}
              onChanged={onChanged}
            />
          </View>
        ))}
      </View>
    </View>
  );
}