import { ThemedText } from '@/src/components/themes/themed-text';
import { ThemedView } from '@/src/components/themes/themed-view';
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
  small?: boolean;
  onClose?: () => void;
}

export default function RitualTags({
  label,
  tag,
  colorClassName = 'text-gray-700',
  bgClassName = 'bg-gray-100',
  borderClassName = 'border-gray-200',
  closable = false,
  small = false,
  onClose,
}: RitualTagProps) {
  const resolvedLabel = label ?? tag?.displayName ?? '';
  return (
    <ThemedView 
      className={`${bgClassName} rounded-full border ${borderClassName} ${small ? 'px-2 py-0.5' : 'px-3 py-1.5'}`}
    >
      <View className="flex-row items-center gap-1">
        <ThemedText className={`${small ? 'text-2xs' : 'text-xs'} font-medium ${colorClassName}`}>
          {resolvedLabel}
        </ThemedText>
        {closable && (
          <Pressable onPress={onClose} hitSlop={8} className="ml-0.5">
            <MaterialIcons name="close" size={small ? 12 : 14} color="#4B5563" />
          </Pressable>
        )}
      </View>
    </ThemedView>
  );
}
