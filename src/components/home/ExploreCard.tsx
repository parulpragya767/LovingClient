import { AppText } from '@/src/components/ui/AppText';
import { Card } from '@/src/components/ui/Card';
import { Pressable } from 'react-native';

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
    <Card className="flex-1 border border-border">
      <Pressable onPress={onPress}>
        <AppText className="font-semibold">{title}</AppText>
        <AppText variant="small" className="mt-1" numberOfLines={3} ellipsizeMode="tail">
            {description}
        </AppText>
      </Pressable>
    </Card>
);
}
