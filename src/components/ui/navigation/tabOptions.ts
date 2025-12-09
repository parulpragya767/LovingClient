import { AppTheme } from '@/src/components/themes/AppTheme';
export const tabScreenOptions = {
  headerShown: false,

  tabBarActiveTintColor: AppTheme.colors.text.primary,
  tabBarInactiveTintColor: AppTheme.colors.text.inverse,

  tabBarStyle: {
    backgroundColor: AppTheme.colors.brand.primary,
    borderTopWidth: 0,
  },

  tabBarLabelStyle: {
    fontSize: 14,
    fontFamily: 'DMSans',
  },
};