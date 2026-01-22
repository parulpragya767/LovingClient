import { useKeyboardOffset } from '@/src/hooks/ui/useKeyboardOffset';
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';

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
      <TouchableWithoutFeedback
        className="flex-1"
        onPress={Keyboard.dismiss}
        accessible={false}
      >
        {children}
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
