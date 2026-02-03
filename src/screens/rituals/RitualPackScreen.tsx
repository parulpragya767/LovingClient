import RitualCard from '@/src/components/rituals/RitualCard';
import { EmptyState } from '@/src/components/states/EmptyState';
import ErrorState from '@/src/components/states/ErrorState';
import LoadingState from '@/src/components/states/LoadingState';
import { AppText } from '@/src/components/ui/AppText';
import CollapsibleSection from '@/src/components/ui/CollapsibleSection';
import { ExpandableText } from '@/src/components/ui/ExpandableText';
import { Screen } from '@/src/components/ui/Screen';
import { useRitualActions } from '@/src/hooks/rituals/useRitualActions';
import { useRitualPack } from '@/src/hooks/rituals/useRitualPack';
import { Ritual } from '@/src/models/rituals';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useEffect, useMemo } from 'react';
import { FlatList, View } from 'react-native';

export default function RitualPackScreen() {
  const navigation = useNavigation();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: pack, isLoading, error } = useRitualPack(id);
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
  if (error || !pack) return <ErrorState message="Failed to load ritual pack." buttonMessage="Go Back" onButtonPress={() => router.back()} />;

  return (
    <Screen>
      <FlatList
        data={rituals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="mb-4">
            <RitualCard ritual={item}/>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}

        ListHeaderComponent={
          <>
            <View className="items-start mb-6 mt-2">
              <ExpandableText numberOfLines={2}>
                {pack.description}
              </ExpandableText>
            </View>

            <CollapsibleSection
              title="How It Helps"
              initiallyExpanded={false}
              containerClassName="mb-6"
            >
              <AppText>{pack.howItHelps}</AppText>
            </CollapsibleSection>

            <View className="mb-3">
              <AppText variant="heading">
                Rituals in this journey
              </AppText>
            </View>
          </>
        }
        ListEmptyComponent={<EmptyState message="This pack doesn’t have rituals yet." />}
      />
    </Screen>
  );
}
