import { AppText } from '@/src/components/ui/AppText';
import React from 'react';
import { View } from 'react-native';

export default function WelcomeScreen() {
  return (
    <View>
      <AppText variant="title" className="text-center">
        Welcome to Loving
      </AppText>
      <AppText className="text-center mt-3">
        Build deeper connections with guided rituals and an AI companion. Let’s set things up in a few quick steps.
      </AppText>
    </View>
  );
}
