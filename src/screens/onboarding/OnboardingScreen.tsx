import { Button } from '@/src/components/ui/Button';
import { ProgressBars } from '@/src/components/ui/ProgressBars';
import { useUserActions } from '@/src/hooks/user/useUserActions';
import { useRouter } from 'expo-router';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { ScrollView, useWindowDimensions, View } from 'react-native';

import { HeaderlessScreen } from '@/src/components/ui/HeaderlessScreen';
import RitualsAndAIChatInfoScreen from '@/src/screens/onboarding/RitualsAndAIChatInfoScreen';
import StartingPathScreen from '@/src/screens/onboarding/StartingPathScreen';
import WelcomeScreen from '@/src/screens/onboarding/WelcomeScreen';

export default function OnboardingScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const scrollRef = useRef<ScrollView>(null);
  const [isCompleting, setIsCompleting] = useState(false);

  const { markOnboardingCompleted } = useUserActions();

  const pages = useMemo(
    () => [
      { key: 'welcome', Component: WelcomeScreen },
      { key: 'rituals', Component: RitualsAndAIChatInfoScreen },
      { key: 'starting', Component: StartingPathScreen },
    ],
    []
  );

  const totalSteps = pages.length;
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToIndex = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, totalSteps - 1));
      scrollRef.current?.scrollTo({ x: clamped * width, animated: true });
      setCurrentIndex(clamped);
    },
    [totalSteps, width]
  );

  const handleMomentumEnd = useCallback(
    (e: any) => {
      const x = e?.nativeEvent?.contentOffset?.x ?? 0;
      const nextIndex = Math.round(x / width);
      if (nextIndex !== currentIndex) setCurrentIndex(nextIndex);
    },
    [currentIndex, width]
  );

  const completeOnboarding = useCallback(async () => {
    if (isCompleting) return;
    setIsCompleting(true);

    try {
      await markOnboardingCompleted.mutateAsync();
    } catch {}

    router.replace('/(tabs)');
  }, [router, markOnboardingCompleted, isCompleting]);

  const showSkip = currentIndex < totalSteps - 1;
  const showFinish = currentIndex === totalSteps - 1;

  return (
    <HeaderlessScreen>
      <ProgressBars
        total={totalSteps}
        currentIndex={currentIndex}
        onPressStep={scrollToIndex}
      />

      <View className="flex-1">
        <ScrollView className="px-6 pt-6"
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleMomentumEnd}
          scrollEventThrottle={16}
        >
          {pages.map(({ key, Component }) => (
            <View key={key} style={{ width }}>
              <Component />
            </View>
          ))}
        </ScrollView>
      </View>
      
      {showSkip && 
        <Button 
          variant="ghost" 
          onPress={completeOnboarding} 
          className="flex-row justify-center">
          Skip
        </Button>
      }

      {showFinish && 
        <Button 
          variant="primary" 
          onPress={completeOnboarding} 
          disabled={isCompleting}>
          Finish
        </Button>
      }
    </HeaderlessScreen>
  );
}
