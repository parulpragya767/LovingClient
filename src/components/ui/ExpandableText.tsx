import { AppText } from '@/src/components/ui/AppText';
import { Button } from '@/src/components/ui/Button';
import React, { useState } from 'react';
import { View } from 'react-native';

export type ExpandableTextProps = {
  numberOfLines?: number;
  className?: string;
  children: React.ReactNode;
};

export function ExpandableText({
  numberOfLines = 2,
  className,
  children,
}: ExpandableTextProps) {
  const [expanded, setExpanded] = useState(false);
  const [overflow, setOverflow] = useState(false);
  const [measured, setMeasured] = useState(false);

  return (
    <View className="items-start">
       <AppText
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
      </AppText>

      {overflow && (
        <Button variant="ghost" className="mt-1" onPress={() => setExpanded(prev => !prev)}>
          {expanded ? 'Read less' : 'Read more'}
        </Button>
      )}
    </View>
  );
}
