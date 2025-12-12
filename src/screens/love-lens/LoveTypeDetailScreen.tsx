import ErrorState from '@/src/components/states/ErrorState';
import LoadingState from '@/src/components/states/LoadingState';
import { ThemedText } from '@/src/components/themes/themed-text';
import CollapsibleSection from '@/src/components/ui/CollapsibleSection';
import { Screen } from '@/src/components/ui/Screen';
import { useLoveTypes } from '@/src/hooks/love-lens/useLoveTypes';
import type { LoveTypeInfoSection } from '@/src/models/loveLens';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, View } from 'react-native';
import Markdown from 'react-native-markdown-display';

export default function LoveTypeDetailScreen() {
  const router = useRouter();
  const { loveType: loveTypeParam } = useLocalSearchParams<{ loveType: string }>();
  const { data: loveTypes, isLoading, error, refetch } = useLoveTypes();

  if (isLoading) return <LoadingState text="Loading love type details..." />;
  if (error) return <ErrorState message="Failed to load love type details." onButtonPress={() => refetch()} />;

  const loveTypeDetail = loveTypes?.find(type => type.loveType === loveTypeParam?.toUpperCase());
  if (!loveTypeDetail) return <ErrorState 
    message="Love type details not available. Please open from the list." 
    onButtonPress={() => router.back()} 
    buttonMessage="Go Back"
  />;

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View className="flex-column items-left justify-centre mb-6 gap-4">
          <ThemedText className="text-2xl font-bold text-gray-800">
            {loveTypeDetail.title || 'Love Type'}
          </ThemedText>
          <Markdown
            style={{
              body: { color: '#4B5563', fontSize: 16, lineHeight: 24 },
              strong: { fontWeight: '600' }
            }}
          >
            {loveTypeDetail.description}
          </Markdown>
        </View>

        {/* Main Content */}
        <View className="space-y-8">
          
          {/* Sections */}
          {loveTypeDetail.sections?.slice()
            .sort((a, b) => (a.order || 0) - (b.order || 0))
            .map((section: LoveTypeInfoSection, index: number) => {
              return (
                <CollapsibleSection
                  key={index}
                  title={section.title}
                  initiallyExpanded
                >
                  <View>
                    <ThemedText className="text-gray-700 mb-3 leading-relaxed">
                      {section.summary}
                    </ThemedText>
                    {(section.bullets?.length ?? 0) > 0 && (
                      <View>
                        {section.bullets?.map((bullet, bulletIndex) => (
                          <View key={bulletIndex} className="flex-row items-center">
                            <View className="p-2">
                              <ThemedText className="text-lg leading-5">•</ThemedText>
                            </View>
                            <View className="flex-1 flex-row flex-wrap items-baseline">
                              {bullet.title && (
                                <>
                                  <ThemedText className="font-semibold text-gray-800">{bullet.title}</ThemedText>
                                  <ThemedText className="mx-1 text-gray-700">-</ThemedText>
                                </>
                              )}
                              <Markdown
                                style={{
                                  body: { color: '#374151', fontSize: 14, lineHeight: 20 },
                                  strong: { fontWeight: '600' }
                                }}
                              >
                                {bullet.text}
                              </Markdown>
                            </View>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                </CollapsibleSection>
              );
            })}
        </View>

        {/* Bottom Spacer */}
        <View className="h-8" />
      </ScrollView>
    </Screen> 
  );
}

