import { AppTheme } from "@/src/components/themes/AppTheme";

export const DefaultHeaderOptions = {
  headerStyle: {
    backgroundColor: AppTheme.colors.brand.primary,
  },

  headerTintColor: AppTheme.colors.text.inverseSubtle,

  headerTitleStyle: {
    fontFamily: AppTheme.typography.fontFamily.sans,
    fontSize: parseFloat(AppTheme.typography.fontSize.body[0]),
    fontWeight: '600' as const,
  },

  headerLeftContainerStyle: {
    paddingLeft: 12,
  },
  headerRightContainerStyle: {
    paddingRight: 12,
  },
  
  headerTitleAlign: 'center' as const,
  headerBackVisible: false,
  headerShadowVisible: false,
};