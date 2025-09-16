import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function LoveLensScreen() {
  return (
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome to Love Lens!</ThemedText>
      </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
