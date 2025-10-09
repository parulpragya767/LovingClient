import axios from 'axios';
import { supabase } from '@/src/lib/supabase';

// Attach Supabase JWT to all axios requests made by the generated API clients.
axios.interceptors.request.use(async (config) => {
  try {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    if (token) {
      config.headers = {
        ...(config.headers ?? {}),
        Authorization: `Bearer ${token}`,
      } as any;
    }
  } catch (e) {
    // no-op: proceed without auth header if session not available
  }
  return config;
});

export default axios;
