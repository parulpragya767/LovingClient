import AICompanionCard from '@/components/home/AICompanionCard';
import CurrentRitualsHome from '@/components/home/CurrentRitualsHome';
import LoveTypesHome from '@/components/home/LoveTypesHome';
import WeeklySuggestionCard from '@/components/home/WeeklySuggestionCard';
import { ThemedView } from '@/components/themed-view';
import { userService } from '@/src/services/user';
import { LoveType, Ritual } from '@/src/types/data-model';
import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [rituals, setRituals] = useState<Ritual[]>([]);
  const [loveTypes, setLoveTypes] = useState<LoveType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const [r, lt] = await Promise.all([
          userService.getCurrentRituals(),
          userService.getCurrentLoveTypes(),
        ]);
        if (!mounted) return;
        setRituals(r);
        setLoveTypes(lt);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <ThemedView className="flex-1 bg-white">
        <FlatList
          ListHeaderComponent={
            <View>
              <CurrentRitualsHome rituals={rituals} />
              <LoveTypesHome loveTypes={loveTypes} />
              <AICompanionCard />
              <WeeklySuggestionCard />
            </View>
          }
          data={[]}
          renderItem={null as any}
        />
      </ThemedView>
    </SafeAreaView>
  );
}