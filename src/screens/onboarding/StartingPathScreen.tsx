import React from 'react';
import { View } from 'react-native';

import { AppText } from '@/src/components/ui/AppText';
import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';

type StartingPathScreenProps = {
  onStart: (route: string) => void;
};

export default function StartingPathScreen({ onStart }: StartingPathScreenProps) {
  return (
    <View className="flex-1 justify-start mt-6">

      <AppText variant="title" className="text-center">
        Let’s begin gently
      </AppText>

      <AppText className="text-center mt-4">
        There’s no setup to get right. You can explore slowly, or start with a conversation.
      </AppText>

      {/* Primary Path */}
      <Card className="mt-10">
        <AppText variant="subtitle">
          Start with a conversation
        </AppText>

        <AppText className="mt-2">
          Talk about what’s on your mind — a feeling, a relationship, or a question.
          Loving will reflect with you and suggest rituals when they feel helpful.
        </AppText>

        <AppText variant="small" className="mt-2 text-text-secondary">
          No right words needed. You can start anywhere.
        </AppText>

        <Button
          className="mt-4"
          onPress={() => onStart('/(tabs)/ai-chat')}
        >
          Start chatting
        </Button>
      </Card>

      {/* Secondary Path */}
      <Card className="mt-6" color="bg-surface-sunken">
        <AppText variant="subtitle">
          Explore rituals on your own
        </AppText>

        <AppText className="mt-2">
          Browse simple practices designed to strengthen different parts of love —
          care, trust, closeness, growth, and more.
        </AppText>

        <Button
          variant="ghost"
          className="mt-4"
          onPress={() => onStart('/(tabs)/rituals/all-rituals')}
        >
          Browse rituals
        </Button>
      </Card>

      <AppText variant="small" className="text-center mt-8">
        You can switch paths anytime. Loving grows with you.
      </AppText>
    </View>
  );
}


