import { AppTheme } from "@/src/components/themes/AppTheme";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

export const defaultHeaderOptions: NativeStackNavigationOptions ={
  headerTitleStyle: {
    fontFamily: AppTheme.typography.fontFamily.sans,
    fontSize: 16,
    fontWeight: '600',
    color: AppTheme.colors.text["inverse-muted"],
  },
  headerStyle: {
    backgroundColor: AppTheme.colors.brand.primary,
  },
  headerTintColor: AppTheme.colors.accent.soft,
  headerShadowVisible: false,
};