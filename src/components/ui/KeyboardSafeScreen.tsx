import { useKeyboardOffset } from '@/src/hooks/ui/useKeyboardOffset';
import { KeyboardAvoidingView, Platform, View } from 'react-native';

type KeyboardSafeScreenProps = {
  children: React.ReactNode;
};

export function KeyboardSafeScreen({
  children,
}: KeyboardSafeScreenProps) {

  const keyboardOffset = useKeyboardOffset();

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={keyboardOffset}
    >
      <View className="flex-1">
        {children}
      </View>
    </KeyboardAvoidingView>
  );
}
