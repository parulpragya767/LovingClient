import { AppText } from '@/src/components/ui/AppText';
import React from 'react';
import { Image, View } from 'react-native';

const hero = require('../../../assets/images/icon.png');

export default function WelcomeScreen() {
  return (
    <View>
      <View className="items-center justify-center mt-2">
        <Image source={hero} resizeMode="contain" className="w-4/5 h-52" />
      </View>

      <View className="flex-1 mt-6">
        <AppText variant="title" className="text-center">
          Welcome to Loving
        </AppText>
        <AppText variant="body" color="text-text-secondary" className="text-center mt-3">
          Build deeper connections with guided rituals and an AI companion. Let’s set things up in a few quick steps.
        </AppText>
      </View>
    </View>
  );
}
