import React from 'react';
import { View, Pressable } from 'react-native';
import { ThemedText } from './themed-text';
import RitualCard from './RitualCard';
import { Ritual, RitualPack } from '@/src/types/data-model';

type Props = {
  pack: RitualPack;
  ritualsById: Record<string, Ritual>;
  onRitualPress: (id: string) => void;
  onPressPack?: (id: string) => void;
};

export default function RitualPackCard({ pack, ritualsById, onRitualPress, onPressPack }: Props) {
  const rituals = pack.ritualIds
    .map(id => ritualsById[id])
    .filter((r): r is Ritual => Boolean(r));

  return (
    <View className="mb-4 rounded-2xl border border-gray-200 bg-white overflow-hidden">
      <Pressable onPress={() => onPressPack?.(pack.id)} className="px-4 pt-4 pb-2">
        <ThemedText className="text-base font-semibold text-gray-900">{pack.title}</ThemedText>
        {pack.description ? (
          <ThemedText className="text-sm text-gray-500 mt-1">{pack.description}</ThemedText>
        ) : null}
        {pack.tags?.length ? (
          <View className="flex-row flex-wrap mt-2">
            {pack.tags.map(tag => (
              <View key={tag} className="bg-gray-100 rounded-full px-2 py-1 mr-2 mb-2">
                <ThemedText className="text-xs text-gray-600">{tag}</ThemedText>
              </View>
            ))}
          </View>
        ) : null}
      </Pressable>

      <View className="px-4 pb-4">
        {rituals.map(r => (
          <View key={r.id} className="mb-3">
            <RitualCard ritual={r} onPress={() => onRitualPress(r.id)} />
          </View>
        ))}
      </View>
    </View>
  );
}
