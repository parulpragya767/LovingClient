import { AppText } from '@/src/components/ui/AppText';
import { Card } from '@/src/components/ui/Card';
import { MarkdownText } from '@/src/components/ui/MarkdownText';
import React from 'react';
import { View } from 'react-native';

export default function WelcomeScreen() {
  return (
    <View className="flex-1 justify-start mt-4">

      {/* Visual Anchor */}
      <View className="items-center mb-6">
        <View className="w-16 h-16 rounded-full bg-surface-sunken items-center justify-center">
          <AppText>♡</AppText>
        </View>
      </View>

      {/* Title */}
      <AppText variant="title" className="text-center">
        Love is something you practice
      </AppText>

      {/* Intro */}
      <AppText className="text-center mt-4">
        Loving helps you understand the different ways love shows up — and gives you simple practices to grow it, over time.
      </AppText>

      {/* Concept Card */}
      <Card className="mt-10" color="bg-surface-sunken">
        <AppText className="text-center">
          Caring, desire, trust, growth, belonging — each matters in its own way.
        </AppText>

        <MarkdownText className="mt-3 text-center">
          Loving looks at love through **love types**, so you can see what’s strong, what needs attention, and where to begin.
        </MarkdownText>
      </Card>

      {/* Divider */}
      <View className="items-center mt-8">
        <View className="h-px w-24 bg-accent-primary opacity-60" />
      </View>

      {/* Gentle Reassurance */}
      <AppText variant="small" color="text-text-muted" className="text-center mt-8">
        There’s no right or wrong here — just awareness and practice.
      </AppText>
    </View>
  );
}

