import clsx from 'clsx';
import { View } from "react-native";
import { AppText } from "./AppText";

type HighlightSectionProps = {
  text: string;
  className?: string;
};

export function HighlightSection({ text, className }: HighlightSectionProps) {
  return (
    <View className={clsx("bg-accent-subtle border border-border rounded-card px-4 py-3", className)}>
      <AppText variant="body" numberOfLines={3} ellipsizeMode="tail">
        {text}
      </AppText>
    </View>
  );
}
