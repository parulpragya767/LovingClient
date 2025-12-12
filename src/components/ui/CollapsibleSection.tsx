import { AppTheme } from "@/src/components/themes/AppTheme";
import { AppText } from '@/src/components/ui/AppText';
import clsx from 'clsx';
import { ChevronDown, ChevronUp } from 'lucide-react-native';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

export type CollapsibleSectionProps = {
  title: string;
  children: React.ReactNode;
  initiallyExpanded?: boolean;
  headerClassName?: string;
  containerClassName?: string;
};

const baseContainerClasses = 'rounded-card shadow-card bg-surface-elevated overflow-hidden';
const baseHeaderClasses = 'flex-row items-center justify-between bg-brand-subtle rounded-t-card px-4 py-2';

export default function CollapsibleSection({
  title,
  children,
  initiallyExpanded = false,
  headerClassName,
  containerClassName,
}: CollapsibleSectionProps) {
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded);

  const toggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View className={clsx(baseContainerClasses, containerClassName)}>
      <TouchableOpacity
        className={clsx(baseHeaderClasses, headerClassName)}
        onPress={toggle}
        activeOpacity={0.7}
      >
        <AppText variant="subtitle" color="text-text-secondary">{title}</AppText>
        {isExpanded ? (
          <ChevronUp size={24} color={AppTheme.colors.text.secondary} />
        ) : (
          <ChevronDown size={24} color={AppTheme.colors.text.secondary} />
        )}
      </TouchableOpacity>

      {isExpanded && (
        <View className="px-4 pt-2 pb-4">
          {children}
        </View>
      )}
    </View>
  );
}
