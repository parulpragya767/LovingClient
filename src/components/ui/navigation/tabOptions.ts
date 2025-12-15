import { AppTheme } from '@/src/components/themes/AppTheme';

export const tabScreenOptions = {
  headerShown: false,
  tabBarShowLabel: true,
  tabBarHideOnKeyboard: true,

  tabBarActiveTintColor: AppTheme.colors.text.primary,
  tabBarInactiveTintColor: AppTheme.colors.text.inverse,

  tabBarStyle: {
    backgroundColor: AppTheme.colors.brand.primary,
    borderTopWidth: 0,
  },

  tabBarLabelStyle: {
    fontSize: parseFloat(AppTheme.typography.fontSize.small[0]),
    fontFamily: AppTheme.typography.fontFamily.sans,
  },
};

export const topNavigationTabScreenOptions = {
  tabBarActiveTintColor: AppTheme.colors.brand.primary,
  tabBarInactiveTintColor: AppTheme.colors.text.primary,

  tabBarLabelStyle: {
    fontSize: parseFloat(AppTheme.typography.fontSize.small[0]),
    fontFamily: AppTheme.typography.fontFamily.sans,
    fontWeight: '500' as const,
    textTransform: 'none' as const,
  },

  tabBarIndicatorStyle: {
    backgroundColor: AppTheme.colors.brand.primary,
    height: 2,
  },

  tabBarStyle: {
    backgroundColor: AppTheme.colors.surface.screen,
  },

  tabBarItemStyle: {
    paddingVertical: 8,
  },

  tabBarScrollEnabled: false,
};