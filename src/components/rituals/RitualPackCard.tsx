import { AppText } from '@/src/components/ui/AppText';
import { Card } from '@/src/components/ui/Card';
import { UserRitualInPack } from '@/src/models/ritualHistory';
import { RitualPack } from '@/src/models/ritualPacks';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, View } from 'react-native';
import SwipeableRitualCard from './SwipeableRitualCard';

type RitualPackCardProps = {
  ritualPack: RitualPack;
  rituals: UserRitualInPack[];
};

export default function RitualPackCard({ ritualPack, rituals }: RitualPackCardProps) {
  const router = useRouter();

  const handleRitualPackPress = () => {
    router.push(`/rituals/pack/${ritualPack.id}`);
  };

  return (
    <Card className="border border-border overflow-hidden">
      <Pressable onPress={handleRitualPackPress} className="pb-2">
        <AppText variant="subtitle">{ritualPack.title}</AppText>
        {ritualPack.tagLine ? (
          <AppText variant="small" className="mt-1">{ritualPack.tagLine}</AppText>
        ) : null}
      </Pressable>

      {rituals.map(ritual => (
        <View key={ritual.userRitual.ritualId} className="mx-1 my-2">
          <SwipeableRitualCard
            userRitual={ritual.userRitual}
          />
        </View>
      ))}
    </Card>
  );
}