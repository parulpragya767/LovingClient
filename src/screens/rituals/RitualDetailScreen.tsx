import { ThemedText } from '@/components/themes/themed-text';
import { ThemedView } from '@/components/themes/themed-view';
import { useRitual } from '@/src/hooks/rituals/useRitual';
import { useRitualTags } from '@/src/hooks/rituals/useRitualTags';
import { useLocalSearchParams } from 'expo-router';
import { ChevronDown, ChevronUp } from 'lucide-react-native';
import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, TouchableOpacity, View } from 'react-native';
import Markdown from 'react-native-markdown-display';

export default function RitualDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [isHowItHelpsExpanded, setIsHowItHelpsExpanded] = useState(true);
  const { data: ritual, isLoading, error } = useRitual(id);
  const { getTagDisplayName } = useRitualTags();
  
  if (isLoading) {
    return (
      <ThemedView className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }
  
  if (error || !ritual) {
    return (
      <ThemedView className="flex-1 items-center justify-center p-4">
        <ThemedText className="text-center">
          {error?.message || 'Failed to load ritual details'}
        </ThemedText>
      </ThemedView>
    );
  }

  const timeTakenDisplayName = ritual.timeTaken ? getTagDisplayName(ritual.timeTaken.toString(), 'timeTaken') : null;
  const ritualModeDisplayName = ritual.ritualMode ? getTagDisplayName(ritual.ritualMode, 'ritualModes') : null;
  const loveTypesDisplayName = ritual.loveTypes?.length 
    ? ritual.loveTypes.map(type => getTagDisplayName(type.toString(), 'loveTypes')).join(', ')
    : null;

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-6">
        {/* Title */}
        <View className="flex-row justify-between items-start mb-4">
          <View className="flex-1">
            <ThemedText className="text-2xl font-bold mb-1">
              {ritual.title}
            </ThemedText>
            <ThemedText className="text-gray-600">
              {ritual.tagLine}
            </ThemedText>
          </View>
        </View>

        {/* Quick Info */}
        <View className="flex-row justify-between mb-6">
          {[
            { label: 'Duration', value: timeTakenDisplayName },
            { label: 'Mode', value: ritualModeDisplayName },
            { label: 'Love Types', value: loveTypesDisplayName }
          ]
            .filter(item => item.value)
            .map((item, index, array) => (
              <View 
                key={item.label}
                className="items-center"
                style={{ width: `${100 / array.length}%` }}
              >
                <ThemedText className="text-gray-500 text-xs">{item.label}</ThemedText>
                <ThemedText className="font-medium text-center">
                  {item.value}
                </ThemedText>
              </View>
            ))}
        </View>

        {/* Description */}
        <View className="bg-white rounded-xl p-4 shadow-sm">
          <ThemedText className="text-green-600 mr-2">{ritual.description}</ThemedText>
        </View>

        {/* How it helps */}
        <View className="mb-8">
          <TouchableOpacity 
            className="flex-row items-center justify-between mb-2"
            onPress={() => setIsHowItHelpsExpanded(!isHowItHelpsExpanded)}
            activeOpacity={0.7}
          >
            <ThemedText className="text-lg font-semibold">How It Helps</ThemedText>
            {isHowItHelpsExpanded ? 
              <ChevronUp size={20} color="#4B5563" /> : 
              <ChevronDown size={20} color="#4B5563" />
            }
          </TouchableOpacity>
          {isHowItHelpsExpanded && (
            <View className="bg-white rounded-xl p-4 shadow-sm">
              <ThemedText className="text-green-600 mr-2">{ritual.howItHelps}</ThemedText>
            </View>
          )}
        </View>

        {/* Steps */}
        <View className="mb-8">
          <ThemedText className="text-lg font-semibold mb-3">How to Do It</ThemedText>
          <View className="bg-white rounded-xl p-4 shadow-sm">
            {ritual.steps?.map((step, index) => (
              <View key={index} className="flex-row mb-3 last:mb-0">
                <View className="bg-blue-100 w-6 h-6 rounded-full items-center justify-center mr-3 mt-0.5">
                  <ThemedText className="text-blue-700 font-bold text-xs">
                    {index + 1}
                  </ThemedText>
                </View>
                <View className="flex-1">
                  <Markdown
                    style={{
                      body: { color: '#374151' }, // text-gray-700
                      strong: { fontWeight: '600' } // font-semibold
                    }}
                  >
                    {step}
                  </Markdown>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
