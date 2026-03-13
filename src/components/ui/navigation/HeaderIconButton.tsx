import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";

type HeaderIconButtonProps = {
  name: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  color?: string;
  size?: number;
};

export function HeaderIconButton({
  name,
  onPress,
  color,
  size = 22,
}: HeaderIconButtonProps) {
  return (
    <Pressable onPress={onPress} hitSlop={8} className="w-11 h-11 items-center justify-center">
      <Ionicons name={name} size={size} color={color} />
    </Pressable>
  );
}
