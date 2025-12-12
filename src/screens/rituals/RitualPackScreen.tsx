import RitualCard from '@/src/components/rituals/RitualCard';
import { EmptyState } from '@/src/components/states/EmptyState';
import ErrorState from '@/src/components/states/ErrorState';
import LoadingState from '@/src/components/states/LoadingState';
import { AppText } from '@/src/components/ui/AppText';
import CollapsibleSection from '@/src/components/ui/CollapsibleSection';
import { Screen } from '@/src/components/ui/Screen';
import { useRitualActions } from '@/src/hooks/rituals/useRitualActions';
import { useRitualPack } from '@/src/hooks/rituals/useRitualPack';
import { Ritual } from '@/src/models/rituals';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect, useMemo } from 'react';
import { FlatList, View } from 'react-native';

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
    <Screen>
      <AppText className="mb-6 mt-2">
        {pack.description}
      </AppText>

      {/* How it helps */}
      <CollapsibleSection
        title="How It Helps"
        initiallyExpanded={false}
        containerClassName="mb-4"
      >
        {pack.howItHelps}
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
          <View className="px-1 py-2 mb-1">
            <AppText variant="title">
              Rituals in this pack ({rituals.length})
            </AppText>
          </View>
        }
        ListFooterComponent={<View className="h-20" />}
        ListEmptyComponent={<EmptyState message="No rituals in this pack." />}
      />
    </Screen>
  );
}
