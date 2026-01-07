import { AppText } from '@/src/components/ui/AppText';
import { View } from 'react-native';

export default function SettingsSection({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <View className="mb-6">
      {title && (
        <AppText variant="caption" className="mb-2 text-muted">
          {title}
        </AppText>
      )}
      <View className="rounded-xl bg-surface border border-border">
        {children}
      </View>
    </View>
  );
}
