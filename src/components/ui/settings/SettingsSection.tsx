import { AppText } from '@/src/components/ui/AppText';
import { View } from 'react-native';

export type SettingSectionProps = {
    title?: string;
    children: React.ReactNode;
    disabled?: boolean;
}

export default function SettingsSection({
  title,
  children,
  disabled,
}: SettingSectionProps) {
  if (disabled) {
    return null;
  }
  
  return (
    <View className="mb-6">
      {title && (
        <AppText variant="subtitle" className="mb-2">
          {title}
        </AppText>
      )}
      <View className="rounded-compactCard bg-surface-sunken border border-border">
        {children}
      </View>
    </View>
  );
}
