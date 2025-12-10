import { AppTheme } from "@/src/components/themes/AppTheme";
import { ThemedText } from '@/src/components/themes/themed-text';
import { createTopTabScreenOptions } from '@/src/components/ui/navigation/tabOptions';
import { Screen } from '@/src/components/ui/Screen';
import { MaterialIcons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { router, withLayoutContext } from 'expo-router';
import { Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { Navigator } = createMaterialTopTabNavigator();

const Tabs = withLayoutContext(Navigator);

const screenOptions = createTopTabScreenOptions();

export default function RitualsTabsLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["left", "right"]}>
      <Screen className="px-0 pt-4">
        {/* Search Bar */}
        <Pressable 
          className="flex-row items-center bg-surface-sunken rounded-compactCard px-3 mx-2 h-10"
          onPress={() => router.push('/rituals/search')}
        >
          <MaterialIcons name="search" size={20} color={AppTheme.colors.action.ghost.text} />
          <ThemedText className="text-text-muted ml-2">Search rituals...</ThemedText>
        </Pressable>

        <Tabs screenOptions={screenOptions}>
          <Tabs.Screen name="current" options={{ title: 'My Rituals' }} />
          <Tabs.Screen name="all-rituals" options={{ title: 'All Rituals' }} />
          <Tabs.Screen name="history" options={{ title: 'History' }} />
        </Tabs>
      </Screen>
    </SafeAreaView>
  );
}
