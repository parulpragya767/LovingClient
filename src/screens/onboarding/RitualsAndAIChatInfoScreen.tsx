import { AppText } from '@/src/components/ui/AppText';
import { Card } from '@/src/components/ui/Card';
import { MarkdownText } from '@/src/components/ui/MarkdownText';
import React from 'react';
import { View } from 'react-native';

export default function RitualsAndAIChatInfoScreen() {
  return (
    <View className="flex-1 justify-start mt-6">

      {/* Title */}
      <AppText variant="title" className="text-center">
        Small practices, real change
      </AppText>

      {/* Intro */}
      <AppText className="text-center mt-4">
        Loving doesn’t give advice to follow — it offers simple practices you can
        return to, again and again.
      </AppText>

      {/* Rituals Card */}
      <Card className="mt-10" color="bg-surface-sunken">
        <AppText className="text-center">
          Rituals are small, intentional actions.
        </AppText>

        <View className="h-px bg-border/40 my-6" />

        <AppText className="text-center">
          They help you pause, reflect, connect, or repair — depending on what
          your relationship needs in that moment.
        </AppText>
      </Card>

      {/* AI Chat Card */}
      <Card className="mt-6" color="bg-surface-sunken">
        <AppText className="text-center">
          You can also talk things through.
        </AppText>

        <View className="h-px bg-border/40 my-6" />

        <MarkdownText className="text-center">
          The **AI companion** listens, helps you make sense of what’s happening,
          and gently suggests **ritual packs** that may support you right now.
        </MarkdownText>
      </Card>

      {/* Gentle reassurance */}
      <AppText variant="small" className="text-center mt-8">
        You choose what feels right. Nothing is forced.
      </AppText>

    </View>
  );
}


