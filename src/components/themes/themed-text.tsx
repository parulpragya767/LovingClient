import { useColorScheme } from "nativewind";
import { Text, TextProps } from "react-native";

export type ThemedTextProps = TextProps & {
  color?: string; // "textPrimary" | "textSecondary" | "accent"
  className?: string;
  override?: { light: string; dark: string };
};

// Simple utility function to combine classnames
const combineClasses = (...classes: (string | undefined)[]) => {
  return classes.filter(Boolean).join(' ').trim();
};

export function ThemedText({ 
  color = "textPrimary", 
  override, 
  className, 
  ...props 
}: ThemedTextProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const baseClasses = combineClasses(
    color ? `text-${color}-${isDark ? 'dark' : 'light'}` : "",
    override ? (isDark ? override.dark : override.light) : "",
    className
  );

  return <Text className={baseClasses} {...props} />;
}