import { ThemedText } from '@/components/themed-text';
import { StarterPrompt as StarterPromptType } from '@/src/types/chat';
import { Pressable, View } from 'react-native';

type StarterPromptProps = {
  prompt: StarterPromptType;
  onPress: (prompt: string) => void;
};

export function StarterPrompt({ prompt, onPress }: StarterPromptProps) {
  return (
    <Pressable 
      onPress={() => onPress(prompt.text)} 
      className="w-full mb-3 rounded-xl bg-gray-100 p-4 active:opacity-80 active:bg-gray-200"
    >
      <View className="flex-row items-center p-4 border border-gray-300 rounded-xl">
        <ThemedText className="text-base leading-[22px] text-gray-800">
          {prompt.text}
        </ThemedText>
        <View className="ml-2 bg-purple-100 rounded-xl px-2 py-1">
          <ThemedText className="text-xs text-purple-600 font-medium">
            {prompt.category}
          </ThemedText>
        </View>
      </View>
    </Pressable>
  );
}
