import { useHeaderHeight } from "@react-navigation/elements";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const useKeyboardOffset = () => {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();

  return Platform.OS === 'ios' ? headerHeight : 0;
};