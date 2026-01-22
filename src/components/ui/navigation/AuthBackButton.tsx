import { AppTheme } from "@/src/components/themes/AppTheme";
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';

export function AuthBackButton() {
  const router = useRouter();

  return (
    <Pressable
        onPress={() => router.back()}
        hitSlop={12}
        className="w-11 h-11 items-center justify-center self-start"
      >
        <Ionicons name="chevron-back" size={22} color={AppTheme.colors.action.secondary.text}/>
      </Pressable>
  );
}
