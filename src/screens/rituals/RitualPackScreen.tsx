import RitualCard from '@/src/components/rituals/RitualCard';
import { EmptyState } from '@/src/components/states/EmptyState';
import ErrorState from '@/src/components/states/ErrorState';
import LoadingState from '@/src/components/states/LoadingState';
import { ThemedText } from '@/src/components/themes/themed-text';
import { ThemedView } from '@/src/components/themes/themed-view';
import CollapsibleSection from '@/src/components/ui/CollapsibleSection';
import { useRitualActions } from '@/src/hooks/rituals/useRitualActions';
import { useRitualPack } from '@/src/hooks/rituals/useRitualPack';
import { Ritual } from '@/src/models/rituals';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect, useMemo } from 'react';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RitualPackScreen() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: pack, isLoading, error, refetch } = useRitualPack(id);
  const { getCurrentRitualPackById } = useRitualActions();
  const currentPack = useMemo(() => id ? getCurrentRitualPackById(id) : null, [id, getCurrentRitualPackById]);
  const rituals: Ritual[] = useMemo(
    () => currentPack?.rituals?.map(r => r.ritual) ?? pack?.rituals ?? [], 
    [currentPack, pack]
  );

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!mounted) return;

      navigation.setOptions({ title: pack?.title || "Ritual Pack Details" });
    })();
    return () => { mounted = false };
  }, [pack]);

  if (isLoading) return <LoadingState text="Loading ritual pack..." />;
  if (error || !pack) return <ErrorState message="Failed to load ritual pack." onButtonPress={() => refetch()} />;

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["left", "right"]}>
      <ThemedView className="flex-1 p-4">
        <ThemedText className="text-gray-600 mb-4">
          {pack.description}
        </ThemedText>

        {/* How it helps */}
        <CollapsibleSection
          title="How It Helps"
          initiallyExpanded
          containerClassName="mb-4"
        >
          <ThemedText className="text-green-600 mr-2">{pack.howItHelps}</ThemedText>
        </CollapsibleSection>
        
        <FlatList
          data={rituals}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="mb-4">
              <RitualCard ritual={item}/>
            </View>
          )}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View className="px-1 py-2">
              <ThemedText className="text-lg font-semibold mb-1 text-gray-900">
                Rituals in this pack ({rituals.length})
              </ThemedText>
            </View>
          }
          ListFooterComponent={<View className="h-20" />}
          ListEmptyComponent={<EmptyState message="No rituals in this pack." />}
        />
      </ThemedView>
    </SafeAreaView>
    
  );
}
