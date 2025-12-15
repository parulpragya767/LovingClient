import { AppTheme } from "@/src/components/themes/AppTheme";
import { ThemedText } from '@/src/components/themes/themed-text';
import { TopNavigationTabScreenOptions } from '@/src/components/ui/navigation/TabOptions';
import { MaterialIcons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { router, withLayoutContext } from 'expo-router';
import { Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { Navigator } = createMaterialTopTabNavigator();

const Tabs = withLayoutContext(Navigator);

export default function RitualsTabsLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["left", "right"]}>
      
      {/* Search Bar */}
      <View className="bg-surface-screen pt-4 px-4">
        <Pressable 
        className="flex-row items-center bg-surface-sunken rounded-compactCard px-3 h-10"
        onPress={() => router.push('/rituals/search')}
        >
          <MaterialIcons name="search" size={20} color={AppTheme.colors.action.ghost.text} />
          <ThemedText className="text-text-muted ml-2">Search rituals...</ThemedText>
        </Pressable>
      </View>
      
      <Tabs screenOptions={TopNavigationTabScreenOptions}>
        <Tabs.Screen name="current" options={{ title: 'My Rituals' }} />
        <Tabs.Screen name="all-rituals" options={{ title: 'All Rituals' }} />
        <Tabs.Screen name="history" options={{ title: 'History' }} />
      </Tabs>
    </SafeAreaView>
  );
}
