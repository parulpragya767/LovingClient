import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import type { RitualTag, TagValue } from '@/src/models/ritualTags';
import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, View } from 'react-native';

interface RitualTagProps {
  label?: string;
  tag?: RitualTag | TagValue | { displayName?: string };
  colorClassName?: string;
  bgClassName?: string;
  borderClassName?: string;
  closable?: boolean;
  onClose?: () => void;
}

export default function RitualTags({
  label,
  tag,
  colorClassName = 'text-gray-700',
  bgClassName = 'bg-gray-100',
  borderClassName = 'border-gray-200',
  closable = false,
  onClose,
}: RitualTagProps) {
  const resolvedLabel = label ?? tag?.displayName ?? '';
  return (
    <ThemedView className={`${bgClassName} rounded-full px-3 py-1.5 border ${borderClassName}`}>
      <View className="flex-row items-center gap-1">
        <ThemedText className={`text-xs font-medium ${colorClassName}`}>
          {resolvedLabel}
        </ThemedText>
        {closable && (
          <Pressable onPress={onClose} hitSlop={8} className="ml-1">
            <MaterialIcons name="close" size={14} color="#4B5563" />
          </Pressable>
        )}
      </View>
    </ThemedView>
  );
}
