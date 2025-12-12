import RitualCard from '@/src/components/rituals/RitualCard';
import { AppText } from '@/src/components/ui/AppText';
import { Ritual } from '@/src/models/rituals';
import { FlatList, View } from 'react-native';

interface RitualCardProps {
  rituals: Ritual[];
}

 export default function CurrentRitualsHome({ rituals }: RitualCardProps) {
  return (
    <View>
      <View className="pt-4 pb-2">
        <AppText variant="subtitle">Current Rituals</AppText>
        <AppText variant="small">Your active rituals at a glance</AppText>
      </View>
      <FlatList
        data={rituals}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View className="mr-3 w-72">
            <RitualCard ritual={item} isCompact />
          </View>
        )}
      />
    </View>
  );
}