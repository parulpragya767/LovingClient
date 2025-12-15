import clsx from "clsx";
import { TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export type ModalContainerProps = {
  children: React.ReactNode;
  onClose?: () => void;
  align?: 'center' | 'bottom';
};

const baseClasses = 'mx-4 bg-surface-screen rounded-card shadow-card';

export function ModalContainer({
  children,
  onClose,
  align = 'center',
}: ModalContainerProps) {
  return (
    <SafeAreaView
      edges={['top', 'bottom', 'left', 'right']}
      className="flex-1 bg-black/40 justify-center"
    >
      {/* Backdrop */}
      {onClose && (
        <TouchableWithoutFeedback onPress={onClose}>
          <View className="absolute inset-0" />
        </TouchableWithoutFeedback>
      )}

      {/* Modal content */}
      <View
        className={clsx(
          baseClasses,
          align === 'center' && 'self-center',
          align === 'bottom' && 'mt-auto rounded-b-none'
        )}
      >
        {children}
      </View>
    </SafeAreaView>
  );
}
