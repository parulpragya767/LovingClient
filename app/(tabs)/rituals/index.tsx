import { Redirect } from 'expo-router';

export default function RitualsIndex() {
  // Redirect to the current rituals screen by default
  return <Redirect href="/(tabs)/rituals/current" />;
}
