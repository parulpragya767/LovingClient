import { AppText } from '@/src/components/ui/AppText';
import Tag from '@/src/components/ui/Tag';
import { TagValue } from '@/src/models/ritualTags';
import { Pressable, View } from 'react-native';

interface TagCategoryProps {
  title: string;
  tagValues: TagValue[];
  keyPrefix: string;
  isSelected: (key: string) => boolean;
  onToggle: (tag: TagValue) => void;
}

export default function TagCategory({
  title,
  tagValues,
  keyPrefix,
  isSelected,
  onToggle,
}: TagCategoryProps) {
  if (!tagValues || tagValues.length === 0) return null;
  
  return (
    <View className="px-4 py-2">
      <AppText variant="subtitle" className="mb-2">{title}</AppText>
      <View className="flex-row flex-wrap gap-2">
        {tagValues
          .filter(tag => !isSelected(tag.key))
          .map((tag) => (
            <Pressable key={`${keyPrefix}-${tag.key}`} onPress={() => onToggle(tag)}>
              <Tag
                label={tag.displayName}
                variant="default"
              />
            </Pressable>
          ))}
      </View>
    </View>
  );
}
