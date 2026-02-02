import { Keyboard, TouchableWithoutFeedback, View } from "react-native";


export function DismissKeyboardScreen({ children }: { children: React.ReactNode }) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1">
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
}
