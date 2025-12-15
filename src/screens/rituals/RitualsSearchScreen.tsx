import { SelectedTags } from '@/src/components/rituals/SelectedTags';
import TagCategory from '@/src/components/rituals/TagCategory';
import ErrorState from '@/src/components/states/ErrorState';
import LoadingState from '@/src/components/states/LoadingState';
import { Button } from '@/src/components/ui/Button';
import { HeaderIconButton } from '@/src/components/ui/navigation/HeaderIconButton';
import { Screen } from '@/src/components/ui/Screen';
import { useRitualTags } from '@/src/hooks/rituals/useRitualTags';
import { useTagSelectionDraft } from '@/src/hooks/rituals/useTagSelectionDraft';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView } from 'react-native';

export default function RitualsSearchScreen() {
  const router = useRouter();
  const { data: tagData, isLoading: isTagsLoading, refetch: refetchTags, error } = useRitualTags();
  const { selectedDraft, chipsDraft, removeChipDraft, clearAllDraft, toggleDraft, applyDraft } = useTagSelectionDraft();
  
  const navigateToResults = async () => {
    applyDraft();
    router.replace('/rituals/all-rituals');
  };

  if (isTagsLoading) return <LoadingState text="Loading search tags..." />;
  if (error) return <ErrorState message="Failed to load search tags." onButtonPress={() => refetchTags()} />;

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: ({ tintColor }) => (
            <HeaderIconButton
              name="checkmark"
              color={tintColor}
              onPress={navigateToResults}
            />
          ),
        }}
      />
      <Screen>
        <SelectedTags chips={chipsDraft} removeChip={removeChipDraft} clearAll={clearAllDraft} />
        
        {/* Tag Categories */}
        {tagData && (
          <ScrollView className="mb-4" showsVerticalScrollIndicator={false}>
            <TagCategory
              title={tagData.loveTypes.displayName}
              tagValues={tagData.loveTypes.values}
              keyPrefix="lt"
              isSelected={(key) => selectedDraft.loveTypes.some(v => v.key === key)}
              onToggle={(tag) => toggleDraft('loveTypes', tag)}
            />

            <TagCategory
              title={tagData.ritualModes.displayName}
              tagValues={tagData.ritualModes.values}
              keyPrefix="rm"
              isSelected={(key) => selectedDraft.ritualModes.some(v => v.key === key)}
              onToggle={(tag) => toggleDraft('ritualModes', tag)}
            />

            <TagCategory
              title={tagData.timeTaken.displayName}
              tagValues={tagData.timeTaken.values}
              keyPrefix="tt"
              isSelected={(key) => selectedDraft.timeTaken.some(v => v.key === key)}
              onToggle={(tag) => toggleDraft('timeTaken', tag)}
            />

            <TagCategory
              title={tagData.ritualTones.displayName}
              tagValues={tagData.ritualTones.values}
              keyPrefix="rt"
              isSelected={(key) => selectedDraft.ritualTones.some(v => v.key === key)}
              onToggle={(tag) => toggleDraft('ritualTones', tag)}
            />

            <TagCategory
              title={tagData.relationalNeeds.displayName}
              tagValues={tagData.relationalNeeds.values}
              keyPrefix="rn"
              isSelected={(key) => selectedDraft.relationalNeeds.some(v => v.key === key)}
              onToggle={(tag) => toggleDraft('relationalNeeds', tag)}
            />

            <Button
              className="mt-4"
              onPress={navigateToResults}
              variant="primary"
            >
              Show Rituals
            </Button>
          </ScrollView>
        )}
      </Screen>
    </>
  );
}
