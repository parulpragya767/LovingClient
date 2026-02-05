import { CORRELATION_ID } from '@/src/constants/apiConstants';
import { useAppErrorStore } from '@/src/store/useAppErrorStore';
import { devLog } from '@/src/utils/devLog';
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import * as Crypto from 'expo-crypto';

let getAccessToken: () => string | null = () => null;

export const registerAccessTokenGetter = (
  fn: () => string | null
) => {
  getAccessToken = fn;
};

const baseURL = process.env.EXPO_PUBLIC_API_URL;

if (!baseURL) {
  console.error('EXPO_PUBLIC_API_URL is not set');
}

const apiClient = axios.create({
  baseURL,
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token and correlation id
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (!config.headers[CORRELATION_ID]) {
      config.headers[CORRELATION_ID] = Crypto.randomUUID();
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Minimal response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const status = error.response?.status;
    const correlationId = (error.config?.headers as any)?.[CORRELATION_ID];

    if (status === 401 || status === 403) {
      useAppErrorStore.getState().setError('AUTH_ERROR');
    } else if (!status || !error.response) {
      // No response = connectivity / backend unreachable
      useAppErrorStore.getState().setError('NETWORK_ERROR');
    }

    devLog('warn', 'API request failed', {
      method: error.config?.method,
      url: error.config?.url,
      status,
      correlationId,
    });

    const message =
      (error.response?.data as any)?.message ||
      (error.response?.data as any)?.error ||
      error.message ||
      'Request failed';

    return Promise.reject(new Error(message));
  }
);

export default apiClient;