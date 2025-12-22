import { Pressable, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export type SideDrawerProps = {
  children: React.ReactNode;
  onClose: () => void;
};

export function SideDrawer({ children, onClose }: SideDrawerProps) {
  return (
    <View className="flex-1">
      {/* Backdrop */}
      <Pressable onPress={onClose} className="absolute inset-0 bg-black/40" />

      {/* Drawer panel */}
      <View className="absolute left-0 top-0 bottom-0 w-[85%] max-w-[320px] bg-surface-screen">
        <SafeAreaView className="flex-1" edges={['top', 'bottom']}>
          {children}
        </SafeAreaView>
      </View>
    </View>
  );
}
