import TagCategory from '@/components/rituals/TagCategory';
import { ThemedText } from '@/components/themes/themed-text';
import { ThemedView } from '@/components/themes/themed-view';
import { useRitualSearchStore } from '@/src/hooks/useRitualSearchStore';
import { useRitualTags } from '@/src/hooks/useRitualTags';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ActivityIndicator, Pressable, ScrollView, View } from 'react-native';


export default function RitualsSearchScreen() {
  const router = useRouter();
  const {
    data: tagData,
    isLoading: tagsLoading,
    selected,
    toggle,
    filter,
    selectedChips,
  } = useRitualTags();
  const { actions } = useRitualSearchStore();
  
  const navigateToResults = async () => {
    actions.setSelection({ selected, chips: selectedChips, filter });
    await actions.runSearch(true);
    router.replace('/(tabs)/rituals/(top-nav)/all-rituals');
  };

  
  return (
    <ThemedView className="flex-1">
      {tagsLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#8B5CF6" />
        </View>
      ) : (
        <>
          <View className="flex-row items-center p-4 border-b border-gray-200 bg-white">
            <Pressable 
              onPress={() => router.back()}
              className="p-2 mr-2"
            >
              <MaterialIcons name="arrow-back" size={24} color="#4B5563" />
            </Pressable>
            <ThemedText className="font-semibold text-base">Filter rituals</ThemedText>
          </View>
          {/* Tag Categories */}
          <ScrollView className="px-4" showsVerticalScrollIndicator={false}>
            <TagCategory
              title={tagData?.loveTypes?.displayName || ''}
              values={tagData?.loveTypes?.values}
              keyPrefix="lt"
              isSelected={(k) => selected.loveTypes.includes(k)}
              onToggle={(k) => toggle('loveTypes', k)}
            />

            <TagCategory
              title={tagData?.ritualTypes?.displayName || ''}
              values={tagData?.ritualTypes?.values}
              keyPrefix="rt"
              isSelected={(k) => selected.ritualTypes.includes(k)}
              onToggle={(k) => toggle('ritualTypes', k)}
            />

            <TagCategory
              title={tagData?.ritualModes?.displayName || ''}
              values={tagData?.ritualModes?.values}
              keyPrefix="rm"
              isSelected={(k) => selected.ritualModes.includes(k)}
              onToggle={(k) => toggle('ritualModes', k)}
            />

            <TagCategory
              title={tagData?.emotionalStates?.displayName || ''}
              values={tagData?.emotionalStates?.values}
              keyPrefix="es"
              isSelected={(k) => selected.emotionalStates.includes(k)}
              onToggle={(k) => toggle('emotionalStates', k)}
            />

            <TagCategory
              title={tagData?.relationalNeeds?.displayName || ''}
              values={tagData?.relationalNeeds?.values}
              keyPrefix="rn"
              isSelected={(k) => selected.relationalNeeds.includes(k)}
              onToggle={(k) => toggle('relationalNeeds', k)}
            />

            <Pressable onPress={navigateToResults} className="bg-gray-700 hover:bg-gray-800 active:bg-gray-900 rounded-lg py-3 items-center my-4">
              <ThemedText className="text-black font-semibold">Show Results</ThemedText>
            </Pressable>
          </ScrollView>
        </>
      )}
    </ThemedView>
  );
}
