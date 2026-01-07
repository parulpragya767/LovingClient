import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';

interface IconProps {
  name: keyof typeof Ionicons.glyphMap;
  size?: number;
  color?: string;
}

export const Icon: React.FC<IconProps> = ({ 
  name, 
  size = 20, 
  color 
}) => {
  return (
    <View className="items-center justify-center" style={{ width: size, height: size }}>
      <Ionicons name={name} size={size * 0.8} color={color} />
    </View>
  );
};
