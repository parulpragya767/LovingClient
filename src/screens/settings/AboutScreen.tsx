import { AppText } from '@/src/components/ui/AppText';
import { Screen } from '@/src/components/ui/Screen';
import { ScrollView } from 'react-native';

export default function AboutScreen() {
  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AppText className="mt-2 mb-4">
          Loving is built on a simple idea: love is not only a feeling, but something we practice.
        </AppText>

        <AppText className="mb-4">
          The app offers gentle reflections and small rituals designed to help people slow down, pay attention, and care for their relationships.
        </AppText>

        <AppText className="mb-6">
          Loving is not about fixing relationships. It is about creating space to notice, understand, and grow together over time.
        </AppText>

        <AppText color="text-text-muted">
          Version 1.0.0
        </AppText>
      </ScrollView>
    </Screen>
  );
}
