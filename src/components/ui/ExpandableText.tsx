import { AppText } from '@/src/components/ui/AppText';
import { Button } from '@/src/components/ui/Button';
import { MarkdownText } from '@/src/components/ui/MarkdownText';
import React, { useState } from 'react';
import { View } from 'react-native';

export type ExpandableTextProps = {
  numberOfLines?: number;
  className?: string;
  children: React.ReactNode;
  mode?: 'text' | 'markdown';
};

export function ExpandableText({
  numberOfLines = 2,
  className,
  children,
  mode = 'text',
}: ExpandableTextProps) {
  const [expanded, setExpanded] = useState(false);
  const [overflow, setOverflow] = useState(false);
  const [measured, setMeasured] = useState(false);
  const TextComponent = mode === 'markdown' ? MarkdownText : AppText;

  return (
    <View className="items-start">
       <TextComponent
        className={className}
        numberOfLines={expanded || !measured ? undefined : numberOfLines}
        onTextLayout={(e) => {
          if (!measured) {
            setOverflow(e.nativeEvent.lines.length > numberOfLines);
            setMeasured(true);
          }
        }}
      >
        {children}
      </TextComponent>

      {overflow && (
        <Button variant="ghost" className="mt-1" onPress={() => setExpanded(prev => !prev)}>
          {expanded ? 'Read less' : 'Read more'}
        </Button>
      )}
    </View>
  );
}
