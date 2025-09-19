import { createMaterialTopTabNavigator, MaterialTopTabNavigationOptions } from "@react-navigation/material-top-tabs";
import { View } from "react-native";

// Screens
import { ThemedText } from "@/components/themed-text";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable } from "react-native";
import AllRituals from "./all-rituals";
import CurrentRituals from "./current";
import RitualHistory from "./history";

const Tab = createMaterialTopTabNavigator();


const screenOptions: MaterialTopTabNavigationOptions = {
  tabBarActiveTintColor: '#000',
  tabBarInactiveTintColor: '#6B7280',
  tabBarIndicatorStyle: { backgroundColor: '#8B5CF6' },
  tabBarLabelStyle: { textTransform: 'none', fontSize: 14, fontWeight: '500' },
  tabBarStyle: { backgroundColor: '#fff' },
};

export default function RitualsTopTabs() {
  return (
    <View className="flex-1 bg-white w-full px-4 pt-3">
      {/* Search Bar*/}
      <Pressable 
        className="flex-row items-center bg-gray-100 rounded-lg px-3 h-10 w-full"
        onPress={() => router.push('/rituals/search')}
      >
        <MaterialIcons name="search" size={20} color="#6B7280" />
        <ThemedText className="text-gray-500 ml-2">Search rituals...</ThemedText>
      </Pressable>
      
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="current"
        component={CurrentRituals}
        options={{ title: "Current" }}
      />
      <Tab.Screen
        name="all-rituals"
        component={AllRituals}
        options={{ title: "All Rituals" }}
      />
      <Tab.Screen
        name="history"
        component={RitualHistory}
        options={{ title: "History" }}
      />
    </Tab.Navigator>
    </View>
  );
}
