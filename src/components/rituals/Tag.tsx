import { ThemedText } from '@/src/components/themes/themed-text';
import { ThemedView } from '@/src/components/themes/themed-view';
import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, View } from 'react-native';

type TagVariant = 'default' | 'selected';
type TagSize = 'regular' | 'small';

const variantStyles = {
  default: {
    bg: "bg-gray-100",
    text: "text-gray-700",
    border: "border-gray-200"
  },
  selected: {
    bg: "bg-violet-100",
    text: "text-violet-700",
    border: "border-violet-200"
  }
};

const sizeStyles = {
  regular: {
    px: "px-3",
    py: "py-1.5",
    text: "text-xs",
    closeIcon: 14
  },
  small: {
    px: "px-2",
    py: "py-0.5",
    text: "text-2xs",
    closeIcon: 12 
  }
};

interface TagProps {
  label: string;
  variant?: TagVariant;
  size?: TagSize;
  closable?: boolean;
  onClose?: () => void;
}

export default function Tag({
  label,
  variant = 'default',
  size = 'regular',
  closable = false,
  onClose,
}: TagProps) {

  const v = variantStyles[variant];
  const s = sizeStyles[size];

  return (
    <ThemedView 
      className={`${v.bg} rounded-full border ${v.border} ${s.px} ${s.py}`}
    >
      <View className="flex-row items-center gap-1">
        <ThemedText className={`${s.text} font-medium ${v.text}`}>
          {label}
        </ThemedText>
        {closable && (
          <Pressable onPress={onClose} hitSlop={8} className="ml-0.5">
            <MaterialIcons name="close" size={s.closeIcon} color="#4B5563" />
          </Pressable>
        )}
      </View>
    </ThemedView>
  );
}
