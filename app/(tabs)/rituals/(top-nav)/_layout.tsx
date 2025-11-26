import { ThemedText } from '@/src/components/themes/themed-text';
import { MaterialIcons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator, MaterialTopTabNavigationOptions } from '@react-navigation/material-top-tabs';
import { router, withLayoutContext } from 'expo-router';
import { Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { Navigator } = createMaterialTopTabNavigator();

const Tabs = withLayoutContext(Navigator);

const screenOptions: MaterialTopTabNavigationOptions = {
  tabBarActiveTintColor: '#000',
  tabBarInactiveTintColor: '#6B7280',
  tabBarIndicatorStyle: { backgroundColor: '#8B5CF6' },
  tabBarLabelStyle: { textTransform: 'none', fontSize: 14, fontWeight: '500' },
  tabBarStyle: { backgroundColor: '#fff' },
};

export default function RitualsTabsLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
      <View className="flex-1 bg-white w-full px-4 pt-3">
        {/* Search Bar */}
        <Pressable 
          className="flex-row items-center bg-gray-100 rounded-lg px-3 h-10 w-full"
          onPress={() => router.push('/rituals/search')}
        >
          <MaterialIcons name="search" size={20} color="#6B7280" />
          <ThemedText className="text-gray-500 ml-2">Search rituals...</ThemedText>
        </Pressable>

        <Tabs screenOptions={screenOptions}>
          <Tabs.Screen name="current" options={{ title: 'Current' }} />
          <Tabs.Screen name="all-rituals" options={{ title: 'All Rituals' }} />
          <Tabs.Screen name="history" options={{ title: 'History' }} />
        </Tabs>
      </View>
    </SafeAreaView>
  );
}
