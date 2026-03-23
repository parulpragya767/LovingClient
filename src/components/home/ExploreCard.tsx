import { AnimatedPressable } from '@/src/components/ui/AnimatedPressable';
import { AppText } from '@/src/components/ui/AppText';
import { Card } from '@/src/components/ui/Card';

export default function ExploreCard({
  title,
  description,
  onPress,
}: {
  title: string;
  description: string;
  onPress: () => void;
}) {
  return (
    <AnimatedPressable onPress={onPress} containerClassName="flex-1">
      <Card className="border border-border">
        <AppText className="font-semibold">{title}</AppText>
        <AppText variant="small" className="mt-1" numberOfLines={3} ellipsizeMode="tail">
            {description}
        </AppText>
      </Card>
    </AnimatedPressable>
);
}
