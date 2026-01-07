import { AppText } from '@/src/components/ui/AppText';
import { Screen } from '@/src/components/ui/Screen';

export default function AboutScreen() {
  return (
    <Screen>
      <AppText variant="title" className="mb-4">
        About Loving
      </AppText>

      <AppText variant="body" className="mb-4">
        Loving is built on the idea that love is not just a feeling,
        but a practice — something we return to, nurture, and grow.
      </AppText>

      <AppText variant="body" className="mb-4">
        This app is designed to support presence, understanding,
        and care in everyday relationships.
      </AppText>

      <AppText variant="body" className="opacity-60">
        Version 1.0.0
      </AppText>
    </Screen>
  );
}
