// devtools/DevToolsOverlay.tsx
import { AppText } from '@/src/components/ui/AppText';
import { Button } from '@/src/components/ui/Button';
import { useAppErrorStore } from '@/src/store/useAppErrorStore';
import { Pressable, View } from 'react-native';
import { useDevTools } from '../store/useDevTools';

export function DevToolsOverlay() {
  const { visible, toggle, setSlowNetwork } = useDevTools();
  const { setError, clearError } = useAppErrorStore();
  
  if (!__DEV__ || !visible) return null;

  return (
    <Pressable className="absolute inset-0 z-50 bg-black/40" onPress={toggle}>
      <Pressable
        onPress={() => {}}
        className="absolute bottom-24 left-4 right-4 bg-surface-screen rounded-card p-4 gap-3"
      >
        <AppText variant="subtitle">Dev Tools</AppText>

        {/* Errors */}
        <Button variant="secondary" onPress={() => setError('AUTH_ERROR')}>
          Trigger Auth Error
        </Button>
        <Button variant="secondary" onPress={() => setError('NETWORK_ERROR')}>
          Trigger Network Error
        </Button>
        <Button variant="secondary" onPress={() => setError('FATAL_ERROR')}>
          Trigger Fatal Error
        </Button>
        <Button variant="ghost" onPress={clearError}>
          Clear Error
        </Button>

        {/* Network */}
        <View className="h-px bg-border my-2" />

        <Button variant="secondary" onPress={() => setSlowNetwork(3000)}>
          Simulate Slow Network (3s)
        </Button>
        <Button variant="ghost" onPress={() => setSlowNetwork(null)}>
          Disable Network Delay
        </Button>
      </Pressable>
    </Pressable>
  );
}
