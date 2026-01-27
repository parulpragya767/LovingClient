import { AppText } from '@/src/components/ui/AppText';
import React from 'react';
import { Image, View } from 'react-native';

const hero = require('../../../assets/images/splash-icon.png');

export default function RitualsAndAIChatInfoScreen() {
  return (
    <View>
      <View className="items-center justify-center mt-2">
        <Image source={hero} resizeMode="contain" className="w-4/5 h-52" />
      </View>

      <View className="flex-1 mt-6">
        <AppText variant="title" className="text-center">
          Rituals & AI Companion
        </AppText>
        <AppText variant="body" color="text-text-secondary" className="text-center mt-3">
          Discover daily and weekly rituals designed to strengthen your relationship, and get guidance from an AI chat companion along the way.
        </AppText>
      </View>

    </View>
  );
}

