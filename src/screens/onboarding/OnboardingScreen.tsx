import { Button } from '@/src/components/ui/Button';
import { ProgressBars } from '@/src/components/ui/ProgressBars';
import { Screen } from '@/src/components/ui/Screen';
import { useUserActions } from '@/src/hooks/user/useUserActions';
import { setHasOnboarded } from '@/src/lib/onboarding';
import { useUserStore } from '@/src/store/useUserStore';
import { useRouter } from 'expo-router';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { ScrollView, useWindowDimensions, View } from 'react-native';

import RitualsAndAIChatInfoScreen from '@/src/screens/onboarding/RitualsAndAIChatInfoScreen';
import StartingPathScreen from '@/src/screens/onboarding/StartingPathScreen';
import WelcomeScreen from '@/src/screens/onboarding/WelcomeScreen';

export default function OnboardingScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const scrollRef = useRef<ScrollView>(null);

  const { updateUser } = useUserActions();

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

  const setOnboardingCompleted = useUserStore(s => s.setOnboardingCompleted);

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
    try {
      await updateUser.mutateAsync({ onboardingCompleted: true });
    } catch {
      // ignore and proceed locally
    }

    setOnboardingCompleted(true);

    // Kept for backward compatibility with any legacy checks.
    await setHasOnboarded(true);

    router.replace('/(tabs)');
  }, [router, setOnboardingCompleted, updateUser]);

  const showSkip = currentIndex < totalSteps - 1;
  const showFinish = currentIndex === totalSteps - 1;

  return (
    <Screen className="px-0 py-0">
      <View className="px-6 pt-4">
        <ProgressBars
          total={totalSteps}
          currentIndex={currentIndex}
          onPressStep={scrollToIndex}
        />
      </View>

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleMomentumEnd}
        scrollEventThrottle={16}
        contentOffset={{ x: 0, y: 0 }}
      >
        {pages.map(({ key, Component }) => (
          <View key={key} style={{ width }} className="px-6 pt-6 pb-24">
            <Component />
          </View>
        ))}
      </ScrollView>

      <View className="px-6 pb-6">
        {showSkip ? (
          <View className="flex-row justify-end">
            <Button variant="ghost" onPress={completeOnboarding}>
              Skip
            </Button>
          </View>
        ) : null}

        {showFinish ? (
          <Button variant="primary" onPress={completeOnboarding} className="w-full">
            Finish
          </Button>
        ) : null}
      </View>
    </Screen>
  );
}
