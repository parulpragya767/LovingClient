import { TouchableOpacity, View } from "react-native";
import { AppText } from "./AppText";

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
    <TouchableOpacity onPress={onPress} className="w-full">
      <View className="flex-row items-center bg-accent-subtle border border-border rounded-card p-4">
        <View className="flex-1 mr-3">
          <AppText variant="subtitle">{title}</AppText>

          {subtitle ? <AppText variant="small" className="mt-0.5">{subtitle}</AppText> : null}
        </View>

        <View className="bg-surface-sunken rounded-full border border-border px-3 py-1">
          <AppText variant="small" className="font-medium">{ctaLabel}</AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
}
