import React from 'react';
import { View } from 'react-native';

import { AppText } from '@/src/components/ui/AppText';

export default function StartingPathScreen() {
  return (
    <View>
      <AppText variant="title" className="text-center">
        Choose Your Starting Path
      </AppText>
      <AppText className="text-center mt-3">
        We’ll personalize suggestions based on where you are. You can always adjust this later in settings.
      </AppText>
    </View>
  );
}

