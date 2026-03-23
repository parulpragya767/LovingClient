import { AppTheme } from "@/src/components/themes/AppTheme";
import { AnimatedPressable } from '@/src/components/ui/AnimatedPressable';
import { AppText } from '@/src/components/ui/AppText';
import { Card } from '@/src/components/ui/Card';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { View } from 'react-native';

export default function AICompanionCard() {
  const router = useRouter();

  return (
    <AnimatedPressable onPress={() => router.push('/ai-chat')} containerClassName="w-full">
      <Card className="border border-border">
        <View className="flex-row items-center">
          <View className="bg-surface-sunken rounded-full p-3 mr-4">
            <MaterialIcons name="chat-bubble-outline" size={24} color={AppTheme.colors.brand.primary} />
          </View>
          <View className="flex-1 mr-1">
            <AppText variant="body" className="font-semibold mb-1">Talk it through</AppText>
            <AppText variant="small">Share what’s happening. Get reflection and gentle ritual suggestions.</AppText>
          </View>
          <MaterialIcons name="chevron-right" size={24} color={AppTheme.colors.brand.primary} />
        </View>
      </Card>
    </AnimatedPressable>
  );
}
