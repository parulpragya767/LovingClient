import { ThemedText } from '@/src/components/themes/themed-text';
import { Pressable, View } from 'react-native';
import RitualTags from './RitualTags';

interface TagCategoryProps {
  title: string;
  values?: { key?: string }[];
  isSelected: (k: string) => boolean;
  onToggle: (k: string) => void;
  keyPrefix: string;
}

export default function TagCategory({
  title,
  values,
  isSelected,
  onToggle,
  keyPrefix,
}: TagCategoryProps) {
  if (!values || values.length === 0) return null;
  
  return (
    <View className="mb-3">
      <ThemedText className="mb-2 font-semibold">{title}</ThemedText>
      <View className="flex-row flex-wrap gap-2">
        {values.map((v) => (
          <Pressable key={`${keyPrefix}-${v.key}`} onPress={() => onToggle(v.key || '')}>
            <RitualTags
              tag={v as any}
              bgClassName={isSelected(v.key || '') ? 'bg-violet-100' : 'bg-gray-100'}
              borderClassName={isSelected(v.key || '') ? 'border-violet-300' : 'border-gray-200'}
              colorClassName={isSelected(v.key || '') ? 'text-violet-700' : 'text-gray-700'}
            />
          </Pressable>
        ))}
      </View>
    </View>
  );
}
