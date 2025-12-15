import { AppTheme } from "@/src/components/themes/AppTheme";
import { AppText } from '@/src/components/ui/AppText';
import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';

type HeaderActionButtonProps = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
};

export function HeaderActionButton({
  label,
  icon,
  onPress,
}: HeaderActionButtonProps) {
  return (
    <Pressable onPress={onPress} hitSlop={8} className="h-11 flex-row items-center px-3 gap-1 rounded-lg bg-action-secondary-bg/60">
      <Ionicons name={icon} size={24} color={AppTheme.colors.action.secondary.text} />
      <AppText variant="small" color="text-action-secondary-text" className="font-medium">{label}</AppText>
    </Pressable>
  );
}
