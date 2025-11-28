import { useTagSelection } from '@/src/hooks/rituals/useTagSelection';
import { Pressable, View } from 'react-native';
import Tag from './Tag';

export function SelectedTags() {
	const { chips, removeChip, clearAll } = useTagSelection();
  if (chips.length === 0) {
      return null;
  }

  return (
    <View className="px-4 py-3 flex-row flex-wrap gap-2">
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