import { AppTheme } from "@/src/components/themes/AppTheme";

export const defaultHeaderOptions = {
  headerStyle: {
    backgroundColor: AppTheme.colors.brand.primary,
  },

  headerTintColor: AppTheme.colors.text.inverseSubtle,

  headerTitleStyle: {
    fontFamily: AppTheme.typography.fontFamily.sans,
    fontSize: parseFloat(AppTheme.typography.fontSize.body[0]),
    fontWeight: '600' as const,
  },

  headerTitleAlign: 'center' as const,
  headerBackTitleVisible: false,
  headerShadowVisible: false,
};