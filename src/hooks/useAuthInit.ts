import { useEffect } from 'react';
import { api } from '@/utils/axios';
import { useAuthStore } from '@/store/auth';
import { AuthUser } from '@/types/auth';
import { usePathname } from 'next/navigation';
import { AxiosError } from 'axios';

interface GetMeResponse {
  user: AuthUser;
  message: string;
}

export function useAuthInit() {
  const { setUser } = useAuthStore();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/login' || pathname === '/signup') return;

    async function fetchUser() {
      try {
        const res = await api.get<GetMeResponse>('/auth/me');
        setUser(res.data.user);
      } catch (err) {
        if ((err as AxiosError).response?.status !== 401) {
          console.warn('로그인 복원 실패:', err);
        }
      }
    }

    fetchUser();
  }, [pathname, setUser]);
}
