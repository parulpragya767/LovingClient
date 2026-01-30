import Tag from '@/src/components/ui/Tag';
import { Chip } from '@/src/models/ritualTags';
import clsx from 'clsx';
import { Pressable, View } from 'react-native';

type SelectedTagsProps = {
  chips: Chip[];
  removeChip: (chip: Chip) => void;
  clearAll: () => void;
  className?: string;
};

export function SelectedTags({ chips, removeChip, clearAll, className }: SelectedTagsProps) {
  if (chips.length === 0) {
    return null;
  }

  return (
    <View className={clsx("flex-row flex-wrap gap-2", className)}>
      {chips.map(chip => (
        <Tag
          key={chip.key}
          label={chip.displayName}
          variant="selected"
          closable
          onClose={() => removeChip(chip)}
        />
      ))}

      {chips.length > 1 && (
        <Pressable onPress={clearAll}>
          <Tag label="Clear All" />
        </Pressable>
      )}
    </View>
  );
}