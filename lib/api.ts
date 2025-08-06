import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

function getBaseUrl() {
  const override = (Constants.expoConfig?.extra as any)?.API_BASE_URL;
  if (override) return override as string;

  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:3000/api/v1';
  }
  return 'http://localhost:3000/api/v1';
}

const api = axios.create({
  baseURL: getBaseUrl(),
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(cfg => {
  console.log('[API Request]', cfg.method, cfg.url);
  return cfg;
});
api.interceptors.response.use(
  res => res,
  err => {
    console.warn('[API Error]', err.message, err?.config?.url);
    return Promise.reject(err);
  }
);

export const get = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const response: AxiosResponse<T> = await api.get(url, config);
  return response.data;
};

export const post = async <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
  const response: AxiosResponse<T> = await api.post(url, data, config);
  return response.data;
};

export const put = async <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
  const response: AxiosResponse<T> = await api.put(url, data, config);
  return response.data;
};

export const del = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const response: AxiosResponse<T> = await api.delete(url, config);
  return response.data;
};

export default api;
