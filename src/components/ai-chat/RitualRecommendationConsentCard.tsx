import { AppTheme } from "@/src/components/themes/AppTheme";
import { AppText } from "@/src/components/ui/AppText";
import { Button } from "@/src/components/ui/Button";
import { MaterialIcons } from '@expo/vector-icons';
import { View } from 'react-native';

type RitualRecommendationConsentCardProps = {
  onPress: () => void;
};

export function RitualRecommendationConsentCard({ onPress }: RitualRecommendationConsentCardProps) {
  return (
    <View className="w-full flex-row gap-4 rounded-card px-4 py-3 bg-accent-subtle border border-border">
      <View className="mt-0.5">
        <MaterialIcons name="auto-awesome" size={20} color={AppTheme.colors.brand.primary} />
      </View>
      
      <View className="flex-1 items-start gap-1">
        <AppText variant="small">
          I can suggest a ritual pack tailored to what you’ve shared.
        </AppText>
        <Button variant="ghost" size="small" onPress={onPress}>
          Recommend a ritual pack →
        </Button>
      </View>
    </View>
  );
}
