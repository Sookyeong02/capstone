import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/store/auth';

// config 타입 확장
declare module 'axios' {
  export interface InternalAxiosRequestConfig {
    retry?: boolean;
  }
}

const baseURL = process.env.NEXT_PUBLIC_API_URL;

// 클라이언트 사이드에서만 실행되도록 체크
const isClient = typeof window !== 'undefined';

// 인증이 필요한 요청 전용
export const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true, // Refresh token 쿠키 전송 위해 필요
});

// 인증 없는 요청
export const publicAxios = axios.create({
  baseURL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

if (isClient) {
  axiosInstance.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error),
  );

  // 응답 시 401 → 토큰 재발급 시도
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalConfig = error.config as InternalAxiosRequestConfig;

      if (
        !originalConfig ||
        !error.response ||
        originalConfig.retry ||
        error.response.status !== 401
      ) {
        return Promise.reject(error);
      }

      if (originalConfig.url?.includes('/auth/me')) {
        return Promise.reject(error);
      }

      originalConfig.retry = true;

      try {
        await publicApi.post('/auth/refresh'); // 쿠키로 자동 전달
        return axiosInstance(originalConfig); // 원본 요청 재시도
      } catch (refreshError) {
        const { logout } = useAuthStore.getState();
        logout();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    },
  );

  // publicAxios도 에러 핸들링 기본 설정
  publicAxios.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => Promise.reject(error),
  );
}

// 인증된 API 메서드
export const api = {
  get: <T>(url: string, config = {}) => axiosInstance.get<T>(url, config),
  post: <T>(url: string, data = {}, config = {}) => axiosInstance.post<T>(url, data, config),
  put: <T>(url: string, data = {}, config = {}) => axiosInstance.put<T>(url, data, config),
  delete: <T>(url: string, config = {}) => axiosInstance.delete<T>(url, config),
  patch: <T>(url: string, data = {}, config = {}) => axiosInstance.patch<T>(url, data, config),
};

// 인증이 필요없는 API만 처리
export const publicApi = {
  get: <T>(url: string, config = {}) => publicAxios.get<T>(url, config),
  post: <T>(url: string, data = {}, config = {}) => publicAxios.post<T>(url, data, config),
  put: <T>(url: string, data = {}, config = {}) => publicAxios.put<T>(url, data, config),
  delete: <T>(url: string, config = {}) => publicAxios.delete<T>(url, config),
  patch: <T>(url: string, data = {}, config = {}) => axiosInstance.patch<T>(url, data, config),
};
