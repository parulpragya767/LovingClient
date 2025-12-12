import LoveTypeCard from '@/src/components/love-lens/LoveTypeCard';
import { AppText } from '@/src/components/ui/AppText';
import { LoveTypeDetail } from '@/src/models/loveLens';
import { FlatList, View } from 'react-native';

interface LoveTypesHomeProps {
  loveTypes: LoveTypeDetail[];
}

export default function LoveTypesHome({ loveTypes }: LoveTypesHomeProps) {
  return (
    <View>
      <View className="pt-4 pb-2">
        <AppText variant="subtitle">Your Love Types</AppText>
        <AppText variant="small">Focus areas for you</AppText>
      </View>
      <FlatList
        data={loveTypes}
        keyExtractor={(item) => item.id?.toString() || ''}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View className="mr-3 w-64">
            <LoveTypeCard loveTypeDetail={item} isCompact />
          </View>
        )}
      />
    </View>
  );
}
