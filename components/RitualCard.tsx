import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Ritual } from '@/src/types/data-model';
import React from 'react';
import { View } from 'react-native';

interface RitualCardProps {
  ritual: Ritual;
}

export default function RitualCard({ ritual }: RitualCardProps) {
  return (
    <ThemedView 
      className="bg-white rounded-xl p-4 mx-4 my-2 border border-gray-200 shadow-md"
    >
      <ThemedText 
        className="text-gray-800 mb-2"
      >
        {ritual.title}
      </ThemedText>
      <ThemedText 
        className="text-gray-600 mb-3"
      >
        {ritual.description}
      </ThemedText>
      {ritual.tags.length > 0 && (
        <View className="flex-row flex-wrap gap-2">
          {ritual.tags.map((tag) => (
            <View 
              key={tag} 
              className="bg-blue-50 rounded-full px-3 py-1.5 border border-blue-100"
            >
              <ThemedText className="text-xs text-blue-700 font-medium">
                #{tag}
              </ThemedText>
            </View>
          ))}
        </View>
      )}
    </ThemedView>
  );
}