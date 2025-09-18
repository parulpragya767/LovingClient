import { useEffect, useMemo, useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import RitualCard from '@/components/RitualCard';
import { apiService } from '@/src/services/api';
import { userSelections } from '@/src/services/userSelections';
import { Ritual } from '@/src/types/data-model';

export default function RitualSuggestionsScreen() {
  const router = useRouter();
  const [allRituals, setAllRituals] = useState<Ritual[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const rituals = await apiService.getRituals();
        if (!mounted) return;
        setAllRituals(rituals);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  const suggestions = useMemo(() => {
    // Simple suggestion logic: pick 4 that are not already current
    const nonCurrent = allRituals.filter(r => !r.isCurrent);
    return nonCurrent.slice(0, 4);
  }, [allRituals]);

  const toggle = (id: string) => {
    setSelected(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const selectedIds = useMemo(() => Object.keys(selected).filter(id => selected[id]), [selected]);
  const canAdd = selectedIds.length > 0;

  const handleAdd = () => {
    if (!canAdd) return;
    userSelections.addMany(selectedIds);
    router.replace('/(tabs)/rituals/current');
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ThemedText>Loading suggestions...</ThemedText>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header: Back + Title */}
      <View className="w-full px-4 pt-3 pb-2 border-b border-gray-200 bg-white flex-row items-center">
        <Pressable onPress={() => router.back()} className="p-2 mr-2">
          <MaterialIcons name="arrow-back" size={24} color="#4B5563" />
        </Pressable>
        <ThemedText className="text-base font-semibold text-gray-900">Weekly Ritual Pack Suggestion</ThemedText>
      </View>

      <FlatList
        data={suggestions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="px-4 py-3">
            <View className="flex-row items-start">
              {/* Radio */}
              <Pressable onPress={() => toggle(item.id)} className="mr-3 mt-1">
                <View className={`w-5 h-5 rounded-full border ${selected[item.id] ? 'bg-purple-500 border-purple-500' : 'border-gray-300'}`} />
              </Pressable>
              {/* Card */}
              <View className="flex-1">
                <RitualCard ritual={item} onPress={() => toggle(item.id)} />
              </View>
            </View>
          </View>
        )}
        ListHeaderComponent={
          <View className="px-4 pt-4 pb-2">
            <ThemedText className="text-gray-600">Pick 3–4 rituals to add to your current focus this week.</ThemedText>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 96 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Bottom bar */}
      <View className="absolute left-0 right-0 bottom-0 px-4 pb-6 pt-3 bg-white border-t border-gray-200">
        <Pressable
          onPress={handleAdd}
          className={`rounded-xl py-3 items-center ${canAdd ? 'bg-purple-600' : 'bg-gray-300'}`}
          disabled={!canAdd}
        >
          <ThemedText className="text-white font-semibold">
            Add {selectedIds.length} ritual{selectedIds.length === 1 ? '' : 's'} to Current
          </ThemedText>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
