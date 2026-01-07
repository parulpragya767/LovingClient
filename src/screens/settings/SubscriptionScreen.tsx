import { AppText } from '@/src/components/ui/AppText';
import { Screen } from '@/src/components/ui/Screen';

export default function SubscriptionScreen() {
  return (
    <Screen>
      <AppText variant="title" className="mb-4">
        Subscription
      </AppText>

      <AppText variant="body" className="mb-4">
        You are currently on the free plan.
      </AppText>

      <AppText variant="body" className="mb-4">
        Upgrade to premium to get access to all features.
      </AppText>
    </Screen>
  );
}
