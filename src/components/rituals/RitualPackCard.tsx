import { AppText } from '@/src/components/ui/AppText';
import { Card } from '@/src/components/ui/Card';
import { UserRitualInPack } from '@/src/models/ritualHistory';
import { RitualPack } from '@/src/models/ritualPacks';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View } from 'react-native';
import { AnimatedPressable } from '../ui/AnimatedPressable';
import SwipeableRitualCard from './SwipeableRitualCard';

type RitualPackCardProps = {
  ritualPack: RitualPack;
  rituals: UserRitualInPack[];
};

export default function RitualPackCard({ ritualPack, rituals }: RitualPackCardProps) {
  const router = useRouter();
  const [isChildSwiping, setIsChildSwiping] = useState(false);

  const handleRitualPackPress = () => {
    if (isChildSwiping) return;
    router.push(`/rituals/pack/${ritualPack.id}`);
  };

  return (
    <AnimatedPressable onPress={handleRitualPackPress} className="pb-2">
      <Card className="border border-border overflow-hidden">
        <AppText variant="subtitle">{ritualPack.title}</AppText>
        {ritualPack.tagLine ? (
          <AppText variant="small" className="mt-1">{ritualPack.tagLine}</AppText>
        ) : null}

        {rituals.map(ritual => (
          <View key={ritual.userRitual.ritualId} className="mx-1 my-2">
            <SwipeableRitualCard
              userRitual={ritual.userRitual}
              onSwipeStart={() => setIsChildSwiping(true)}
              onSwipeEnd={() => setIsChildSwiping(false)}
            />
          </View>
        ))}
      </Card>
    </AnimatedPressable>
  );
}