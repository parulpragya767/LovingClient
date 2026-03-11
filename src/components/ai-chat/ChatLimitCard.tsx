import { AppTheme } from "@/src/components/themes/AppTheme";
import { AppText } from "@/src/components/ui/AppText";
import { Button } from "@/src/components/ui/Button";
import { MaterialIcons } from '@expo/vector-icons';
import { View } from 'react-native';

type ChatLimitCardProps = {
  onExplorePremium?: () => void;
};

export function ChatLimitCard({ onExplorePremium }: ChatLimitCardProps) {
  return (
      <View className="w-full rounded-card m-3 px-4 py-3 bg-surface-sunken border border-border">
        <View className="flex-row items-start gap-3">
          <View className="mt-0.5">
            <MaterialIcons name="info-outline" size={20} color={AppTheme.colors.text.secondary} />
          </View>
          
          <View className="flex-1 gap-2">
            <AppText variant="small" color="text-text-secondary">
              ⚠️ You've reached today's chat limit.{'\n'}
              You can continue tomorrow.
            </AppText>
            
            {onExplorePremium && (
              <Button variant="ghost" size="small" onPress={onExplorePremium}>
                Explore Premium
              </Button>
            )}
          </View>
        </View>
      </View>
  );
}
