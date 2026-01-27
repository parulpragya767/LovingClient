import { AppText } from '@/src/components/ui/AppText';
import React from 'react';
import { View } from 'react-native';

export default function RitualsAndAIChatInfoScreen() {
  return (
    <View>
      <AppText variant="title" className="text-center">
        Rituals & AI Companion
      </AppText>
      <AppText className="text-center mt-3">
        Discover daily and weekly rituals designed to strengthen your relationship, and get guidance from an AI chat companion along the way.
      </AppText>
    </View>
  );
}

