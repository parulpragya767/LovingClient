import { Button } from '@/src/components/ui/Button';
import { HeaderlessScreen } from '@/src/components/ui/HeaderlessScreen';
import { ProgressBars } from '@/src/components/ui/ProgressBars';
import { useUserActions } from '@/src/hooks/user/useUserActions';
import RitualsAndAIChatInfoScreen from '@/src/screens/onboarding/RitualsAndAIChatInfoScreen';
import StartingPathScreen from '@/src/screens/onboarding/StartingPathScreen';
import WelcomeScreen from '@/src/screens/onboarding/WelcomeScreen';
import { useRouter } from 'expo-router';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { FlatList, useWindowDimensions, View } from 'react-native';

export default function OnboardingScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const listRef = useRef<FlatList>(null);
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
      
      <FlatList
        ref={listRef}
        data={pages}
        horizontal
        pagingEnabled
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
      />

      <View className="pb-6">
        {showSkip && 
          <Button variant="ghost" onPress={completeOnboarding}>
            Skip
          </Button>
        }

        {showFinish && 
          <Button variant="primary" onPress={completeOnboarding} disabled={isCompleting}>
            Finish
          </Button>
        }
      </View>
      
    </HeaderlessScreen>
  );
}
