import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import type { LoveLensInfo, LoveLensInfoSection } from '@/src/models/loveLens';
import { useQueryClient } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, RefreshControl, ScrollView, View } from 'react-native';

export default function LoveTypeDetailScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id } = useLocalSearchParams<{ id: string }>();
  const loveTypeId = id ? parseInt(id, 10) : undefined;

  const loveTypes = queryClient.getQueryData<LoveLensInfo[]>(['loveTypes']);
  const loveType = loveTypes?.find((lt) => lt.id === loveTypeId);

  if (!loveType) {
    return (
      <ThemedView className="flex-1 items-center justify-center p-4">
        <ThemedText className="text-lg text-red-500 mb-4">
          Love type details not available. Please open from the list.
        </ThemedText>
        <Pressable
          onPress={() => router.back()}
          className="bg-blue-500 px-4 py-2 rounded-lg"
        >
          <ThemedText className="text-white">Go Back</ThemedText>
        </Pressable>
      </ThemedView>
    );
  }

  return (
    <ScrollView 
      className="flex-1 bg-gray-50"
      refreshControl={
        <RefreshControl 
          refreshing={false}
          onRefresh={() => {}}
          colors={['#3b82f6']}
          tintColor="#3b82f6"
        />
      }>
      <View className="p-5">
        {/* Header Section */}
        <View className="items-center mb-8">
          <View className="bg-white p-6 rounded-2xl shadow-sm mb-4 w-full max-w-md">
            <View className="flex-row items-center justify-center mb-4">
              <View className="bg-blue-50 p-3 rounded-full mr-3">
                <ThemedText className="text-3xl">{loveType.loveType || '❤️'}</ThemedText>
              </View>
              <ThemedText className="text-2xl font-bold text-gray-800">
                {loveType.title || 'Love Type'}
              </ThemedText>
            </View>
            <ThemedText className="text-center text-gray-600 text-base">
              {loveType.description}
            </ThemedText>
          </View>
        </View>

        {/* Main Content */}
        <View className="space-y-6">
          {/* What It Means Section */}
          <View className="bg-white rounded-xl p-6 shadow-sm">
            <ThemedText className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">
              What It Means
            </ThemedText>
            <ThemedText className="text-gray-700 leading-relaxed">
              {loveType.description || 'No detailed description available.'}
            </ThemedText>
          </View>

          {/* Sections */}
          {loveType.sections?.map((section: LoveLensInfoSection, index: number) => (
            <View key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
              {section.title && (
                <View className="bg-gray-50 px-6 py-3 border-b border-gray-100">
                  <ThemedText className="text-lg font-semibold text-gray-800">
                    {section.title}
                  </ThemedText>
                </View>
              )}
              <View className="p-6">
                {section.summary && (
                  <ThemedText className="text-gray-700 mb-4 leading-relaxed">
                    {section.summary}
                  </ThemedText>
                )}
                {(section.bullets?.length ?? 0) > 0 && (
                  <View className="space-y-2">
                    {section.bullets?.map((bullet, bulletIndex) => (
                      <View key={bulletIndex} className="flex-row items-start">
                        <ThemedText className="text-blue-500 mr-2 mt-1">•</ThemedText>
                        <ThemedText className="text-gray-700 flex-1">
                          {bullet.text}
                        </ThemedText>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            </View>
          ))}

          {/* Why It's Important Section */}
          <View className="bg-white rounded-xl p-6 shadow-sm">
            <ThemedText className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">
              Why It's Important
            </ThemedText>
            <ThemedText className="text-gray-700 leading-relaxed">
              {loveType.description || 'This love type plays a crucial role in building strong relationships.'}
            </ThemedText>
          </View>
        </View>

        {/* Bottom Spacer */}
        <View className="h-8" />
      </View>
    </ScrollView>
  );
}
