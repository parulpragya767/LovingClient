import { AppText } from '@/src/components/ui/AppText';
import { Button } from '@/src/components/ui/Button';
import { Screen } from '@/src/components/ui/Screen';
import React from 'react';
import { Linking, ScrollView } from 'react-native';

export default function ContactUsScreen() {
  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AppText variant="body" className="mt-2 mb-6">
          If you have questions, feedback, or need help with the app, feel free to reach out anytime.
        </AppText>

        <AppText variant="body" className="font-semibold mb-1">
          Email Support
        </AppText>

        <AppText variant="body" color="text-text-muted" className="mb-6">
          support@lovingapp.co
        </AppText>

        <Button
          onPress={() =>
            Linking.openURL(
              "mailto:support@lovingapp.co?subject=Loving%20App%20Support"
            )
          }
        >
          Send Email
        </Button>
        <AppText variant="caption" color="text-text-muted" className="mt-4">
          We usually respond within a few days.
        </AppText>
      </ScrollView>
    </Screen>
  );
}

