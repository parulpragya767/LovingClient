import { TopNavigationTabScreenOptions } from '@/src/components/ui/navigation/TabOptions';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { withLayoutContext } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const { Navigator } = createMaterialTopTabNavigator();

const Tabs = withLayoutContext(Navigator);

export default function RitualsTabsLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["left", "right"]}>
      <Tabs screenOptions={TopNavigationTabScreenOptions}>
        <Tabs.Screen name="current" options={{ title: 'My Rituals' }} />
        <Tabs.Screen name="all-rituals" options={{ title: 'All Rituals' }} />
        <Tabs.Screen name="history" options={{ title: 'History' }} />
      </Tabs>
    </SafeAreaView>
  );
}
