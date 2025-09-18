import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <ThemedView className="flex-1 justify-center items-center bg-background-light dark:bg-background-dark">
          <ThemedText>Welcome to Home!</ThemedText>
        </ThemedView>
      </SafeAreaView>
  );
}