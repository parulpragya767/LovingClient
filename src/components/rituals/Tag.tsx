import { AppTheme } from "@/src/components/themes/AppTheme";
import { AppText } from '@/src/components/ui/AppText';
import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, View } from 'react-native';

type TagVariant = 'default' | 'selected';
type TagSize = 'regular' | 'small';

const variantStyles = {
  default: {
    bg: "bg-tag-neutral-bg",
    text: "text-tag-neutral-text",
    border: "border-border",
    textColor: AppTheme.colors.tag.neutral.text,
  },
  selected: {
    bg: "bg-tag-highlight-bg",
    text: "text-tag-highlight-text",
    border: "border-border-strong",
    textColor: AppTheme.colors.tag.highlight.text,
  }
};

const sizeStyles = {
  regular: {
    px: "px-3",
    py: "py-1.5",
    textVariant: "caption",
    closeIcon: 14
  },
  small: {
    px: "px-2",
    py: "py-0.5",
    textVariant: "extraSmall",
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
    <View 
      className={`${v.bg} rounded-pill border ${v.border} ${s.px} ${s.py}`}
    >
      <View className="flex-row items-center gap-1">
        <AppText variant={s.textVariant} className={`font-medium ${v.text}`}>
          {label}
        </AppText>
        {closable && (
          <Pressable onPress={onClose} hitSlop={8} className="ml-0.5">
            <MaterialIcons name="close" size={s.closeIcon} color={v.textColor} />
          </Pressable>
        )}
      </View>
    </View>
  );
}
