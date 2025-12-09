import ErrorState from '@/src/components/states/ErrorState';
import LoadingState from '@/src/components/states/LoadingState';
import { AppText } from '@/src/components/ui/AppText';
import { Button } from '@/src/components/ui/Button';
import CollapsibleSection from '@/src/components/ui/CollapsibleSection';
import { Screen } from '@/src/components/ui/Screen';
import { useRitual } from '@/src/hooks/rituals/useRitual';
import { useRitualActions } from '@/src/hooks/rituals/useRitualActions';
import { useRitualTags } from '@/src/hooks/rituals/useRitualTags';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
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
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Title */}
        <View className="flex-row justify-between items-start mb-4">
          <AppText variant="subtitle">
            {ritual.tagLine}
          </AppText>
          
          {/* Add to current rituals */}
          {isCurrent ? (
            <View className="items-end">
              <View className="flex-row items-center mb-1">
                <AppText variant="small" className="text-brand-primary mr-2">✓</AppText>
                <AppText variant="small">Added to Your Rituals</AppText>
              </View>
              <Button variant="secondary" onPress={handleGoToCurrentRituals} activeOpacity={0.8}>
                <AppText>Go to My Rituals</AppText>
              </Button>
            </View>
          ) : (
            <Button
              variant="primary"
              onPress={handleAddToCurrent}
              activeOpacity={0.8}
            >
              <AppText>Add to My Rituals</AppText>
            </Button>
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
                <AppText variant="caption">{item.label}</AppText>
                <AppText variant="small" className="font-semibold">{item.value}</AppText>
              </View>
            ))}
        </View>

        {/* Description */}
        <CollapsibleSection
          title="Description"
          initiallyExpanded
          containerClassName="mb-6"
        >
          <AppText>{ritual.description}</AppText>
        </CollapsibleSection>

        {/* How it helps */}
        <CollapsibleSection
          title="How It Helps"
          initiallyExpanded
          containerClassName="mb-6"
        >
          <AppText>{ritual.howItHelps}</AppText>
        </CollapsibleSection>

        {/* Steps */}
        <CollapsibleSection
          title="How to Do It"
          initiallyExpanded
          containerClassName="mb-6"
        >
          {ritual.steps?.map((step, index) => (
            <View key={index} className="flex-row mb-3 last:mb-0">
              <View className="bg-brand-subtle w-6 h-6 rounded-full items-center justify-center mr-3 mt-0.5">
                <AppText variant="caption" className="text-text-inverse">
                  {index + 1}
                </AppText>
              </View>
              <View className="flex-1">
                <Markdown
                  style={{
                    body: { color: '#1F2937' }, // text-gray-700
                    strong: { fontWeight: '600' } // font-semibold
                  }}
                >
                  {step}
                </Markdown>
              </View>
            </View>
          ))}
        </CollapsibleSection>
      </ScrollView>
    </Screen>
  );
}
