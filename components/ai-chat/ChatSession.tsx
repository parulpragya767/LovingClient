import { ThemedText } from '@/components/themes/themed-text';
import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, View } from 'react-native';

type ChatSessionProps = {
  id: string;
  title: string;
  preview: string;
  isActive: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
};

export function ChatSession({
  id,
  title,
  preview,
  isActive,
  onSelect,
  onDelete,
}: ChatSessionProps) {
  return (
    <Pressable
      onPress={() => onSelect(id)}
      className={`p-4 border-b border-gray-100 flex-row items-center ${
        isActive ? 'bg-purple-50' : 'bg-white'
      }`}
    >
      <View className="flex-1">
        <ThemedText className="font-medium text-gray-900" numberOfLines={1}>
          {title}
        </ThemedText>
        <ThemedText 
          className="text-sm text-gray-500 mt-1"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {preview}
        </ThemedText>
      </View>
      <Pressable 
        onPress={(e) => {
          e.stopPropagation();
          onDelete(id);
        }}
        className="p-1 ml-2"
      >
        <MaterialIcons name="delete-outline" size={20} color="#EF4444" />
      </Pressable>
    </Pressable>
  );
}
