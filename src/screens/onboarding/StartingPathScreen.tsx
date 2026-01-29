import React from 'react';
import { Pressable, View } from 'react-native';

import { AppText } from '@/src/components/ui/AppText';
import { Card } from '@/src/components/ui/Card';
import { MarkdownText } from '@/src/components/ui/MarkdownText';

export default function StartingPathScreen() {
  return (
    <View className="flex-1 justify-start mt-6">

      {/* Title */}
      <AppText variant="title" className="text-center">
        Choose where to begin
      </AppText>

      {/* Framing */}
      <AppText className="text-center mt-4">
        There’s no single right way to start.  
        Pick what feels most natural to you right now.
      </AppText>

      {/* Path 1: Love Types */}
      <Pressable className="mt-10">
        <Card color="bg-surface-sunken">
          <AppText className="text-center">
            Start with love types
          </AppText>

          <View className="h-px bg-border/40 my-6" />

          <MarkdownText className="text-center">
            Reflect on the **areas of love** you want to focus on — like care,
            trust, desire, or growth — and receive a **ritual pack** designed for
            you.
          </MarkdownText>
        </Card>
      </Pressable>

      {/* Path 2: AI Chat */}
      <Pressable className="mt-6">
        <Card color="bg-surface-sunken">
          <AppText className="text-center">
            Talk it through
          </AppText>

          <View className="h-px bg-border/40 my-6" />

          <MarkdownText className="text-center">
            Start a conversation with the **AI companion** — share what’s on your
            mind, and explore rituals together as things become clearer.
          </MarkdownText>
        </Card>
      </Pressable>

      {/* Gentle reassurance */}
      <AppText variant="small" className="text-center mt-8">
        You can always explore the other path later.
      </AppText>

    </View>
  );
}


