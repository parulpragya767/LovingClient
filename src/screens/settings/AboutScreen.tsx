import { AppText } from '@/src/components/ui/AppText';
import { Screen } from '@/src/components/ui/Screen';

export default function AboutScreen() {
  return (
    <Screen>
      <AppText variant="title" className="mb-4">
        About Loving
      </AppText>

      <AppText variant="body" className="mb-4">
        Loving is built on a simple idea: love is not just a feeling, but a practice — something we return to through attention, care, and choice.
      </AppText>

      <AppText variant="body" className="mb-4">
        This app offers gentle structures, reflections, and rituals to support presence, understanding, and connection in everyday relationships.
      </AppText>

      <AppText variant="body" className="mb-4">
        Loving is not about fixing relationships, but about creating space to notice, soften, and grow together over time.
      </AppText>

      <AppText variant="body" color="text-text-muted">
        Version 1.0.0
      </AppText>
    </Screen>
  );
}
