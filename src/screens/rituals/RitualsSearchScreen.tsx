import { SelectedTags } from '@/src/components/rituals/SelectedTags';
import TagCategory from '@/src/components/rituals/TagCategory';
import ErrorState from '@/src/components/states/ErrorState';
import LoadingState from '@/src/components/states/LoadingState';
import { ThemedText } from '@/src/components/themes/themed-text';
import { ThemedView } from '@/src/components/themes/themed-view';
import { useRitualTags } from '@/src/hooks/rituals/useRitualTags';
import { useTagSelection } from '@/src/hooks/rituals/useTagSelection';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RitualsSearchScreen() {
  const router = useRouter();
  const { data: tagData, isLoading: isTagsLoading, refetch: refetchTags, error } = useRitualTags();
  const { selected, toggle, clearAll } = useTagSelection();
  
  const navigateToResults = async () => {
    router.replace('/rituals/all-rituals');
  };

  if (isTagsLoading) return <LoadingState text="Loading search tags..." />;
  if (error) return <ErrorState message="Failed to load search tags." onButtonPress={() => refetchTags()} />;

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
      <ThemedView className="flex-1">
        <View className="flex-row items-center justify-between p-2 border-b border-gray-200 bg-white">
          <Pressable 
            onPress={() => router.back()}
            className="p-2 ml-2"
          >
            <MaterialIcons name="arrow-back" size={24} color="#4B5563" />
          </Pressable>
          <ThemedText className="font-semibold text-base">Filter rituals</ThemedText>
          <Pressable 
            onPress={navigateToResults}
            className="p-2 mr-2"
          >
            <MaterialIcons name="check" size={24} color="#4B5563" />
          </Pressable>
        </View>

        <SelectedTags />
        
        {/* Tag Categories */}
        {tagData && (
          <ScrollView className="mb-4" showsVerticalScrollIndicator={false}>
            <TagCategory
              title={tagData.loveTypes.displayName}
              tagValues={tagData.loveTypes.values}
              keyPrefix="lt"
              isSelected={(key) => selected.loveTypes.some(v => v.key === key)}
              onToggle={(tag) => toggle('loveTypes', tag)}
            />

            <TagCategory
              title={tagData.ritualModes.displayName}
              tagValues={tagData.ritualModes.values}
              keyPrefix="rm"
              isSelected={(key) => selected.ritualModes.some(v => v.key === key)}
              onToggle={(tag) => toggle('ritualModes', tag)}
            />

            <TagCategory
              title={tagData.timeTaken.displayName}
              tagValues={tagData.timeTaken.values}
              keyPrefix="tt"
              isSelected={(key) => selected.timeTaken.some(v => v.key === key)}
              onToggle={(tag) => toggle('timeTaken', tag)}
            />

            <TagCategory
              title={tagData.ritualTones.displayName}
              tagValues={tagData.ritualTones.values}
              keyPrefix="rt"
              isSelected={(key) => selected.ritualTones.some(v => v.key === key)}
              onToggle={(tag) => toggle('ritualTones', tag)}
            />

            <TagCategory
              title={tagData.relationalNeeds.displayName}
              tagValues={tagData.relationalNeeds.values}
              keyPrefix="rn"
              isSelected={(key) => selected.relationalNeeds.some(v => v.key === key)}
              onToggle={(tag) => toggle('relationalNeeds', tag)}
            />

            <Pressable
              onPress={navigateToResults}
              className="bg-gray-800 rounded-full py-3 items-center mt-4 mb-6 mx-4
                        active:bg-gray-900"
              style={({ pressed }) => [
                pressed && { opacity: 0.7 },
              ]}
            >
              <ThemedText className="text-white font-semibold text-base">
                Show Rituals
              </ThemedText>
            </Pressable>
          </ScrollView>
        )}
    </ThemedView>
    </SafeAreaView>
  );
}
