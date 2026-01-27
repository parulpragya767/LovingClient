import React from 'react';
import { Image, View } from 'react-native';

import { AppText } from '@/src/components/ui/AppText';
const hero = require('../../../assets/images/favicon.png');

export default function StartingPathScreen() {
  return (
    <View>
      <View className="items-center justify-center mt-2">
        <Image source={hero} resizeMode="contain" className="w-4/5 h-52" />
      </View>

      <View className="flex-1 mt-6">
        <AppText variant="title" className="text-center">
          Choose Your Starting Path
        </AppText>
        <AppText variant="body" color="text-text-secondary" className="text-center mt-3">
          We’ll personalize suggestions based on where you are. You can always adjust this later in settings.
        </AppText>
      </View>

    </View>
  );
}

