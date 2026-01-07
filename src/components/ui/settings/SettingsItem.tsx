import { AppText } from '@/src/components/ui/AppText';
import { Pressable, View } from 'react-native';

export default function SettingsItem({
  label,
  onPress,
  disabled,
  hint,
  variant = 'default',
}: {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  hint?: string;
  variant?: 'default' | 'destructive';
}) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      className={`px-4 py-4 border-b border-border ${
        disabled ? 'opacity-50' : ''
      }`}
    >
      <View className="flex-row justify-between items-center">
        <AppText
          variant="body"
          className={variant === 'destructive' ? 'text-red-500' : ''}
        >
          {label}
        </AppText>

        {hint && (
          <AppText variant="caption" className="text-muted">
            {hint}
          </AppText>
        )}
      </View>
    </Pressable>
  );
}
