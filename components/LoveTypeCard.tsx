import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { LoveType } from '@/src/types/data-model';
import React from 'react';

interface LoveTypeCardProps {
  loveType: LoveType;
}

export default function LoveTypeCard({ loveType }: LoveTypeCardProps) {
  return (
    <ThemedView
      className="bg-white rounded-xl p-4 mx-4 my-2 border border-gray-200 shadow-md"
    >
      <ThemedText
        className="text-gray-800 mb-2"
      >
        {loveType.name}
      </ThemedText>
      <ThemedText
        className="text-gray-600 mb-3"
      >
        {loveType.description}
      </ThemedText>
    </ThemedView>
  );
}