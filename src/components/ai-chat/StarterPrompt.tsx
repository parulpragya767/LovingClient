import { ThemedText } from '@/src/components/themes/themed-text';
import { Pressable, View } from 'react-native';

type StarterPromptProps = {
  prompt: string;
  onPress: (prompt: string) => void;
};

export function StarterPrompt({ prompt, onPress }: StarterPromptProps) {
  return (
    <Pressable 
      onPress={() => onPress(prompt)} 
      className="w-full mb-3 rounded-xl bg-gray-100 p-4 active:opacity-80 active:bg-gray-200"
    >
      <View className="flex-row items-center p-4 border border-gray-300 rounded-xl">
        <ThemedText className="text-base leading-[22px] text-gray-800">
          {prompt}
        </ThemedText>
      </View>
    </Pressable>
  );
}
