import { useAuth } from '@/src/context/AuthContext';
import { useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Alert, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function UserModal() {
  const { user, signOut, loading } = useAuth();
  const router = useRouter();

  const onLogout = async () => {
    try {
      await signOut();
      router.replace('/auth/login');
    } catch (e) {
      Alert.alert('Error', 'Failed to log out');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-6 py-4 border-b border-black/5 flex-row items-center justify-between">
        <Text className="text-xl font-semibold">Your Account</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-blue-600">Close</Text>
        </TouchableOpacity>
      </View>

      <View className="p-6 space-y-4">
        {loading ? (
          <ActivityIndicator />
        ) : (
          <>
            <View>
              <Text className="text-gray-500">Email</Text>
              <Text className="text-base">{user?.email ?? '—'}</Text>
            </View>
            <View>
              <Text className="text-gray-500">User ID</Text>
              <Text className="text-xs text-gray-700 break-all">{user?.id ?? '—'}</Text>
            </View>
            <View>
              <Text className="text-gray-500">Created At</Text>
              <Text className="text-base">{user?.created_at ? new Date(user.created_at).toLocaleString() : '—'}</Text>
            </View>

            <TouchableOpacity
              onPress={onLogout}
              className="mt-8 bg-red-500 rounded-xl py-3 items-center"
            >
              <Text className="text-white font-semibold">Log out</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
