import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient, processLock } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL as string;
const supabasePublishableKey = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY as string;

const isMissingEnv = !supabaseUrl || !supabasePublishableKey;


if (isMissingEnv) {
  throw new Error(
    'Supabase configuration missing. Please check your environment variables (EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY).'
  );
}

export const supabase = createClient(
  supabaseUrl, 
  supabasePublishableKey, 
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      lock: processLock,
    },
  }
);
