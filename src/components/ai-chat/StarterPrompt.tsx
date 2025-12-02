import { ThemedText } from '@/src/components/themes/themed-text';
import { TouchableOpacity, View } from 'react-native';

type StarterPromptProps = {
  prompt: string;
  onPress: (prompt: string) => void;
};

export function StarterPrompt({ prompt, onPress }: StarterPromptProps) {
  return (
    <TouchableOpacity 
      onPress={() => onPress(prompt)} 
      className="w-full mb-3 p-4 rounded-xl bg-gray-100"
    >
      <View className="flex-row items-center p-4 border border-gray-300 rounded-xl">
        <ThemedText className="text-base leading text-gray-800">
          {prompt}
        </ThemedText>
      </View>
    </TouchableOpacity>
  );
}
