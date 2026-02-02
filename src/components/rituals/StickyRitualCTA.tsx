import { Button } from '@/src/components/ui/Button';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type StickyRitualCTAProps = {
  isAdded: boolean;
  onAdd: () => void;
  onView: () => void;
};

export function StickyRitualCTA({
  isAdded,
  onAdd,
  onView,
}: StickyRitualCTAProps) {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{ paddingBottom: insets.bottom }}
      className="absolute bottom-0 left-0 right-0 bg-surface-screen items-center border-t border-border px-4 pt-4">
      {isAdded ? (
        <Button variant="ghost" onPress={onView} hitSlop={10}>
          View in My Rituals →
        </Button>
      ) : (
        <Button variant="primary" onPress={onAdd} activeOpacity={0.85}>
          Add to My Rituals
        </Button>
      )}
    </View>
  );
}
