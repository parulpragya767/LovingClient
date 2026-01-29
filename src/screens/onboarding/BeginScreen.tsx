import React from 'react';
import { View } from 'react-native';

import { AppText } from '@/src/components/ui/AppText';
import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';

type BeginScreenProps = {
  onStart: (route: string) => void;
};

export default function BeginScreen({ onStart }: BeginScreenProps) {
  return (
    <View className="flex-1 justify-start mt-4">

      {/* Visual Anchor */}
      <View className="items-center mb-6">
        <View className="flex-row items-center justify-center">
          <View className="h-10 w-10 rounded-full bg-brand-primary/20" />
          <View className="h-12 w-12 rounded-full bg-brand-primary/30 -ml-3 items-center justify-center">
            <AppText>♡</AppText>
          </View>
          <View className="h-10 w-10 rounded-full bg-brand-primary/20 -ml-3" />
        </View>
      </View>

      {/* Title */}
      <AppText variant="title" className="text-center">
        Where to begin?
      </AppText>

      {/* Path 1 — Primary */}
      <Card color="bg-surface-sunken" className="mt-8">
        <AppText variant="subtitle" className="text-center">
          Talk it through
        </AppText>

        <AppText className="mt-3 text-center">
          Share what’s happening. The AI companion helps you reflect and suggests rituals when helpful.
        </AppText>

        <Button variant="primary" className="mt-4" onPress={() => onStart('/(tabs)/ai-chat')}>
          Start chatting
        </Button>
      </Card>

      {/* Path 2 — Secondary */}
      <Card color="bg-surface-sunken" className="mt-6">
        <AppText variant="subtitle" className="text-center">
          Explore rituals
        </AppText>

        <AppText className="mt-3 text-center">
          Browse small practices for care, trust, closeness, and repair — whenever you want.
        </AppText>

        <Button variant="ghost" className="mt-4" onPress={() => onStart('/(tabs)/rituals/all-rituals')}>
          Explore
        </Button>
      </Card>
    </View>
  );
}
