import { AppText } from '@/src/components/ui/AppText';
import { TouchableOpacity } from 'react-native';

type StarterPromptProps = {
  prompt: string;
  onPress: (prompt: string) => void;
};

export function StarterPrompt({ prompt, onPress }: StarterPromptProps) {
  return (
    <TouchableOpacity
      onPress={() => onPress(prompt)}
      className="w-full px-4 py-3 rounded-card bg-surface-sunken border border-border"
    >
      <AppText>{prompt}</AppText>
    </TouchableOpacity>
  );
}
