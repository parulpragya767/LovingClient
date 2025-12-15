import { TouchableWithoutFeedback, View } from "react-native";

export type SideDrawerProps = {
  children: React.ReactNode;
  onClose: () => void;
};

export function SideDrawer({ children, onClose }: SideDrawerProps) {
  return (
    <View className="flex-1 flex-row bg-black/40">
      {/* Drawer panel */}
      <View className="w-[85%] max-w-[320px] h-full bg-surface-screen">
        {children}
      </View>

      {/* Backdrop */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1" />
      </TouchableWithoutFeedback>
    </View>
  );
}
