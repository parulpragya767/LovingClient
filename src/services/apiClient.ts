import { supabase } from '@/src/lib/supabase';
import axios from 'axios';

// Create axios instance with base config
const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  async (config) => {
    const { data } = await supabase.auth.getSession();
    const accessToken = data.session?.access_token;
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Pass-through response interceptor (Supabase handles refresh internally)
apiClient.interceptors.response.use((response) => response, (error) => Promise.reject(error));

export default apiClient;