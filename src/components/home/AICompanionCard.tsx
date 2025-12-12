import { AppTheme } from "@/src/components/themes/AppTheme";
import { AppText } from '@/src/components/ui/AppText';
import { Card } from '@/src/components/ui/Card';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';

export default function AICompanionCard() {
  const router = useRouter();

  return (
    <Card>
      <Pressable onPress={() => router.push('/ai-companion')}>
        <View className="flex-row items-center">
          <View className="bg-surface-sunken rounded-full p-3 mr-4">
            <MaterialIcons name="chat-bubble-outline" size={24} color={AppTheme.colors.brand.primary} />
          </View>
          <View className="flex-1 mr-1">
            <AppText variant="body" className="font-semibold mb-1">Need to talk?</AppText>
            <AppText variant="small">Chat with your AI companion about any relationship questions or concerns</AppText>
          </View>
          <MaterialIcons name="chevron-right" size={24} color={AppTheme.colors.brand.primary} />
        </View>
      </Pressable>
    </Card>
  );
}
