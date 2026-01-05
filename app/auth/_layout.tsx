import LoadingState from '@/src/components/states/LoadingState';
import { useAuth } from '@/src/context/AuthContext';
import { Redirect, Slot } from 'expo-router';

export default function AuthLayout() {
  const { sessionUser: user, loading } = useAuth();

  if (loading) return <LoadingState text="Loading your profile..." />;

  if (user) {
    return <Redirect href="/" />;
  }

  return <Slot />;
}
