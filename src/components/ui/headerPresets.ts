import { AppTheme } from "../themes/AppTheme";


export function createHeaderOptions({
  title,
  showBack = true,
}: {
  title?: string;
  showBack?: boolean;
}) {
  return {
    title,
    headerTitleStyle: {
      fontFamily: AppTheme.typography.fontFamily.sans,
      fontSize: AppTheme.typography.fontSize.subtitle[0],
      fontWeight: '600',
      color: AppTheme.colors.text["inverse-muted"],
    },
    headerTintColor: AppTheme.colors.text["inverse-muted"],
    headerStyle: {
      backgroundColor: AppTheme.colors.brand.primary,
    },
    headerShadowVisible: false,
    headerBackVisible: showBack,
  };
}