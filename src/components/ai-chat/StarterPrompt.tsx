import { AppText } from '@/src/components/ui/AppText';
import { TouchableOpacity, View } from 'react-native';

type StarterPromptProps = {
  prompt: string;
  onPress: (prompt: string) => void;
};

export function StarterPrompt({ prompt, onPress }: StarterPromptProps) {
  return (
    <TouchableOpacity 
      onPress={() => onPress(prompt)} 
      className="w-full mb-3 p-4 rounded-card bg-surface-sunken"
    >
      <View className="flex-row items-center p-4 border border-border-strong rounded-card">
        <AppText variant="body">
          {prompt}
        </AppText>
      </View>
    </TouchableOpacity>
  );
}
