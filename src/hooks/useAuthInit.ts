import { useEffect } from 'react';
import { api } from '@/utils/axios';
import { useAuthStore } from '@/store/auth';
import { AuthUser } from '@/types/auth';
import { AxiosError } from 'axios';

interface GetMeResponse {
  user: AuthUser;
  message: string;
}

export function useAuthInit() {
  const { setUser } = useAuthStore();

  useEffect(() => {
    async function fetchUser() {
      try {
        // 토큰 재발급 시도
        await api.post('/auth/tokens');
      } catch {
        // 재발급 실패는 무시
      }

      try {
        const res = await api.get<GetMeResponse>('/auth/me');
        setUser(res.data.user);
      } catch (err) {
        const error = err as AxiosError;
        if (error.response?.status !== 401) {
          console.warn('로그인 복원 실패:', error);
        }
      }
    }

    fetchUser();
  }, [setUser]);
}
