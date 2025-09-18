import { ThemedText } from '@/components/themed-text';
import { ChatMessage } from '@/src/types/chat';
import { Pressable, View } from 'react-native';

type ConversationItemProps = {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  isActive: boolean;
  onPress: (id: string) => void;
  onDelete: (id: string) => void;
};

export function ConversationItem({
  id,
  title,
  lastMessage,
  timestamp,
  isActive,
  onPress,
  onDelete,
}: ConversationItemProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Pressable
      onPress={() => onPress(id)}
      className={`p-4 border-b border-gray-200 ${isActive ? 'bg-purple-50' : 'bg-white'}`}
    >
      <View className="flex-row justify-between items-start">
        <View className="flex-1">
          <ThemedText className="font-medium text-gray-900">
            {title || 'New Chat'}
          </ThemedText>
          <ThemedText 
            className="text-sm text-gray-500 mt-1"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {lastMessage}
          </ThemedText>
        </View>
        <View className="flex-row items-center">
          <ThemedText className="text-xs text-gray-400 mr-2">
            {formatTime(timestamp)}
          </ThemedText>
          <Pressable 
            onPress={(e) => {
              e.stopPropagation();
              onDelete(id);
            }}
            className="p-1"
          >
            <ThemedText className="text-red-500 text-xs">
              Delete
            </ThemedText>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}
