import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { apiService } from '@/src/services/api';
import { Ritual } from '@/src/types/data-model';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function RitualsScreen() {
  const [rituals, setRituals] = useState<Ritual[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await apiService.getRituals();
      setRituals(data);
    }
    fetchData();
  }, []);

  const renderRitualCard = ({ item }: { item: Ritual }) => (
    <ThemedView style={styles.ritualCard}>
      <View style={styles.cardHeader}>
        <ThemedText type="title" style={styles.ritualTitle}>{item.title}</ThemedText>
      </View>
      <View style={styles.cardBody}>
        <ThemedText type="subtitle" style={styles.ritualDescription}>
          {item.description}
        </ThemedText>
        <View style={styles.tagContainer}>
          {item.tags.map((tag) => (
            <TouchableOpacity key={tag} style={styles.tag}>
              <ThemedText style={styles.tagText}>#{tag}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ThemedView>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.screenTitle}>Daily Rituals</ThemedText>
      <ThemedView style={styles.ritualsContainer}>
        <FlatList
          data={rituals}
          keyExtractor={(item) => item.id}
          renderItem={renderRitualCard}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    textAlign: 'center',
  },
  ritualsContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  listContainer: {
    paddingBottom: 20,
  },
  ritualCard: {
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  cardHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  cardBody: {
    padding: 16,
  },
  ritualTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  ritualDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
    marginBottom: 12,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  tag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 14,
    color: '#666',
  },
});