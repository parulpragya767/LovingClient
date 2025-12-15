import { AppTheme } from '@/src/components/themes/AppTheme';
import { MaterialTopTabNavigationOptions } from '@react-navigation/material-top-tabs';

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
    fontSize: AppTheme.typography.fontSize.small[0],
    fontFamily: AppTheme.typography.fontFamily.sans,
  },
};

export const createTopTabScreenOptions = (): MaterialTopTabNavigationOptions => ({
  tabBarActiveTintColor: AppTheme.colors.brand.primary,
  tabBarInactiveTintColor: AppTheme.colors.text.primary,
  
  tabBarIndicatorStyle: { 
    backgroundColor: AppTheme.colors.brand.primary,
    height: 2,
  },

  tabBarLabelStyle: { 
    fontSize: 14, 
    fontFamily: 'DMSans', 
  },

  tabBarStyle: { 
    backgroundColor: AppTheme.colors.surface.screen 
  },
});