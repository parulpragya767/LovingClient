import { AnimatedPressable } from "@/src/components/ui/AnimatedPressable";
import { AppText } from "@/src/components/ui/AppText";
import { View } from "react-native";

type ActionTileProps = {
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  onPress: () => void;
};

export function ActionTile({
  title,
  subtitle,
  ctaLabel = 'Open',
  onPress,
}: ActionTileProps) {
  return (
    <AnimatedPressable onPress={onPress} className="w-full">
      <View className="flex-row gap-3 items-center bg-accent-subtle border border-border rounded-card px-4 py-3">
        <View className="flex-1">
          <AppText variant="body" className="font-semibold">{title}</AppText>

          {subtitle && <AppText variant="small" className="mt-0.5">{subtitle}</AppText>}
        </View>

        <View className="bg-surface-sunken rounded-full border border-border px-3 py-1">
          <AppText variant="small" color="text-brand-primary" className="font-medium">{ctaLabel}</AppText>
        </View>
      </View>
    </AnimatedPressable>
  );
}
