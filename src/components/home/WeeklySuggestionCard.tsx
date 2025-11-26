import { ThemedText } from '@/src/components/themes/themed-text';
import { ThemedView } from '@/src/components/themes/themed-view';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';

export default function WeeklySuggestionCard() {
  const router = useRouter();

  return (
    <View className="px-4 pt-2">
      <Pressable onPress={() => router.push('/(modals)/rituals-suggestions')} className="w-full">
        <ThemedView className="bg-purple-50 border border-purple-100 rounded-2xl p-4 flex-row items-center">
          <View className="flex-1 mr-3">
            <ThemedText className="text-purple-700 font-semibold text-base">Weekly Ritual Pack Suggestion</ThemedText>
            <ThemedText className="text-purple-600 text-sm mt-0.5">Pick 3–4 rituals to focus on this week</ThemedText>
          </View>
          <View className="bg-white rounded-full px-3 py-1 border border-purple-200">
            <ThemedText className="text-purple-700 text-sm font-medium">Start</ThemedText>
          </View>
        </ThemedView>
      </Pressable>
    </View>
  );
}
