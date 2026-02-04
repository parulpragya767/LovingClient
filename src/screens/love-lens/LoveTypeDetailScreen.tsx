import ErrorState from '@/src/components/states/ErrorState';
import LoadingState from '@/src/components/states/LoadingState';
import { AppText } from '@/src/components/ui/AppText';
import CollapsibleSection from '@/src/components/ui/CollapsibleSection';
import { MarkdownText } from '@/src/components/ui/MarkdownText';
import { Screen } from '@/src/components/ui/Screen';
import { useLoveTypes } from '@/src/hooks/love-lens/useLoveTypes';
import type { LoveTypeInfoSection } from '@/src/models/loveLens';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ScrollView, View } from 'react-native';

export default function LoveTypeDetailScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const { loveType: loveTypeParam } = useLocalSearchParams<{ loveType: string }>();
  const { data: loveTypes, isLoading, error, refetch } = useLoveTypes();

  const loveTypeDetail = loveTypes?.find(type => type.loveType === loveTypeParam?.toUpperCase());

  useEffect(() => {
    if (!loveTypeDetail) return;
    let mounted = true;
    (async () => {
      if (!mounted) return;

      navigation.setOptions({ title: loveTypeDetail.title || "Love Type Details" });
    })();
    return () => { mounted = false };
  }, [loveTypeDetail, navigation]);

  if (isLoading) return <LoadingState text="Loading love type details..." />;
  if (error) return <ErrorState message="Failed to load love type details." onButtonPress={() => refetch()} />;
  if (!loveTypeDetail) return <ErrorState message="Love type details not available. Please open from the list." onButtonPress={() => router.back()} buttonMessage="Go Back" />;

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Description */}
        <View className="mt-2 mb-6">
          <MarkdownText>
            {loveTypeDetail.description}
          </MarkdownText>
        </View>

        {/* Main Content */}
        {/* Sections */}
        {loveTypeDetail.sections?.slice()
          .sort((a, b) => (a.order || 0) - (b.order || 0))
          .map((section: LoveTypeInfoSection, index: number) => (
            <View key={index} className="mb-6">
              <CollapsibleSection
                key={index}
                title={section.title}
                initiallyExpanded
              >
                <View>
                  <AppText variant="body" className="mb-3">
                    {section.summary}
                  </AppText>
                  {(section.bullets?.length ?? 0) > 0 && (
                    <View>
                      {section.bullets?.map((bullet, bulletIndex) => (
                        <View key={bulletIndex} className="flex-row items-start gap-2 mb-2">
                          <AppText className="font-bold">•</AppText>
                          <View className="flex-1">
                            <MarkdownText>
                              {bullet.title ? `**${bullet.title}** - ${bullet.text}` : bullet.text}
                            </MarkdownText>
                          </View>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              </CollapsibleSection>
            </View>
          ))}

        {/* Bottom Spacer */}
        <View className="h-8" />
      </ScrollView>
    </Screen>
  );
}

