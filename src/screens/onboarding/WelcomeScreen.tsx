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
        <View className="flex-row items-center justify-center">
          <View className="h-10 w-10 rounded-full bg-brand-primary/20" />
          <View className="h-12 w-12 rounded-full bg-brand-primary/30 -ml-3 items-center justify-center">
            <AppText>♡</AppText>
          </View>
          <View className="h-10 w-10 rounded-full bg-brand-primary/20 -ml-3" />
        </View>
      </View>

      {/* Title */}
      <AppText variant="title" className="text-center">
        Welcome to Loving
      </AppText>

      {/* Intro */}
      <AppText className="text-center mt-4">
        A gentle way to understand love — and practice it.
      </AppText>

      {/* Concept Card */}
      <Card className="mt-10" color="bg-surface-sunken">
        <AppText variant="small" color="text-text-muted" className="text-center">
          Love shows up in many forms
        </AppText>

        <AppText className="text-center mt-4">
          Care, desire, trust, growth, belonging — each matters in its own way.
        </AppText>

        <MarkdownText className="mt-4 text-center">
          Loving uses **love types** to help you see what’s strong, what needs care, and where to begin.
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

