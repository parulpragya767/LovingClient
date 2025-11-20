import TagCategory from '@/components/rituals/TagCategory';
import { ThemedText } from '@/components/themes/themed-text';
import { ThemedView } from '@/components/themes/themed-view';
import { useRitualTags } from '@/src/hooks/rituals/useRitualTags';
import { useTagSelection } from '@/src/hooks/rituals/useTagSelection';
import { TagValue } from '@/src/models/ritualTags';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ActivityIndicator, Pressable, ScrollView, View } from 'react-native';


export default function RitualsSearchScreen() {
  const router = useRouter();
  const { data: tagData, isLoading: tagsLoading } = useRitualTags();
  const { selected, toggle, clearAll } = useTagSelection();
  
  const navigateToResults = async () => {
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
            <View className="flex-1" />
            <Pressable onPress={clearAll} className="px-3 py-1 rounded bg-gray-100">
              <ThemedText className="text-gray-600">Clear</ThemedText>
            </Pressable>
          </View>
          {/* Tag Categories */}
          <ScrollView className="px-4" showsVerticalScrollIndicator={false}>
            <TagCategory
              title={tagData?.loveTypes?.displayName || ''}
              values={tagData?.loveTypes?.values}
              keyPrefix="lt"
              isSelected={(k) => selected.loveTypes.some(v => v.key === k)}
              onToggle={(k) => {
                const v = (tagData?.loveTypes?.values || []).find(tv => tv.key === k) as TagValue | undefined;
                if (v) toggle('loveTypes', v);
              }}
            />

            <TagCategory
              title={tagData?.ritualModes?.displayName || ''}
              values={tagData?.ritualModes?.values}
              keyPrefix="rm"
              isSelected={(k) => selected.ritualModes.some(v => v.key === k)}
              onToggle={(k) => {
                const v = (tagData?.ritualModes?.values || []).find(tv => tv.key === k) as TagValue | undefined;
                if (v) toggle('ritualModes', v);
              }}
            />

            <TagCategory
              title={tagData?.timeTaken?.displayName || ''}
              values={tagData?.timeTaken?.values}
              keyPrefix="tt"
              isSelected={(k) => selected.timeTaken.some(v => v.key === k)}
              onToggle={(k) => {
                const v = (tagData?.timeTaken?.values || []).find(tv => tv.key === k) as TagValue | undefined;
                if (v) toggle('timeTaken', v);
              }}
            />

            <TagCategory
              title={tagData?.ritualTones?.displayName || ''}
              values={tagData?.ritualTones?.values}
              keyPrefix="rt"
              isSelected={(k) => selected.ritualTones.some(v => v.key === k)}
              onToggle={(k) => {
                const v = (tagData?.ritualTones?.values || []).find(tv => tv.key === k) as TagValue | undefined;
                if (v) toggle('ritualTones', v);
              }}
            />

            <TagCategory
              title={tagData?.relationalNeeds?.displayName || ''}
              values={tagData?.relationalNeeds?.values}
              keyPrefix="rn"
              isSelected={(k) => selected.relationalNeeds.some(v => v.key === k)}
              onToggle={(k) => {
                const v = (tagData?.relationalNeeds?.values || []).find(tv => tv.key === k) as TagValue | undefined;
                if (v) toggle('relationalNeeds', v);
              }}
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
