import { AppText } from '@/src/components/ui/AppText';
import React from 'react';
import { View } from 'react-native';

type Props = {
  message?: string;
};

export function EmptyState({
  message = "Nothing here yet.",
}: Props) {
  return (
    <View className="flex-1 items-center justify-center bg-surface-screen p-8">
      <AppText className="text-center">
        {message}
      </AppText>
    </View>
  );
}
