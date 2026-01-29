import { Button } from '@/src/components/ui/Button';
import { ProgressBars } from '@/src/components/ui/ProgressBars';
import { useUserActions } from '@/src/hooks/user/useUserActions';
import BeginScreen from '@/src/screens/onboarding/BeginScreen';
import WelcomeScreen from '@/src/screens/onboarding/WelcomeScreen';
import { useRouter } from 'expo-router';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { FlatList, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OnboardingScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const listRef = useRef<FlatList>(null);
  const { markOnboardingCompleted } = useUserActions();

  const completeOnboardingAndNavigate = useCallback(async (route: string) => {
    try {
      await markOnboardingCompleted.mutateAsync();
    } finally {
      router.replace(route);
    }
  }, [router, markOnboardingCompleted]);

  const pages = useMemo(
    () => [
      { key: 'welcome', Component: WelcomeScreen },
      { key: 'begin',
          Component: (props: any) => (
            <BeginScreen
              {...props}
              onStart={(route: string) => completeOnboardingAndNavigate(route)}
            />
        ),
      },    
    ],
    [completeOnboardingAndNavigate]
  );

  const totalSteps = pages.length;
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToIndex = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, totalSteps - 1));
      listRef.current?.scrollToIndex({index: clamped, animated: true});
      setCurrentIndex(clamped);
    },
    [totalSteps]
  );

  const handleMomentumEnd = useCallback(
    (e: any) => {
      const x = e?.nativeEvent?.contentOffset?.x ?? 0;
      const index = Math.round(x / width);
      setCurrentIndex(index);
    },
    [width]
  );

  return (
    <SafeAreaView className="flex-1 bg-surface-screen">
      <ProgressBars className="px-2 pt-6"
        total={totalSteps}
        currentIndex={currentIndex}
        onPressStep={scrollToIndex}
      />
      
      <FlatList
        ref={listRef}
        data={pages}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key}
        onMomentumScrollEnd={handleMomentumEnd}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        renderItem={({ item }) => (
          <View style={{ width }} className="flex-1 px-6 pt-6">
            <item.Component />
          </View>
        )}
        className="flex-1"
      />

      <Button variant="ghost" className="pb-6" onPress={() => completeOnboardingAndNavigate('/(tabs)')}>
        Skip for now
      </Button>  
    </SafeAreaView>
  );
}
