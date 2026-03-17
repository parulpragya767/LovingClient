import { AppText } from '@/src/components/ui/AppText';
import { Card } from '@/src/components/ui/Card';
import { Screen } from '@/src/components/ui/Screen';
import { ScrollView, View } from 'react-native';

export default function SubscriptionScreen() {
  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Free plan */}
        <Card className="border border-border mt-2 mb-6">
          <AppText variant="subtitle" className="mb-1">
            Free Plan
          </AppText>

          <AppText variant="small" color="text-text-secondary">
            Your current plan
          </AppText>

          <View className="mt-3 gap-1">
            <AppText variant="small">• AI conversations (daily limit)</AppText>
            <AppText variant="small">• Ritual recommendations (weekly limit)</AppText>
          </View>
        </Card>

        {/* Premium preview */}
        <Card color="bg-accent-subtle" className="border border-border">
          <AppText variant="subtitle" className="mb-1">
            Premium (coming soon)
          </AppText>
        
          <View className="mt-2 gap-1">
            <AppText variant="small">• Unlimited AI conversations</AppText>
            <AppText variant="small">• Unlimited ritual recommendations</AppText>
            <AppText variant="small">• Early access to new features</AppText>
          </View>

          <AppText variant="small" color="text-text-secondary" className="mt-3">
            Premium plans will be available soon.
          </AppText>
        </Card>
      </ScrollView>
    </Screen>
  );
}
