import { AppTheme } from "@/src/components/themes/AppTheme";
import { AppText } from "@/src/components/ui/AppText";
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity, View } from 'react-native';

type RitualRecommendationConsentCardProps = {
  onPress: () => void;
};

export function RitualRecommendationConsentCard({ onPress }: RitualRecommendationConsentCardProps) {
  return (
    <TouchableOpacity className="w-full" onPress={onPress}>
      <View className="flex-row items-center gap-4 rounded-card p-4 bg-accent-subtle border border-border">
        <View className="bg-surface-sunken rounded-full w-6 h-6 items-center justify-center">
          <MaterialIcons name="check" size={16} color={AppTheme.colors.brand.primary} />
        </View>
        <View className="flex-1">
          <AppText variant="small">
            Would you like me to recommend a personalized ritual pack based on our conversation?
          </AppText>
          <AppText variant="small" color="text-brand-primary" className="mt-1 font-medium">
            Show me recommendations
          </AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
}
