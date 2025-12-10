import { AppTheme } from '@/src/components/themes/AppTheme';
import { MaterialTopTabNavigationOptions } from '@react-navigation/material-top-tabs';

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