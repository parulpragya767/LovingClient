import { useColorScheme } from "nativewind";
import { View, ViewProps } from "react-native";
export type ThemedViewProps = ViewProps & {
  bg?: string;     // "background" | "surface" | "accent"
  border?: string; // "border"
  className?: string;
  override?: { light: string; dark: string }; // manual override
};

// Simple utility function to combine classnames
const combineClasses = (...classes: (string | undefined)[]) => {
  return classes.filter(Boolean).join(' ').trim();
};

export function ThemedView({ bg, border, override, className, ...props }: ThemedViewProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const baseClasses = combineClasses(
    className,
    bg ? `bg-${bg}-${isDark ? 'dark' : 'light'}` : "",
    border ? `border-${border}-${isDark ? 'dark' : 'light'}` : "",
    override ? (isDark ? override.dark : override.light) : "",
  );

  return <View className={baseClasses} {...props} />;
}