import { AppTheme } from "@/src/components/themes/AppTheme";
import { AppText } from "@/src/components/ui/AppText";
import { Button } from "@/src/components/ui/Button";
import { MaterialIcons } from '@expo/vector-icons';
import { View } from 'react-native';

type RitualRecommendationConsentCardProps = {
  onPress: () => void;
  recommendationsRemaining: number;
};

export function RitualRecommendationConsentCard({ onPress, recommendationsRemaining }: RitualRecommendationConsentCardProps) {
  const hasReachedLimit = recommendationsRemaining === 0;
  
  const text = hasReachedLimit
    ? "You've reached this week's recommendation limit."
    : "I can suggest a ritual pack based on what you've shared.";

  const buttonText = hasReachedLimit
    ? "Browse rituals →"
    : "Recommend a ritual pack →";

  return (
    <View className="w-full flex-row gap-4 rounded-card px-4 py-3 bg-accent-subtle border border-border">
      <View className="mt-0.5">
        <MaterialIcons name="auto-awesome" size={20} color={AppTheme.colors.brand.primary} />
      </View>
      
      <View className="flex-1 items-start gap-1">
        <AppText variant="small">
          {text}
        </AppText>
        <Button variant="ghost" size="small" onPress={onPress}>
          {buttonText}
        </Button>
      </View>
    </View>
  );
}
