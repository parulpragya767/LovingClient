import ErrorState from '@/src/components/states/ErrorState';
import LoadingState from '@/src/components/states/LoadingState';
import { ThemedText } from '@/src/components/themes/themed-text';
import CollapsibleSection from '@/src/components/ui/CollapsibleSection';
import { useRitual } from '@/src/hooks/rituals/useRitual';
import { useRitualActions } from '@/src/hooks/rituals/useRitualActions';
import { useRitualTags } from '@/src/hooks/rituals/useRitualTags';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import Markdown from 'react-native-markdown-display';
import Toast from 'react-native-toast-message';

export default function RitualDetailScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: ritual, isLoading, error, refetch } = useRitual(id);
  const { getTagDisplayName } = useRitualTags();
  const { isCurrentRitual, addRitualToCurrent } = useRitualActions();
  
  const isCurrent = ritual ? isCurrentRitual(ritual.id) : false;
  
  const handleAddToCurrent = async () => {
    if (!ritual) return;
    try {
      await addRitualToCurrent(ritual.id);
       Toast.show({
          type: "info", 
          text1: "Ritual added successfully!",
        });
    } catch (error) {
      Toast.show({
        type: "error", 
        text1: "Failed to add ritual.",
      });
    }
  };

  const handleGoToCurrentRituals = () => {
    router.push('/rituals/current');
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!mounted) return;

      navigation.setOptions({ title: ritual?.title || "Ritual Details" });
    })();
    return () => { mounted = false };
  }, [ritual]);

  if (isLoading) return <LoadingState text="Loading ritual..." />;
  if (error || !ritual) return <ErrorState message="Failed to load ritual." onButtonPress={() => refetch()} />;
    
  const timeTakenDisplayName = ritual.timeTaken ? getTagDisplayName(ritual.timeTaken.toString(), 'timeTaken') : null;
  const ritualModeDisplayName = ritual.ritualMode ? getTagDisplayName(ritual.ritualMode, 'ritualModes') : null;
  const loveTypesDisplayName = ritual.loveTypes?.length 
    ? ritual.loveTypes.map(type => getTagDisplayName(type.toString(), 'loveTypes')).join(', ')
    : null;

  return (
    <ScrollView className="flex-1 bg-gray-50" showsVerticalScrollIndicator={false}>
      <View className="p-4">
        {/* Title */}
        <View className="flex-row justify-between items-start mb-4">
          <ThemedText className="text-gray-600 text-md">
            {ritual.tagLine}
          </ThemedText>
          
          {/* Add to current rituals */}
          {isCurrent ? (
            <View className="items-end">
              <View className="flex-row items-center mb-1">
                <ThemedText className="text-green-500 font-medium mr-2">✓</ThemedText>
                <ThemedText className="text-gray-600">Added to Your Rituals</ThemedText>
              </View>
              <TouchableOpacity
                onPress={handleGoToCurrentRituals}
                className="bg-gray-200 px-3 py-1.5 rounded-lg"
                activeOpacity={0.8}
              >
                <ThemedText className="text-gray-900 font-medium text-sm">Go to My Rituals</ThemedText>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={handleAddToCurrent}
              className="bg-gray-200 px-3 py-1.5 rounded-lg"
              activeOpacity={0.8}
            >
              <ThemedText className="text-gray-900 font-medium text-sm">Add to My Rituals</ThemedText>
            </TouchableOpacity>
          )}
        </View>

        {/* Quick Info */}
        <View className="flex-row justify-between mb-6">
          {[
            { label: 'Love Types', value: loveTypesDisplayName },
            { label: 'Mode', value: ritualModeDisplayName },
            { label: 'Duration', value: timeTakenDisplayName },
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
        <CollapsibleSection
          title="Description"
          initiallyExpanded
          containerClassName="mb-6"
        >
          <ThemedText className="text-green-600 mr-2">{ritual.description}</ThemedText>
        </CollapsibleSection>

        {/* How it helps */}
        <CollapsibleSection
          title="How It Helps"
          initiallyExpanded
          containerClassName="mb-6"
        >
          <ThemedText className="text-green-600 mr-2">{ritual.howItHelps}</ThemedText>
        </CollapsibleSection>

        {/* Steps */}
        <CollapsibleSection
          title="How to Do It"
          initiallyExpanded
          containerClassName="mb-6"
        >
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
        </CollapsibleSection>
      </View>
    </ScrollView>
  );
}
