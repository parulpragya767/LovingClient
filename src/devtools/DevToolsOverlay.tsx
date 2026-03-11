// devtools/DevToolsOverlay.tsx
import { AppText } from '@/src/components/ui/AppText';
import { Button } from '@/src/components/ui/Button';
import CollapsibleSection from '@/src/components/ui/CollapsibleSection';
import { useRitualPacks } from '@/src/hooks/rituals/useRitualPacks';
import { useAppErrorStore } from '@/src/store/useAppErrorStore';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';
import { useDevTools } from '../store/useDevTools';

export function DevToolsOverlay() {
  const { visible, toggle, setSlowNetwork } = useDevTools();
  const { setError, clearError } = useAppErrorStore();
  const router = useRouter();
  const { data: ritualPacks = [] } = useRitualPacks();
  
  if (!__DEV__ || !visible) return null;

  return (
    <Pressable className="absolute inset-0 z-50 bg-black/40" onPress={toggle}>
      <Pressable
        onPress={() => {}}
        className="absolute bottom-24 left-4 right-4 bg-surface-screen rounded-card p-4 gap-3 max-h-96"
      >
        <ScrollView showsVerticalScrollIndicator={false} className="gap-3">
          <AppText variant="subtitle">Dev Tools</AppText>

          {/* Error Simulations */}
          <CollapsibleSection title="Error Simulations" containerClassName="mb-3">
            <View className="gap-2">
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
            </View>
          </CollapsibleSection>

          {/* Network Settings */}
          <CollapsibleSection title="Network Settings" containerClassName="mb-3">
            <View className="gap-2">
              <Button variant="secondary" onPress={() => setSlowNetwork(3000)}>
                Simulate Slow Network (3s)
              </Button>
              <Button variant="ghost" onPress={() => setSlowNetwork(null)}>
                Disable Network Delay
              </Button>
            </View>
          </CollapsibleSection>

          {/* Ritual Packs */}
          <CollapsibleSection title="Ritual Packs" containerClassName="mb-3">
            <View className="gap-2">
              {ritualPacks.length > 0 ? (
                ritualPacks.map((pack) => (
                  <Button
                    key={pack.id}
                    variant="secondary"
                    onPress={() => router.push(`/rituals/pack/${pack.id}`)}
                  >
                    {pack.title}
                  </Button>
                ))
              ) : (
                <AppText className="text-text-secondary">No ritual packs available</AppText>
              )}
            </View>
          </CollapsibleSection>
        </ScrollView>
      </Pressable>
    </Pressable>
  );
}
