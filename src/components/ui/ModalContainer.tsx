import { Pressable, View } from 'react-native';

export type ModalContainerProps = {
  children: React.ReactNode;
  onClose?: () => void;
};

export function ModalContainer({
  children,
  onClose,
}: ModalContainerProps) {
  return (
    <View className="flex-1 items-center justify-center px-4">
      {/* Backdrop */}
      <Pressable
        className="absolute inset-0 bg-black/70"
        onPress={onClose}
      />

      {/* Card */}
      <View className="w-full max-w-[420px] max-h-[85%] bg-surface-screen rounded-card shadow-card border border-border overflow-hidden">
        {children}
      </View>
    </View>
  );
}
