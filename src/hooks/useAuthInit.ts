import { useEffect } from 'react';
import { api } from '@/utils/axios';
import { useAuthStore } from '@/store/auth';
import { AuthUser } from '@/types/auth';

interface GetMeResponse {
  user: AuthUser;
  message: string;
}

export function useAuthInit() {
  const { setUser } = useAuthStore();

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await api.get<GetMeResponse>('/auth/me');
        setUser(res.data.user);
      } catch (err) {
        console.warn('로그인 복원 실패:', err);
      }
    }

    fetchUser();
  }, [setUser]);
}
