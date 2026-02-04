import { useDevTools } from '@/src/store/useDevTools';
import { Pressable } from 'react-native';

import { AppTheme } from "@/src/components/themes/AppTheme";
import { MaterialIcons } from '@expo/vector-icons';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type DevToolsTriggerProps = {
  visible?: boolean;
};

export function DevToolsTrigger({ visible = false }: DevToolsTriggerProps) {
  const toggle = useDevTools((s) => s.toggle);
  const insets = useSafeAreaInsets();

  if (!__DEV__ || !visible) return null;

  return (
    <View
      pointerEvents="box-none"
      style={{
        position: 'absolute',
        right: 16,
        bottom: insets.bottom + 72,
        zIndex: 50,
      }}
    >
      <Pressable
        onPress={toggle}
        className="w-[52px] h-[52px] rounded-full bg-brand-primary items-center justify-center shadow-lg"
        style={{ elevation: 6 }}
      >
        <MaterialIcons name="build" size={22} color={AppTheme.colors.text.inverse} />
      </Pressable>
    </View>
  );
}

