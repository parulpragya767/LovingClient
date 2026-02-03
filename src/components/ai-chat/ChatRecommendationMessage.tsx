import { ActionTile } from '@/src/components/ui/ActionTile';
import { useRitualPack } from '@/src/hooks/rituals/useRitualPack';
import { useRitualRecommendation } from '@/src/hooks/rituals/useRitualRecommendation';
import { RecommendationStatus } from '@/src/models/enums';
import { RitualPack } from '@/src/models/ritualPacks';
import { useChatStore } from '@/src/store/useChatStore';
import { useRouter } from 'expo-router';
import { View } from 'react-native';

type ChatRecommendationMessageProps = {
  recommendationId: string;
};

export function ChatRecommendationMessage({ 
  recommendationId, 
}: ChatRecommendationMessageProps) {
  const router = useRouter();
  const { data: recommendation } = useRitualRecommendation(recommendationId);
  
  const { data: ritualPack } = useRitualPack(
    recommendation?.ritualPackId || ''
  );

  const currentSessionId = useChatStore((s) => s.currentSessionId);
  const { setIsRitualRecommendationModalVisible, setRitualRecommendationId, setRecommendationChatSessionId } = useChatStore();

  const setRitualRecommendationModalStates = () => {
    setIsRitualRecommendationModalVisible(true);
    setRitualRecommendationId(recommendationId);
    setRecommendationChatSessionId(currentSessionId);
  };

  const navigateToRitualPackPage = (ritualPack: RitualPack) => {
    router.push(`/rituals/pack/${ritualPack.id}`);
  }
  
  if (!recommendation || !ritualPack) {
    return null;
  }

  const getTileConfig = () => {
    switch (recommendation.status) {
      case RecommendationStatus.Suggested:
      case RecommendationStatus.Viewed:
        return {
          title: 'Suggested Ritual Pack',
          subtitle: `${ritualPack.title} • ${ritualPack.rituals?.length ?? 0} rituals`,
          ctaLabel: 'Review',
          onPress: setRitualRecommendationModalStates,
        };

      case RecommendationStatus.Added:
        return {
          title: 'Added to Your Rituals',
          subtitle: ritualPack.title,
          ctaLabel: 'View',
          onPress: () => navigateToRitualPackPage(ritualPack),
        };

      case RecommendationStatus.Skipped:
        return {
          title: 'Ritual Pack Skipped',
          subtitle: ritualPack.title,
          ctaLabel: 'View',
          onPress: () => navigateToRitualPackPage(ritualPack),
        };
    }
  };

  const tileConfig = getTileConfig();

  return (
    <View className="w-full self-start">
      <ActionTile
        title={tileConfig.title}
        subtitle={tileConfig.subtitle}
        ctaLabel={tileConfig.ctaLabel}
        onPress={tileConfig.onPress}
      />
    </View>
  );
}