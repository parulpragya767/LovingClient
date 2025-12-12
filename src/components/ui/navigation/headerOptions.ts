import { AppTheme } from "@/src/components/themes/AppTheme";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { Platform } from 'react-native';

export const defaultHeaderOptions: NativeStackNavigationOptions = {
  headerTitleStyle: {
    fontFamily: AppTheme.typography.fontFamily.sans,
    fontSize: 16,
    fontWeight: '600',
    color: AppTheme.colors.text.inverse,
  },
  headerStyle: {
    backgroundColor: AppTheme.colors.brand.primary,
  },
  headerTintColor: AppTheme.colors.accent.primary,
  headerShadowVisible: false,
};

export const defaultStackOptions: NativeStackNavigationOptions = {
  headerStyle: {
    backgroundColor: AppTheme.colors.brand.primary,
  },
  headerTintColor: AppTheme.colors.accent.primary,
  headerTitleStyle: {
    fontWeight: '600',
  },
  headerBackTitle: 'Back',
  ...(Platform.OS === 'ios' ? { headerBackTitleVisible: true } : {}),
};