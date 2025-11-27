import { ThemedText } from '@/src/components/themes/themed-text';
import React from 'react';
import { View } from 'react-native';

type Props = {
  message?: string;
};

export function EmptyState({
  message = "Nothing here yet.",
}: Props) {
  return (
    <View className="flex-1 items-center justify-center p-8">
      <ThemedText className="text-gray-500 text-center">
        {message}
      </ThemedText>
    </View>
  );
}
