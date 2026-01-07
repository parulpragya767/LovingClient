import { AppTheme } from "@/src/components/themes/AppTheme";
import { AppText } from '@/src/components/ui/AppText';
import { Icon } from '@/src/components/ui/Icon';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, View } from 'react-native';

export type SettingItemProps = {
    label: string;
    onPress?: () => void;
    disabled?: boolean;
    hint?: string;
    icon?: keyof typeof Ionicons.glyphMap;
    isLast?: boolean;
}

export default function SettingsItem({
  label,
  onPress,
  disabled,
  hint,
  icon,
  isLast,
}: SettingItemProps) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      className={`px-4 py-4 ${!isLast ? 'border-b border-border' : ''} ${disabled ? 'opacity-50' : ''}`}
    >
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center flex-1">
          {icon && (
            <View className="mr-3">
              <Icon name={icon} color = {AppTheme.colors.text.muted}/>
            </View>
          )}
          <AppText variant="body">{label}</AppText>
        </View>

        {hint && <AppText variant="caption" className="text-muted">{hint}</AppText>}
      </View>
    </Pressable>
  );
}
