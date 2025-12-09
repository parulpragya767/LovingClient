import { AppTheme } from "../../themes/AppTheme";

export const defaultHeaderOptions = {
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
  headerBackTitleVisible: false,
  headerShadowVisible: false,
};