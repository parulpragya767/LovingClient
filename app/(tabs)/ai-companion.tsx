import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StyleSheet } from 'react-native';

export default function AICompanionScreen() {
  return (
    <ThemedView className="bg-background-light dark:bg-background-dark" style={styles.container}>
      <ThemedText>Welcome to AI Companion!</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
