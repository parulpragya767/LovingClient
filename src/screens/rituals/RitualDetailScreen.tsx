import { StickyRitualCTA } from '@/src/components/rituals/StickyRitualCTA';
import ErrorState from '@/src/components/states/ErrorState';
import LoadingState from '@/src/components/states/LoadingState';
import { AppText } from '@/src/components/ui/AppText';
import CollapsibleSection from '@/src/components/ui/CollapsibleSection';
import { MarkdownText } from '@/src/components/ui/MarkdownText';
import { Screen } from '@/src/components/ui/Screen';
import { useRitual } from '@/src/hooks/rituals/useRitual';
import { useRitualActions } from '@/src/hooks/rituals/useRitualActions';
import { useRitualTags } from '@/src/hooks/rituals/useRitualTags';
import { useToast } from '@/src/hooks/ui/useToast';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ScrollView, View } from 'react-native';

export default function RitualDetailScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: ritual, isLoading, error, refetch } = useRitual(id);
  const { getTagDisplayName } = useRitualTags();
  const { isCurrentRitual, addRitualToCurrent } = useRitualActions();
  const { showSuccess, showError } = useToast();
  
  const isCurrent = ritual ? isCurrentRitual(ritual.id) : false;
  
  const handleAddToCurrent = async () => {
    if (!ritual) return;
    try {
       await addRitualToCurrent.mutateAsync(ritual.id);
       showSuccess("Ritual added successfully!");
    } catch {
      showError("Failed to add ritual.");
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
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Tagline */}
        <AppText variant="body" className="mb-4 mt-2">
          {ritual.tagLine}
        </AppText>
        
        {/* Quick Info */}
        <View className="flex-row mb-6">
          {[
            { label: 'Love Types', value: loveTypesDisplayName },
            { label: 'Mode', value: ritualModeDisplayName },
            { label: 'Duration', value: timeTakenDisplayName },
          ]
            .filter(item => item.value)
            .map(item => (
              <View key={item.label} className="flex-1 items-center gap-1">
                <AppText variant="caption" color="text-text-muted">{item.label}</AppText>
                <AppText variant="small" className="font-medium text-center">{item.value}</AppText>
              </View>
            ))}
        </View>

        {/* Description */}
        <CollapsibleSection
          title="What This Ritual Is"
          initiallyExpanded
          containerClassName="mb-8"
        >
          <AppText>{ritual.description}</AppText>
        </CollapsibleSection>

        {/* How it helps */}
        <CollapsibleSection
          title="How This Helps"
          initiallyExpanded = {false}
          containerClassName="mb-8"
        >
          <AppText>{ritual.howItHelps}</AppText>
        </CollapsibleSection>

        {/* Steps */}
        <CollapsibleSection
          title="How to Practice"
          initiallyExpanded
          containerClassName="mb-8"
        >
          <View className="flex-column items-left gap-4">
            {ritual.steps?.map((step, index) => (
              <View key={index} className="flex-row items-start gap-3">
                <View className="bg-brand-subtle w-6 h-6 rounded-full items-center justify-center">
                  <AppText variant="caption" color="text-text-inverseSubtle">
                    {index + 1}
                  </AppText>
                </View>
                <View className="flex-1">
                  <MarkdownText>
                    {step}
                  </MarkdownText>
                </View>
              </View>
            ))}
          </View>
        </CollapsibleSection>
      </ScrollView>

      {/* Sticky CTA for adding to / viewing current rituals */}
      <StickyRitualCTA
        isAdded={isCurrent}
        onAdd={handleAddToCurrent}
        onView={handleGoToCurrentRituals}
      />
    </Screen>
  );
}
