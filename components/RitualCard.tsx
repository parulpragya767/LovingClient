import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Ritual } from '@/src/types/data-model';
import { TouchableOpacity } from 'react-native';
import { View } from 'react-native';

interface RitualCardProps {
  ritual: Ritual;
  onPress?: (id: string) => void;
  onLongPress?: () => void;
}

export default function RitualCard({ ritual, onPress, onLongPress }: RitualCardProps) {
  const handlePress = () => {
    if (onPress) {
      onPress(ritual.id);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} onLongPress={onLongPress} delayLongPress={300} activeOpacity={0.8}>
      <ThemedView 
        className="bg-white rounded-xl p-4 mx-4 my-2 border border-gray-200 shadow-md"
      >
        <ThemedText 
          className="text-gray-800 text-lg font-semibold mb-2"
        >
          {ritual.title}
        </ThemedText>
        <ThemedText 
          className="text-gray-600 mb-3"
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {ritual.description}
        </ThemedText>
        {ritual.tags.length > 0 && (
          <View className="flex-row flex-wrap gap-2">
            {ritual.tags.slice(0, 3).map((tag) => (
              <View 
                key={tag} 
                className="bg-blue-50 rounded-full px-3 py-1.5 border border-blue-100"
              >
                <ThemedText className="text-xs text-blue-700 font-medium">
                  #{tag}
                </ThemedText>
              </View>
            ))}
            {ritual.tags.length > 3 && (
              <View className="bg-gray-50 rounded-full px-3 py-1.5 border border-gray-100">
                <ThemedText className="text-xs text-gray-500 font-medium">
                  +{ritual.tags.length - 3} more
                </ThemedText>
              </View>
            )}
          </View>
        )}
        <ThemedText className="text-blue-500 text-sm mt-3">
          View details →
        </ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );
}