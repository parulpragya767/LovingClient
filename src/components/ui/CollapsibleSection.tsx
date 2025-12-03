import { ThemedText } from '@/src/components/themes/themed-text';
import { ChevronDown, ChevronUp } from 'lucide-react-native';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

export type CollapsibleSectionProps = {
  title: string;
  children: React.ReactNode;
  initiallyExpanded?: boolean;
  containerClassName?: string;
};

export default function CollapsibleSection({
  title,
  children,
  initiallyExpanded = false,
  containerClassName,
}: CollapsibleSectionProps) {
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded);

  const toggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View className={containerClassName}>
      <TouchableOpacity
        className="flex-row items-center justify-between"
        onPress={toggle}
        activeOpacity={0.7}
      >
        <ThemedText className="text-lg font-semibold">{title}</ThemedText>
        {isExpanded ? (
          <ChevronUp size={20} color="#4B5563" />
        ) : (
          <ChevronDown size={20} color="#4B5563" />
        )}
      </TouchableOpacity>

      {isExpanded && (
        <View className="bg-white rounded-xl p-4 shadow-sm">
          {children}
        </View>
      )}
    </View>
  );
}
