import { ThemedText } from '@/components/themes/themed-text';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';

type SuggestedRitualPackProps = {
  onPress?: () => void;
};

export function SuggestedRitualPack({ onPress }: SuggestedRitualPackProps) {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push('/(modals)/rituals-suggestions');
    }
  };

  return (
    <View className="mt-4 mb-24">
      <Pressable onPress={handlePress} className="w-full">
        <View className="bg-purple-50 border border-purple-100 rounded-2xl p-4 flex-row items-center">
          <View className="flex-1 mr-3">
            <ThemedText className="text-purple-700 font-semibold text-base">Suggested Ritual Pack</ThemedText>
            <ThemedText className="text-purple-600 text-sm mt-0.5">
              Open suggestions and add to your current rituals
            </ThemedText>
          </View>
          <View className="bg-white rounded-full px-3 py-1 border border-purple-200">
            <ThemedText className="text-purple-700 text-sm font-medium">Open</ThemedText>
          </View>
        </View>
      </Pressable>
    </View>
  );
}
