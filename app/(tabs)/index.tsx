import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  return (
      <ThemedView className="flex-1 justify-center items-center bg-background-light dark:bg-background-dark">
        <ThemedText>Welcome to Home!</ThemedText>
      </ThemedView>
  );
}